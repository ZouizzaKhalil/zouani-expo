import { View, Text, StyleSheet, SafeAreaView, Modal, Keyboard } from 'react-native';
import React, { useEffect, useState } from 'react';
import PurchaseAdminService from '../../../../../../controller/service/admin/PurchaseAdminService';
import { ClientDto } from '../../../../../../controller/model/ClientDto';
import { Picker } from '@react-native-picker/picker';
import { Controller, useForm } from 'react-hook-form';
import CustomInput from '../../../../../../zynerator/CustomInput';
import CustomButton from '../../../../../../zynerator/CustomButton';
import { ScrollView } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { PurchaseDto } from '../../../../../../controller/model/PurchaseDto';
import ClientAdminService from '../../../../../../controller/service/admin/ClientAdminService';
import { AxiosResponse } from 'axios';
import SaveFeedbackModal from '../../../../../../zynerator/SaveFeedbackModal';


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

  const handleSave = async (item: PurchaseDto) => {
    Keyboard.dismiss();

    try {
      await PurchaseAdminService.save(
        item
      );

      reset();

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

        <Controller
          control={control}
          rules={{ required: 'Please select a client' }}
          render={({ field, fieldState: { error } }) => (
            <>

              <View

                style={
                  [
                    styles.container,
                    { borderColor: error ? 'red' : '#e8e8e8' },
                  ]}

              >
                <Picker
                  selectedValue={field.value}
                  onValueChange={field.onChange}

                >
                  <Picker.Item label="Select a client" value={undefined} />
                  {clients.map((client) => (
                    <Picker.Item key={client.id} label={client.fullName} value={client.id} />
                  ))}
                </Picker>

              </View>
              {error && (
                <Text style={{ color: 'red', alignSelf: 'stretch' }}>
                  {'Required'}
                </Text>
              )}
            </>
          )}
          name="client.id"
        />

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
