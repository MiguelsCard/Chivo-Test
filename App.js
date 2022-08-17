import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Text, View } from 'react-native';
import Navigator from './client/Navigator';
export const GlobalDataContext = React.createContext();
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  const [username, setUsername] = useState('');
  const [singleCrypto, setSingleCrypto] = useState(null);
  const [online, setOnline] = useState(true);
  return (
    <View style={{ flex: 1, backgroundColor: 'teal' }}>
      <GlobalDataContext.Provider
        value={{
          username,
          setUsername,
          singleCrypto,
          setSingleCrypto,
          online,
          setOnline,
        }}
      >
        <SafeAreaProvider>
          <Navigator></Navigator>
          <StatusBar style='auto' />
        </SafeAreaProvider>
      </GlobalDataContext.Provider>
    </View>
  );
}
