import { Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'

const CustomButton = ({ onPress, text, type = "PRIMARY", bgColor, fgColor }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={[styles.container,
            styles[`container_${type}`],
            bgColor ? { backgroundColor: bgColor } : {}
            ]}>

            <Text style={[
                styles.text,
                styles[`text_${type}`],
                fgColor ? { color: fgColor } : {}
            ]}>{text}</Text>
        </TouchableOpacity >
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        padding: 15,
        marginVertical: 15,
        alignItems: 'center',
        borderRadius: 7,

    },

    container_PRIMARY: {
        backgroundColor: '#ffa500',
    },
    container_TERTIARY: {

    },
    container_SECONDARY: {
        borderColor: '#ffa500',
        borderWidth: 2,
    },

    text: {
        fontWeight: 'bold',
    },

    text_TERTIARY: {
        color: 'gray',
    },
    text_SECONDARY: {
        color: '#ffa500',
    }
})

export default CustomButton