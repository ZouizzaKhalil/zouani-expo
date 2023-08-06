import React from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';


const ConfirmDeleteModal = ({ isVisible, handleConfirmDelete, handleCancelDelete, name }) => {
    return (
        <Modal visible={isVisible} animationType="slide" transparent>
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'rgba(0,0,0,0.5)',
                }}>
                <View
                    style={{
                        backgroundColor: '#fff',
                        borderRadius: 10,
                        padding: 20,
                        alignItems: 'center',
                    }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Ionicons name="warning-outline" size={22} color={'#fcc200'} />

                        <Text style={{ fontWeight: 'bold', fontSize: 18, marginHorizontal: 5 }}>
                            Confirm delete!
                        </Text>
                    </View>

                    <Text style={{ marginVertical: 10 }}>
                        Are you sure you want to delete this {name} ?
                    </Text>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity
                            style={{
                                backgroundColor: 'red',
                                padding: 10,
                                borderRadius: 10,
                                marginHorizontal: 5,
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                            onPress={handleConfirmDelete}>
                            <Text style={{ color: '#fff', fontWeight: 'bold' }}>Yes</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                backgroundColor: 'gray',
                                padding: 12,
                                borderRadius: 10,
                                marginHorizontal: 5,
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                            onPress={handleCancelDelete}>
                            <Text style={{ color: '#fff', fontWeight: 'bold' }}>No</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default ConfirmDeleteModal;
