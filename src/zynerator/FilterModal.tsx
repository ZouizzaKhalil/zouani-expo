import React, { useState, useRef } from 'react';
import { View, TextInput, Modal, TouchableOpacity, Text, ScrollView, StyleSheet } from 'react-native';

const FilterModal = ({ items, placeholder, onItemSelect, visibility, onClose, variable }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const scrollViewRef = useRef();

    const filteredItems = items.filter((item) =>
        item[variable].toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <View>
            <Modal
                visible={visibility}
                transparent
                animationType="fade"
            >
                <View
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    }}
                >
                    <View
                        style={{
                            backgroundColor: 'white',
                            padding: 16,
                            width: '80%',
                            borderRadius: 8,
                            height: 500,
                        }}
                    >
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
                            <TextInput
                                placeholder={placeholder}
                                value={searchQuery}
                                onChangeText={(text) => setSearchQuery(text)}
                                style={{
                                    padding: 12,
                                    borderWidth: 1,
                                    borderColor: '#ccc',
                                    borderRadius: 5,
                                    width: '88%'
                                }}
                            />

                            <TouchableOpacity
                                onPress={onClose}
                                style={{
                                    alignSelf: 'center',
                                    backgroundColor: 'grey',
                                    padding: 12,
                                    borderRadius: 5,
                                    marginLeft: 5

                                }}>
                                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>X</Text>
                            </TouchableOpacity>
                        </View>

                        <ScrollView ref={scrollViewRef}
                            keyboardShouldPersistTaps="handled">
                            {filteredItems.map((item, index) => (
                                <TouchableOpacity
                                    key={index}
                                    onPress={() => {
                                        onItemSelect(item);
                                        setSearchQuery('');
                                    }}
                                    style={styles.item}
                                >
                                    <Text style={{ fontWeight: 'bold', fontSize: 15 }}>{item[variable]}</Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>

                    </View>
                </View>
            </Modal>
        </View>
    );
};


const styles = StyleSheet.create({

    item: {
        paddingVertical: 8,
        backgroundColor: '#ffa700',
        marginVertical: 3,
        borderRadius: 5,
        padding: 10
    }

})

export default FilterModal