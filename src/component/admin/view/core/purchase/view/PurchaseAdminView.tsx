import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { PurchaseDto } from '../../../../../../controller/model/PurchaseDto';
import { RouteProp } from '@react-navigation/native';
import Collapsible from 'react-native-collapsible';
import { ScrollView } from 'react-native-gesture-handler';


type PurchaseUpdateScreenRouteProp = RouteProp<{ PurchaseDetails: { purchase: PurchaseDto } }, 'PurchaseDetails'>;

type Props = {
  route: PurchaseUpdateScreenRouteProp;
};

const PurchaseAdminView: React.FC<Props> = ({ route }) => {

  const { purchase } = route.params;

  const [isPurchaseCollapsed, setIsPurchaseCollapsed] = useState(false);
  const [isProductsCollapsed, setIsProductsCollapsed] = useState(true);

  const purchaseCollapsible = () => {
    setIsPurchaseCollapsed(!isPurchaseCollapsed);
  };

  const productsCollapsible = () => {
    setIsProductsCollapsed(!isProductsCollapsed);

  };


  return (
    <View style={{ padding: 20 }}>


      <ScrollView>
        <TouchableOpacity onPress={purchaseCollapsible}
          style={{
            backgroundColor: '#ffd700',
            padding: 10,
            borderRadius: 10,
            marginVertical: 5
          }}>
          <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 20 }}>Purchase</Text>
        </TouchableOpacity>

        <Collapsible collapsed={isPurchaseCollapsed}>

          <View style={styles.itemCard}>
            <View>
              <Text style={styles.infos}>Reference: {purchase.reference}</Text>
              <Text style={styles.infos}>Description: {purchase.description}</Text>
              <Text style={styles.infos}>Total: {purchase.total}</Text>
              <Text style={styles.infos}>Client fullName: {purchase.client.fullName}</Text>
              <Text style={styles.infos}>Client email: {purchase.client.email}</Text>
            </View>
          </View>

        </Collapsible>


        <TouchableOpacity onPress={productsCollapsible}
          style={{
            backgroundColor: '#ffd700',
            padding: 10,
            borderRadius: 10,
            marginVertical: 5
          }}>
          <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 20 }}>Items</Text>
        </TouchableOpacity>

        <Collapsible collapsed={isProductsCollapsed}>


          {purchase.purchaseItems && purchase.purchaseItems.length > 0 ? (
            purchase.purchaseItems.map((item, index) => (
              <View key={index} style={styles.itemCard}>
                <View>
                  <Text style={styles.infos}>Product: {item.product.reference}</Text>
                  <Text style={styles.infos}>Price: {item.price}</Text>
                  <Text style={styles.infos}>Quantity: {item.quantity}</Text>
                </View>
              </View>
            ))
          ) : (
            <View style={styles.itemCard}>
              <Text style={styles.infos}>No purchase items</Text>
            </View>
          )}

        </Collapsible>
      </ScrollView>

    </View>
  )
};

const styles = StyleSheet.create({
  infos: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginVertical: 6.5,
    fontSize: 15,
    fontWeight: 'bold'
  },
  itemCard: {
    marginVertical: 5,
    backgroundColor: '#f8f8ff',
    borderRadius: 10,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

})

export default PurchaseAdminView;