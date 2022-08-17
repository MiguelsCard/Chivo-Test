import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text, View } from 'react-native';
import Navigator from './client/Navigator';

export default function App() {
  return (
    <View style={{ flex: 1, backgroundColor: 'teal' }}>
      <Navigator></Navigator>
      <StatusBar style='auto' />
    </View>
  );
}
