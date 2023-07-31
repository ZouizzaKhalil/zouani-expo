import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Controller } from 'react-hook-form';

const CustomInput = ({
    control,
    name,
    placeholder,
    keyboardT
}) => {
    return (
        <Controller
            control={control}
            rules={{ required: 'This field is required' }}
            render={({ field, fieldState: { error } }) => (
                <>
                    <View

                        style={
                            [
                                styles.container,
                                { borderColor: error ? 'red' : '#e8e8e8' },
                            ]}

                    >
                        <TextInput
                            placeholder={placeholder}
                            value={field.value === null ? '' : String(field.value)}
                            onChangeText={field.onChange}
                            style={[styles.input,
                            error && { borderColor: 'red' }
                            ]}
                            keyboardType={keyboardT}
                        />
                    </View>
                    {error && (
                        <Text style={{ color: 'red', alignSelf: 'stretch' }}>
                            {'Required'}
                        </Text>
                    )}


                </>
            )}
            name={name}
        />
    );
};


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f5f5f5',
        width: '100%',
        borderColor: '#e8e8e8',
        borderWidth: 1,
        borderRadius: 7,
        paddingHorizontal: 15,
        marginTop: 15,
    },
    input: {
        height: 50,
    },
});

export default CustomInput;
