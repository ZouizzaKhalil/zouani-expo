import React from 'react';
import { SafeAreaView, StyleSheet, TouchableOpacity, View, KeyboardAvoidingView, Platform } from 'react-native';
import TabNavigation from '../../../../../navigation/TabNavigation';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Purchase = () => {
  return (
    <SafeAreaView style={styles.container}>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >

        <TabNavigation />



      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 50, 
    alignSelf: 'center',
    width: 60,
    height: 60,
    backgroundColor: 'orange',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
  },
});

export default Purchase;



{/*
      <TouchableOpacity
        style={styles.buttonContainer}
        activeOpacity={0.8}
        onPress={() => {
          console.log('search pressed')
        }}
      >
        <View>
          <Ionicons name="search-outline" size={25} color="red" />
        </View>

      </TouchableOpacity>
      */}