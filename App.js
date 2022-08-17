import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Text, View } from 'react-native';
import Navigator from './client/Navigator';
export const GlobalDataContext = React.createContext();

export default function App() {
  const [username, setUsername] = useState('');
  return (
    <View style={{ flex: 1, backgroundColor: 'teal' }}>
      <GlobalDataContext.Provider value={{ username, setUsername }}>
        <Navigator></Navigator>
        <StatusBar style='auto' />
      </GlobalDataContext.Provider>
    </View>
  );
}
