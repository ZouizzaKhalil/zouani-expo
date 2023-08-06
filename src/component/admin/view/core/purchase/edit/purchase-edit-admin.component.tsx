import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Keyboard } from 'react-native';
import React, { useEffect, useState } from 'react';
import { RouteProp } from '@react-navigation/native';
import { PurchaseDto } from '../../../../../../controller/model/PurchaseDto';
import ClientAdminService from '../../../../../../controller/service/admin/ClientAdminService';
import PurchaseAdminService from '../../../../../../controller/service/admin/PurchaseAdminService';
import { ClientDto } from '../../../../../../controller/model/ClientDto';
import { useForm } from 'react-hook-form';
import CustomInput from '../../../../../../zynerator/CustomInput';
import CustomButton from '../../../../../../zynerator/CustomButton';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { AxiosResponse } from 'axios';
import SaveFeedbackModal from '../../../../../../zynerator/SaveFeedbackModal';
import FilterModal from '../../../../../../zynerator/FilterModal';
import Ionicons from 'react-native-vector-icons/Ionicons';


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
    const [clientModalVisible, setCLientModalVisible] = useState(false);
    const [selectedClient, setSelectedClient] = useState<ClientDto>({
        id: purchase.client.id,
        fullName: purchase.client.fullName,
        email: purchase.client.email
    });


    const { control, handleSubmit } = useForm<PurchaseDto>({
        defaultValues: {
            id: purchase.id,
            reference: purchase.reference,
            total: purchase.total,
            description: purchase.description,
            client: purchase.client,
        },
    });


    const onClientSelect = (item) => {
        console.log('Selected Item:', item);
        setSelectedClient(item);
        setCLientModalVisible(false);
    };

    const handleCloseModal = () => {
        setCLientModalVisible(false);
    };


    useEffect(() => {
        const fetchData = async () => {
            try {
                const [clientsResponse] = await Promise.all<ClientResponse>([
                    ClientAdminService.getList(),
                ]);
                setClients(clientsResponse.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);


    const handleUpdate = async (item: PurchaseDto) => {

        item.client = selectedClient;
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

                <TouchableOpacity onPress={() => setCLientModalVisible(true)}
                    style={styles.placeHolder}
                >
                    <View style={{
                        flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'
                    }}>
                        <Text>{selectedClient.fullName}</Text>
                        <Ionicons name="caret-down-outline" size={22} color={'black'} />
                    </View>
                </TouchableOpacity>


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


            <FilterModal
                visibility={clientModalVisible}
                placeholder={"Select a Client"}
                onItemSelect={onClientSelect}
                items={clients}
                onClose={handleCloseModal}
                variable={'fullName'}
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
    placeHolder: {
        backgroundColor: '#f5f5f5',
        width: '100%',
        borderColor: '#e8e8e8',
        borderWidth: 1,
        borderRadius: 7,
        paddingHorizontal: 15,
        padding: 15,
        marginTop: 15,
        marginBottom: 10,
    }
});

export default PurchaseAdminEdit