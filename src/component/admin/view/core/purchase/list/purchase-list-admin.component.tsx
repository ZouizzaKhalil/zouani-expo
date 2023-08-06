import { View, Text, ScrollView } from 'react-native';
import React, { useCallback, useState } from 'react';
import PurchaseCard from '../../../../../../zynerator/PurchaseCard';
import PurchaseAdminService from '../../../../../../controller/service/admin/PurchaseAdminService';
import { PurchaseDto } from '../../../../../../controller/model/PurchaseDto';
import { useFocusEffect } from '@react-navigation/native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import ConfirmDeleteModal from '../../../../../../zynerator/ConfirmDeleteModal';
import { AxiosResponse } from 'axios';


const PurchaseAdminList: React.FC = () => {
  const [purchases, setPurchases] = useState<PurchaseDto[]>([]);

  const navigation = useNavigation<NavigationProp<any>>();

  type PurchaseResponse = AxiosResponse<PurchaseDto[]>;


  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [purchaseId, setPurchaseId] = useState(0);

  const handleDeletePress = (id: number) => {
    setPurchaseId(id);
    setIsDeleteModalVisible(true);
  };

  const handleCancelDelete = () => {
    setIsDeleteModalVisible(false);
  };

  const handleConfirmDelete = async () => {
    try {
      await PurchaseAdminService.deleteById(purchaseId);
      setPurchases((prevPurchases) => prevPurchases.filter((purchase) => purchase.id !== purchaseId));
      setIsDeleteModalVisible(false);
    } catch (error) {
      console.error('Error deleting purchase:', error);
      setIsDeleteModalVisible(false);
    }
  };

  const fetchData = async () => {
    try {
      const [clientsResponse] = await Promise.all<PurchaseResponse>([
        PurchaseAdminService.getList(),
      ]);
      setPurchases(clientsResponse.data);
    } catch (error) {
      console.error(error);
    }
  };


  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );


  const handleFetchAndUpdate = async (id: number) => {
    try {
      const purchaseResponse = await PurchaseAdminService.findById(id);
      const purchaseData = purchaseResponse.data;
      navigation.navigate('PurchaseUpdate', { purchase: purchaseData });
    } catch (error) {
      console.error('Error fetching purchase data:', error);
    }
  };

  const handleFetchAndDetails = async (id: number) => {
    try {
      const purchaseResponse = await PurchaseAdminService.findById(id);
      const purchaseData = purchaseResponse.data;
      navigation.navigate('PurchaseDetails', { purchase: purchaseData });
    } catch (error) {
      console.error('Error fetching purchase data:', error);
    }
  };



  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{ paddingHorizontal: 10, backgroundColor: '#e6e8fa' }}>

      <Text style={{
        fontSize: 30,
        fontWeight: 'bold',
        alignSelf: 'center',
        marginVertical: 10,
      }}
      >Purchase List</Text>

      <View style={{ marginBottom: 100 }}>
        {purchases && purchases.length > 0 ? (
          purchases.map((purchase) => (
            <PurchaseCard
              key={purchase.id}
              reference={purchase.reference}
              description={purchase.description}
              ClientName={purchase.client.fullName}
              total={purchase.total}
              onPressDelete={() => handleDeletePress(purchase.id)}
              onUpdate={() => handleFetchAndUpdate(purchase.id)}
              onDetails={() => handleFetchAndDetails(purchase.id)}
            />
          ))
        ) : (
          <Text style={{ fontSize: 20, textAlign: 'center', color: 'red', marginTop: 20 }}>No purchases found.</Text>
        )}
      </View>


      <ConfirmDeleteModal
        isVisible={isDeleteModalVisible}
        handleConfirmDelete={handleConfirmDelete}
        handleCancelDelete={handleCancelDelete}
        name={'Purchase'}
      />
    </ScrollView>
  );
};

export default PurchaseAdminList;
