import { View, Text, SafeAreaView, PanResponder, StyleSheet } from 'react-native';
import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';



const PurchaseCard = ({ reference, description, ClientName, total, onPressDelete, onUpdate }) => {


    return (
        <SafeAreaView>

            <View style={{ flexDirection: 'row', width: '100%' }}>


                <LinearGradient colors={['#ffa343', '#c0c0c0']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                    style={{
                        height: 170,
                        marginHorizontal: 10,
                        borderRadius: 15,
                        marginVertical: 10,
                        elevation: 13,
                        backgroundColor: 'white',
                        width: '95%',
                        flexDirection: 'row',
                        justifyContent: 'space-between'
                    }}
                >


                    <View style={{ marginLeft: 15, marginVertical: 10 }}>

                        <View style={styles.infos}>
                            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>- Reference: </Text>
                            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{reference}</Text>
                        </View>

                        <View style={styles.infos}>
                            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>- Description: </Text>
                            <Text style={{ fontSize: 14, fontWeight: 'bold' }}>{description}</Text>
                        </View>

                        <View style={styles.infos}>
                            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>- Total: </Text>
                            <Text style={{ fontSize: 14, fontWeight: 'bold' }}>{total}</Text>
                        </View>

                        <View style={styles.infos}>
                            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>- Client: </Text>
                            <Text style={{ fontSize: 14, fontWeight: 'bold' }}>{ClientName}</Text>
                        </View>



                    </View>


                    <View style={{ alignItems: 'center' , flexDirection: 'column', justifyContent: 'space-between'}}>

                        <TouchableOpacity onPress={() => onPressDelete()} style={styles.deleteButton}>
                            <Ionicons name="trash-outline" size={25} color={'red'} />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => onUpdate()} style={styles.updateButton}>
                            <Text style={{ color: 'white', fontWeight: 'bold' }}>Update</Text>
                        </TouchableOpacity>



                    </View>


                </LinearGradient>



            </View>


        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    card: {
        height: 170,
        marginHorizontal: 10,
        borderRadius: 15,
        marginVertical: 10,
        elevation: 13,
        backgroundColor: 'white',
        width: '90%',
        flexDirection: 'row',
        marginRight: '25%',
    },
    deleteButton: {
        marginLeft: 40,
        marginTop: 10
        
    },
    updateButton: {
        backgroundColor: 'rgba(0,0,255,0.9)',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 10,
        marginVertical: 10,
        padding: 10,
    },
    buttons: {
        position: 'absolute',
        bottom: 10,
        flexDirection: 'row',
        right: '10%'
    },
    infos: {
        flexDirection: 'row',
        alignItems: 'baseline',
        marginVertical: 6.5
    }
});

export default PurchaseCard;
