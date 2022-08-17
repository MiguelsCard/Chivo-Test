import { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CryptoList() {
  const [user, setUser] = useState('');
  const [cryptos, setCryptos] = useState(null);
  const storeTopFifty = async (value) => {
    try {
      await AsyncStorage.setItem('topFifty', JSON.stringify(value));
    } catch (error) {
      console.log(error);
    }
  };
  const getTopFifty = async () => {
    try {
      const top50 = await AsyncStorage.getItem('topFifty');
      const topFifty = JSON.parse(top50);
      setCryptos(topFifty);
      console.log('In getTopFifty: ', topFifty, cryptos);
      // console.log('In getTopFifty-2: ', topFifty, cryptos);
      return topFifty;
    } catch (error) {
      console.log(error);
    }
  };
  const fetchCoins = async () => {
    fetch('https://api.coinlore.net/api/tickers/?start=0&limit=5')
      .then(
        (res) => res.json() // this returns a promise
      )
      .then((res) => {
        const { data } = res;
        console.log('FETCH: ', data);
        storeTopFifty(data);
        getTopFifty();
      })
      .catch((ex) => {
        console.error(ex);
      });
  };
  const getUsername = async () => {
    try {
      const username = await AsyncStorage.getItem('username');
      setUser(username);
      return username;
    } catch (e) {
      return null;
    }
  };
  useEffect(() => {
    getUsername();
    setTimeout(fetchCoins, 1000);
  }, []);
  console.log('USER: ', user);

  if (!cryptos) {
    return (
      <View>
        <Text>Loading Coins</Text>
      </View>
    );
  } else {
    return (
      <View style={{ flex: 1, backgroundColor: 'pink' }}>
        <Text>Welcome {user}!</Text>
        {cryptos.map((crypto) => {
          return (
            <View key={crypto.id}>
              <Text>{crypto.name}</Text>
              <Text>{crypto.price_usd}</Text>
            </View>
          );
        })}
      </View>
    );
  }
}
