import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { LoginScreen } from './src/components/LoginComponent/LoginScreen';
import { RegisterScreen } from './src/components/RegisterComponent/RegisterScreen';

export default function App() {
  return (
    <LoginScreen/>
 
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
