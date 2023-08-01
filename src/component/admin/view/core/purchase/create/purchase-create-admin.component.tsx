import { View, Text, StyleSheet, SafeAreaView, Keyboard } from 'react-native';
import React, { useEffect, useState } from 'react';
import PurchaseAdminService from '../../../../../../controller/service/admin/PurchaseAdminService';
import { ClientDto } from '../../../../../../controller/model/ClientDto';
import { Controller, useForm } from 'react-hook-form';
import CustomInput from '../../../../../../zynerator/CustomInput';
import CustomButton from '../../../../../../zynerator/CustomButton';
import { ScrollView } from 'react-native-gesture-handler';
import { PurchaseDto } from '../../../../../../controller/model/PurchaseDto';
import ClientAdminService from '../../../../../../controller/service/admin/ClientAdminService';
import { AxiosResponse } from 'axios';
import SaveFeedbackModal from '../../../../../../zynerator/SaveFeedbackModal';
import { SelectList } from 'react-native-dropdown-select-list'




const PurchaseAdminCreate = () => {

  const [showSavedModal, setShowSavedModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);

  const [clients, setClients] = useState<ClientDto[]>([]);

  type ClientResponse = AxiosResponse<ClientDto[]>;

  const { control, handleSubmit, formState, reset } = useForm<PurchaseDto>({
    defaultValues: {
      reference: '',
      total: null,
      description: '',
      client: undefined,
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

  const handleSave = async (item: PurchaseDto) => {


    item.client = clients.find((client) => client.id == Number(selectedClient));

    console.log(item.client)

    Keyboard.dismiss();

    try {
      await PurchaseAdminService.save(
        item
      );

      reset();
      setSelectedClient("")

      setShowSavedModal(true);
      setTimeout(() => setShowSavedModal(false), 1500);


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
        >Create Purchase</Text>

        <CustomInput control={control} name={'reference'} placeholder={'Reference'} keyboardT="default" />


        <CustomInput control={control} name={'total'} placeholder={'Total'} keyboardT="numeric" />
        <CustomInput control={control} name={'description'} placeholder={'Description'} keyboardT="default" />

        <View style={styles.container}>

          <SelectList
            setSelected={setSelectedClient}
            data={data}
            boxStyles={{ borderRadius: 5, borderColor: '#e8e8e8' }}
            dropdownStyles={{ borderColor: '#f5f5f5' }}
            dropdownItemStyles={{ backgroundColor: 'rgba(220,220,220,0.3)', margin: 1, borderRadius: 5 }}
          />
         
        </View>





        <CustomButton
          onPress={handleSubmit(handleSave)}
          text={"Save Purchase"}
          bgColor={'#ffa500'}
          fgColor={'white'}
        />

      </ScrollView>

      <SaveFeedbackModal
        isVisible={showSavedModal}
        icon={'checkmark-done-sharp'}
        message={'saved successfully'}
        iconColor={'#32cd32'}
      />

      <SaveFeedbackModal
        isVisible={showErrorModal}
        icon={'close-sharp'}
        message={'Error on saving'}
        iconColor={'red'}
      />


    </SafeAreaView>
  );
};

const styles = StyleSheet.create({

  container: {
    backgroundColor: '#f5f5f5',
    width: '100%',
    borderColor: '#e8e8e8',
    borderWidth: 1,
    borderRadius: 7,
    //paddingHorizontal: 5,
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
    flexDirection: 'row'
  },

  modalText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginHorizontal: 10
  },
});

export default PurchaseAdminCreate;
