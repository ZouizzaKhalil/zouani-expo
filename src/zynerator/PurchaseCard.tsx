import { View, Text, SafeAreaView, PanResponder, StyleSheet } from 'react-native';
import React, { useRef, useState } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';



const PurchaseCard = ({ reference, description, ClientName, total, onPressDelete, onUpdate }) => {

    const [positionX, setPositionX] = useState(0);
    const [deleteOpacity, setDeleteOpacity] = useState(1);
    const [panEnabled, setPanEnabled] = useState(true);



    const panResponder = useRef(
        PanResponder.create({

            onStartShouldSetPanResponder: () => panEnabled,
            onPanResponderMove: (_, gestureState) => {
                const swipeThreshold = 50;

                if (gestureState.dx > swipeThreshold) {
                    setPositionX(gestureState.dx);

                } else if (gestureState.dx < -swipeThreshold) {
                    setPositionX(gestureState.dx);
                    setDeleteOpacity(0.5);
                } else {
                    setPositionX(0);
                    setDeleteOpacity(1);

                }
            },
            onPanResponderEnd: (_, gestureState) => {
                const swipeThreshold = 50;

                if (gestureState.dx > swipeThreshold) {
                    onUpdate();
                } else if (gestureState.dx < -swipeThreshold) {
                    onPressDelete()
                    setDeleteOpacity(1);

                } else {
                    //console.log('No swipe');

                }
                setPositionX(0);
            },
        })
    ).current;

    return (
        <SafeAreaView>

            <View style={{ flexDirection: 'row', alignItems: 'center', alignContent: 'center', alignSelf:'center' }}>

                <Text style={{
                    position: 'absolute',
                    right: 0,
                    opacity: positionX < 0 ? 1 : 0,
                    transform: [{ rotate: '-90deg' }],
                    fontSize: 30,
                    fontWeight: 'bold',
                    color: 'red'

                }}>
                    Delete
                </Text>

                <LinearGradient colors={['#ffa343', '#c0c0c0']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                    style={{
                        height: 170,
                        marginHorizontal: 10,
                        borderRadius: 15,
                        marginVertical: 10,
                        elevation: 13,
                        backgroundColor: 'white',
                        width: '100%',
                        flexDirection: 'row',
                        //marginRight: '25%',
                        transform: [{ translateX: positionX }],
                        opacity: deleteOpacity
                    }}
                    {...panResponder.panHandlers}
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

                    {/*
                <View style={{ alignItems: 'center', position: 'absolute', right: '-10%', top: 9 }}>

                    <TouchableOpacity onPress={() => onUpdate()} style={styles.updateButton}>
                        <Text style={{ color: 'white', fontWeight: 'bold' }}>Update</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => onPressDelete()} style={styles.deleteButton}>
                        <Text style={{ color: 'white', fontWeight: 'bold' }}>Delete</Text>
                    </TouchableOpacity>

                </View>
                */}

                </LinearGradient>


                <Text style={{
                    position: 'absolute',
                    left: -10,
                    opacity: positionX > 0 ? 1 : 0,
                    transform: [{ rotate: '-90deg' }],
                    fontSize: 30,
                    fontWeight: 'bold',
                    color: 'blue'

                }}>
                    Update
                </Text>
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
        backgroundColor: 'rgba(255,40,0, 0.9)',
        borderRadius: 60,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 7,
        width: 70,
        height: 70,
        marginVertical: 3
    },
    updateButton: {
        backgroundColor: 'rgba(0,0,255,0.9)',
        borderRadius: 60,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 7,
        width: 70,
        height: 70,
        marginVertical: 3
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
