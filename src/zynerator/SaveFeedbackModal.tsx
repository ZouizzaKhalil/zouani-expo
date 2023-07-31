import { View, Text, Modal, StyleSheet } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';


const SaveFeedbackModal = ({ isVisible, message, icon, iconColor }) => {
    return (
        <Modal visible={isVisible} transparent={true} animationType="fade">
            <View style={styles.modalBackground}>
                <View style={styles.modalContent}>
                    <Ionicons name={icon} size={22} color={iconColor} />
                    <Text style={styles.modalText}>{message}</Text>
                </View>
            </View>
        </Modal>
    )
}


const styles = StyleSheet.create({


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


export default SaveFeedbackModal