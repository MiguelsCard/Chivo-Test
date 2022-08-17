import { useState, useEffect } from 'react';
import { Text, View } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CryptoList() {
  const [user, setUser] = useState('');

  const getUsername = async () => {
    try {
      const username = await AsyncStorage.getItem('username');
      console.log('FOUND USERNAME: ', username);
      return username;
    } catch (e) {
      return null;
    }
  };
  getUsername().then((username) => {
    setUser(username);
  });
  console.log('USER: ', user);

  return (
    <View style={{ flex: 1, backgroundColor: 'pink' }}>
      <Text>CryptoList </Text>
    </View>
  );
}
