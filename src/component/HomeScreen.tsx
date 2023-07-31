import { View, Text, ScrollView, useWindowDimensions } from 'react-native';
import React from 'react';


const HomeScreen = () => {

  return (
    <ScrollView style={{ backgroundColor: '#e6e8fa', padding: 10 }}>

      <View style={{ alignItems: 'center' }}>
        <Text style={{ fontSize: 30, fontWeight: 'bold' }}>HomeScreen</Text>
      </View>


    </ScrollView>
  )
}

export default HomeScreen