import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { GlobalDataContext } from '../App';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CryptoList({ navigation }) {
  const [user, setUser] = useState('');
  const [cryptos, setCryptos] = useState(null);
  const [percent, setPercent] = useState(0);
  const [filter, setFilter] = useState(0);
  const { setSingleCrypto, online, setOnline } =
    React.useContext(GlobalDataContext);

  let line = true;

  function checkOnline() {
    fetch('https://api.coinlore.net/api/global/')
      .then(
        (resp) => resp.json() // this returns a promise
      )
      .then((res) => {
        setOnline(true);
      })
      .catch((ex) => {
        if (line) {
          setOnline(false);
          line = false;
          alert('Something went wrong with your connection');
        }
      });
  }
  setInterval(checkOnline, 5000);

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
      return topFifty;
    } catch (error) {
      console.log(error);
    }
  };
  const fetchCoins = async () => {
    fetch('https://api.coinlore.net/api/tickers/?start=0&limit=49')
      .then(
        (res) => res.json() // this returns a promise
      )
      .then((res) => {
        const { data } = res;
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
    //Keep timeout here in case of accidental infinite loops
    setTimeout(fetchCoins, 1000);
  }, []);

  const handleFilter = () => {
    // if (typeof percent === 'number') {
    if (percent) {
      setFilter(parseInt(percent));
    } else {
      setFilter(0);
    }
    // } else {
    // alert('Please enter a number');
    // }
  };
  const handleCoin = (crypto) => {
    if (online) {
      setSingleCrypto(crypto);
      navigation.navigate('SingleCrypto');
    }
  };
  if (!cryptos) {
    return (
      <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
        <Text>Loading Coins</Text>
      </View>
    );
  } else {
    return (
      <View style={{ flex: 1 }}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text>Welcome {user}!</Text>
          <View style={styles.filter}>
            <Text>Filter by percentage </Text>
            <TextInput
              onChangeText={setPercent}
              value={percent}
              style={styles.input}
            ></TextInput>
            <Text> %</Text>
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleFilter()}
          >
            <Text>Filter</Text>
          </TouchableOpacity>
        </View>
        {cryptos.map((crypto) => {
          if (filter === 0 || crypto.percent_change_24h >= filter) {
            return (
              <TouchableOpacity
                key={crypto.id}
                style={styles.coins}
                onPress={() => handleCoin(crypto)}
              >
                <Text>{crypto.name}</Text>
                <Text>24H Percent change: {crypto.percent_change_24h}</Text>
              </TouchableOpacity>
            );
          }
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  filter: {
    flexDirection: 'row',
  },
  coins: {
    borderRadius: 2,
    backgroundColor: 'lightgray',
    padding: 10,
    margin: 10,
  },
  input: {
    padding: 2,
    width: 50,
    borderColor: 'black',
    borderWidth: 1,
  },
  button: {
    margin: 5,
    backgroundColor: 'lightblue',
    borderRadius: 10,
    padding: 5,
    width: 100,
    alignItems: 'center',
  },
});
