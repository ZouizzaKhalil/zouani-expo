import { View, Text, StyleSheet, SafeAreaView, Modal, Keyboard } from 'react-native';
import React, { useEffect, useState } from 'react';
import { RouteProp } from '@react-navigation/native';
import { PurchaseDto } from '../../../../../../controller/model/PurchaseDto';
import ClientAdminService from '../../../../../../controller/service/admin/ClientAdminService';
import PurchaseAdminService from '../../../../../../controller/service/admin/PurchaseAdminService';
import { ClientDto } from '../../../../../../controller/model/ClientDto';
import { Picker } from '@react-native-picker/picker';
import { Controller, useForm } from 'react-hook-form';
import CustomInput from '../../../../../../zynerator/CustomInput';
import CustomButton from '../../../../../../zynerator/CustomButton';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { AxiosResponse } from 'axios';
import SaveFeedbackModal from '../../../../../../zynerator/SaveFeedbackModal';
import { SelectList } from 'react-native-dropdown-select-list'




type PurchaseUpdateScreenRouteProp = RouteProp<{ PurchaseUpdate: { purchase: PurchaseDto } }, 'PurchaseUpdate'>;

type Props = {
    route: PurchaseUpdateScreenRouteProp;
};


const PurchaseAdminEdit: React.FC<Props> = ({ route }) => {

    const navigation = useNavigation<NavigationProp<any>>();
    type ClientResponse = AxiosResponse<ClientDto[]>;

    const { purchase } = route.params;

    const [clients, setClients] = useState<ClientDto[]>([]);
    const [showErrorModal, setShowErrorModal] = useState(false);


    const { control, handleSubmit } = useForm<PurchaseDto>({
        defaultValues: {
            id: purchase.id,
            reference: purchase.reference,
            total: purchase.total,
            description: purchase.description,
            client: purchase.client,
        },
    });

    const [selectedClient, setSelectedClient] = useState("");

    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [clientsResponse] = await Promise.all<ClientResponse>([
                    ClientAdminService.getList(),
                ]);
                setClients(clientsResponse.data);

                if (clientsResponse.data) {
                    let newArray = clientsResponse.data.map((item) => {
                        return { key: item.id, value: item.fullName }
                    })
                    setData(newArray)
                }

            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);


    const handleUpdate = async (item: PurchaseDto) => {

        item.client = clients.find((client) => client.id == Number(selectedClient));


        Keyboard.dismiss();
        console.log('Data to be updated:', item);

        try {

            await PurchaseAdminService.update(item);
            navigation.navigate('Purchase');
        } catch (error) {
            console.error('Error saving purchase:', error);
            setShowErrorModal(true);
            setTimeout(() => setShowErrorModal(false), 1500);
        }
    };






    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#e6e8fa' }}>
            <ScrollView style={{ margin: 20 }} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">

                <Text style={{
                    fontSize: 30,
                    fontWeight: 'bold',
                    alignSelf: 'center',
                    marginBottom: 10
                }}
                >Update Purchase</Text>


                <CustomInput control={control} name={'reference'} placeholder={'reference'} keyboardT="default" />

                <CustomInput control={control} name={'total'} placeholder={'total'} keyboardT="numeric" />

                <CustomInput control={control} name={'description'} placeholder={'description'} keyboardT="default" />


                <View style={{
                    backgroundColor: 'white', width: '100%', marginTop: 15, borderRadius: 7

                }}>
                    <SelectList
                        setSelected={setSelectedClient}
                        data={data}
                        defaultOption={{ key: purchase.client.id, value: purchase.client.fullName }}
                        boxStyles={{
                            backgroundColor: 'white',
                            width: '100%',
                            borderColor: '#e8e8e8',
                            borderWidth: 1,
                            borderRadius: 7,
                            paddingHorizontal: 15,
                        }}
                        dropdownStyles={{ borderColor: 'white' }}
                        dropdownItemStyles={{ backgroundColor: 'rgba(220,220,220,0.3)', margin: 1, borderRadius: 5 }}
                    />
                </View>


                <CustomButton
                    onPress={handleSubmit(handleUpdate)}
                    text={"Update Purchase"}
                    bgColor={'#ffa500'}
                    fgColor={'white'}
                />

            </ScrollView>

            <SaveFeedbackModal
                isVisible={showErrorModal}
                icon={'close-sharp'}
                message={'Error on updating'}
                iconColor={'red'}
            />



        </SafeAreaView>
    )
};

const styles = StyleSheet.create({

    container: {
        backgroundColor: 'white',
        width: '100%',
        borderColor: '#e8e8e8',
        borderWidth: 1,
        borderRadius: 7,
        paddingHorizontal: 15,
        marginTop: 15

    },
    input: {
        height: 50,
    },
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },

    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 8,
    },

    modalText: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default PurchaseAdminEdit