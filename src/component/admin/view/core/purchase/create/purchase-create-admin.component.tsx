import { View, Text, StyleSheet, SafeAreaView, Keyboard, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import PurchaseAdminService from '../../../../../../controller/service/admin/PurchaseAdminService';
import { ClientDto } from '../../../../../../controller/model/ClientDto';
import { useForm } from 'react-hook-form';
import CustomInput from '../../../../../../zynerator/CustomInput';
import CustomButton from '../../../../../../zynerator/CustomButton';
import { ScrollView } from 'react-native-gesture-handler';
import { PurchaseDto } from '../../../../../../controller/model/PurchaseDto';
import ClientAdminService from '../../../../../../controller/service/admin/ClientAdminService';
import { AxiosResponse } from 'axios';
import SaveFeedbackModal from '../../../../../../zynerator/SaveFeedbackModal';
import { ProductDto } from '../../../../../../controller/model/ProductDto';
import ProductAdminService from '../../../../../../controller/service/admin/ProductAdminService';
import Collapsible from 'react-native-collapsible';
import { PurchaseItemDto } from '../../../../../../controller/model/PurchaseItemDto';
import FilterModal from '../../../../../../zynerator/FilterModal';
import Ionicons from 'react-native-vector-icons/Ionicons';


const PurchaseAdminCreate = () => {

  const [showSavedModal, setShowSavedModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [clients, setClients] = useState<ClientDto[]>([]);
  const [products, setProducts] = useState<ProductDto[]>([]);
  const [purchaseItems, setPurchaseItems] = useState<PurchaseItemDto[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<ProductDto>({ code: '', reference: 'Select a Product' });
  const [productModalVisible, setProductModalVisible] = useState(false);
  const [selectedClient, setSelectedClient] = useState<ClientDto>({ id: null, fullName: 'Select a Client', email: '' });
  const [clientModalVisible, setCLientModalVisible] = useState(false);
  const [isPurchaseCollapsed, setIsPurchaseCollapsed] = useState(true);
  const [isItemCollapsed, setIsItemCollapsed] = useState(true);
  const [isItemsCollapsed, setIsItemsCollapsed] = useState(true);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editIndex, setEditIndex] = useState(null);


  type ClientResponse = AxiosResponse<ClientDto[]>;
  type ProductResponse = AxiosResponse<ProductDto[]>;

  const { control, handleSubmit, reset } = useForm<PurchaseDto>({
    defaultValues: {
      reference: '',
      total: null,
      description: '',
      client: undefined,
    },
  });

  const { control: itemControl, handleSubmit: handleItemSubmit, reset: resetItem } = useForm<PurchaseItemDto>({
    defaultValues: {
      price: null,
      quantity: null,
      product: undefined,
    },
  });

  const purchaseCollapsible = () => {
    setIsPurchaseCollapsed(!isPurchaseCollapsed);
    setIsItemCollapsed(true);
    setIsItemsCollapsed(true);
  };

  const itemCollapsible = () => {
    setIsItemCollapsed(!isItemCollapsed);
    setIsPurchaseCollapsed(true);
    setIsItemsCollapsed(true);

  };

  const itemsCollapsible = () => {
    setIsItemsCollapsed(!isItemsCollapsed);
    setIsPurchaseCollapsed(true);
    setIsItemCollapsed(true);
  };

  const onProductSelect = (item) => {
    console.log('Selected Item:', item);
    setSelectedProduct(item);
    setProductModalVisible(false);
  };

  const onClientSelect = (item) => {
    console.log('Selected Item:', item);
    setSelectedClient(item);
    setCLientModalVisible(false);
  };


  const handleCloseModal = () => {
    setProductModalVisible(false);
    setCLientModalVisible(false);
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const [clientsResponse, productsResponse] = await Promise.all([
          ClientAdminService.getList(),
          ProductAdminService.getList(),
        ]);

        const clientsData = (clientsResponse as ClientResponse).data;
        const productsData = (productsResponse as ProductResponse).data;

        setClients(clientsData);
        setProducts(productsData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);



  const handleAddPurchaseItem = (data: PurchaseItemDto) => {
    if (data && selectedProduct.code) {
      const newPurchaseItem: PurchaseItemDto = {
        price: data.price,
        quantity: data.quantity,
        product: selectedProduct,
        purchase: undefined
      };
      setPurchaseItems((prevItems) => [...prevItems, newPurchaseItem]);
      resetItem({
        price: null,
        quantity: null,
      });
      setSelectedProduct({ code: '', reference: 'Select a Product' });
    }
  };

  const handleDeleteItem = (index) => {
    const updatedItems = purchaseItems.filter((item, i) => i !== index);
    setPurchaseItems(updatedItems);
  };


  const handleUpdateItem = (data: PurchaseItemDto) => {

    if (data) {
      purchaseItems.map((item, i) => {
        if (i === editIndex) {
          item.price = data.price;
          item.quantity = data.quantity;
          item.product = selectedProduct;
        }
      });

      resetItem({
        price: null,
        quantity: null,
      });
      setSelectedProduct({ code: '', reference: 'Select a Product' });
      setIsEditMode(false);
    }

    setIsItemsCollapsed(!isItemsCollapsed);
    setIsItemCollapsed(!isItemCollapsed);
  }


  const handleSave = async (item: PurchaseDto) => {

    item.client = selectedClient;
    item.purchaseItems = purchaseItems;
    Keyboard.dismiss();

    try {
      await PurchaseAdminService.save(
        item
      );

      setIsItemsCollapsed(!isItemsCollapsed);
      reset();
      setSelectedClient({ id: null, fullName: 'Select a Client', email: '' });
      setShowSavedModal(true);
      setTimeout(() => setShowSavedModal(false), 1500);
      setPurchaseItems([]);

    } catch (error) {
      console.error('Error saving purchase:', error);
      setShowErrorModal(true);
      setTimeout(() => setShowErrorModal(false), 1500);

    }
  };

  const updateFormDefaultValues = (index: number) => {
    let updatedPurchase: PurchaseItemDto;
    setEditIndex(index);
    setIsEditMode(true);
    purchaseItems.map((item, i) => {
      if (i === index) {
        updatedPurchase = item;
      }
    });

    resetItem({
      price: updatedPurchase.price,
      quantity: updatedPurchase.quantity,
    });
    setSelectedProduct(updatedPurchase.product);
    setIsItemsCollapsed(!isItemsCollapsed);
    setIsItemCollapsed(!isItemCollapsed);
  };







  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#e6e8fa' }} >
      <ScrollView
        style={{ margin: 20, marginBottom: 80 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >

        <Text style={{
          fontSize: 30,
          fontWeight: 'bold',
          alignSelf: 'center',
          marginBottom: 10
        }}
        >Create Purchase</Text>


        <TouchableOpacity onPress={purchaseCollapsible}
          style={{
            backgroundColor: 'orange',
            padding: 10,
            borderRadius: 10,
            marginVertical: 5

          }}>
          <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 20 }}>Purchase</Text>
        </TouchableOpacity>

        <Collapsible collapsed={isPurchaseCollapsed}>

          <CustomInput control={control} name={'reference'} placeholder={'Reference'} keyboardT="default" />
          <CustomInput control={control} name={'total'} placeholder={'Total'} keyboardT="numeric" />
          <CustomInput control={control} name={'description'} placeholder={'Description'} keyboardT="default" />


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


        </Collapsible>


        <TouchableOpacity onPress={itemCollapsible}
          style={{
            backgroundColor: '#ffd700',
            padding: 10,
            borderRadius: 10,
            marginVertical: 5
          }}>
          <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 20 }}>Add Purchase Item</Text>
        </TouchableOpacity>


        <Collapsible collapsed={isItemCollapsed}>

          <TouchableOpacity onPress={() => setProductModalVisible(true)}
            style={styles.placeHolder}
          >
            <View style={{
              flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'
            }}>
              <Text>{selectedProduct.reference}</Text>
              <Ionicons name="caret-down-outline" size={22} color={'black'} />
            </View>
          </TouchableOpacity>

          <CustomInput control={itemControl} name={'price'} placeholder={'price'} keyboardT="numeric" />
          <CustomInput control={itemControl} name={'quantity'} placeholder={'quantity'} keyboardT="numeric" />

          <TouchableOpacity
            onPress={
              isEditMode
                ? handleItemSubmit((data) => {
                  handleUpdateItem(data);
                })
                : handleItemSubmit(handleAddPurchaseItem)
            }
            style={{
              backgroundColor: '#32cd32',
              borderRadius: 10,
              marginBottom: 5,
              width: '20%',
              paddingVertical: 10,
              marginLeft: '80%',
              marginTop: 10
            }}
          >
            <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 20 }}>
              {isEditMode ?
                <Ionicons name="pencil-outline" size={25} color={'blue'} />
                : '+'
              }
            </Text>
          </TouchableOpacity>





        </Collapsible>

        <TouchableOpacity onPress={itemsCollapsible}
          style={{
            backgroundColor: '#ffd700',
            padding: 10,
            borderRadius: 10,
            marginVertical: 5
          }}>
          <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 20 }}>List Purchase Item</Text>
        </TouchableOpacity>


        <Collapsible collapsed={isItemsCollapsed}>

          {purchaseItems && purchaseItems.length > 0 ? (
            purchaseItems.map((item, index) => (
              <View key={index} style={styles.itemCard}>
                <View>
                  <Text style={styles.infos}>Product: {item.product.reference}</Text>
                  <Text style={styles.infos}>Price: {item.price}</Text>
                  <Text style={styles.infos}>Quantity: {item.quantity}</Text>
                </View>

                <View style={{ alignItems: 'center', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <TouchableOpacity onPress={() => handleDeleteItem(index)}>
                    <Ionicons name="trash-outline" size={22} color={'red'} />
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => updateFormDefaultValues(index)}>
                    <Ionicons name="pencil-outline" size={22} color={'blue'} />
                  </TouchableOpacity>
                </View>
              </View>
            ))
          ) : (
            <View style={styles.itemCard}>
              <Text style={styles.infos}>No purchase items yet.</Text>
            </View>

          )}

        </Collapsible>


        <CustomButton
          onPress={handleSubmit(handleSave)}
          text={"Save Purchase"}
          bgColor={'#000080'}
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

      {products !== null && products.length > 0 ? (
        <FilterModal
          visibility={productModalVisible}
          placeholder={"Select a Product"}
          onItemSelect={onProductSelect}
          items={products}
          onClose={handleCloseModal}
          variable={'reference'}
        />
      ) : null}

      {clients !== null && clients.length > 0 ? (
        <FilterModal
          visibility={clientModalVisible}
          placeholder={"Select a Client"}
          onItemSelect={onClientSelect}
          items={clients}
          onClose={handleCloseModal}
          variable={'fullName'}
        />
      ) : null}


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
    marginTop: 15,
    marginBottom: 10

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
  itemInput: {
    backgroundColor: '#f5f5f5',
    width: '100%',
    borderColor: '#e8e8e8',
    borderWidth: 1,
    borderRadius: 7,
    paddingHorizontal: 15,
    marginTop: 15,
    height: 50,
  },
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
  placeHolder: {
    backgroundColor: '#f5f5f5',
    width: '100%',
    borderColor: '#e8e8e8',
    borderWidth: 1,
    borderRadius: 7,
    paddingHorizontal: 15,
    padding: 15,
    marginTop: 15,
  }
});

export default PurchaseAdminCreate;
