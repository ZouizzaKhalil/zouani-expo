import 'react-native-gesture-handler';
import { SafeAreaView, StyleSheet} from 'react-native';
import AppNavigation from './src/navigation/AppNavigation';
import React from 'react';




export default function App() {

  return (
    <SafeAreaView style={styles.container}>
      
      <AppNavigation />

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFAF0',
  },
});
