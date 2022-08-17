import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { GlobalDataContext } from '../App';

export default function SingleCrypto() {
  const { singleCrypto } = React.useContext(GlobalDataContext);
  const [price, setPrice] = useState(singleCrypto.price_usd);
  const [counting, setCounting] = useState(0);
  const [timing, setTiming] = useState(10);
  const fetchSingle = async (singleCrypto) => {
    fetch(`https://api.coinlore.net/api/ticker/?id=${singleCrypto.id}`)
      .then(
        (resp) => resp.json() // this returns a promise
      )
      .then((res) => {
        console.log(res[0]);
        setPrice(res[0].price_usd);
      })
      .catch((ex) => {
        console.error(ex);
      });
  };
  //
  let count = 0;
  let timer = 10;

  useEffect(() => {
    let interval = setInterval(function () {
      timer = 10;
      count += 1;
      setCounting(count);
      if (count === 5) {
        clearInterval(interval);
      }
      console.log(count);
      fetchSingle(singleCrypto);
    }, 10000);
    let clock = setInterval(function () {
      if (timer > 0) {
        timer--;
        setTiming(timer);
      }
      if (count === 5) {
        setTiming(0);
        clearInterval(clock);
      }
    }, 1000);
  }, []);
  return (
    <View style={{ flex: 1, backgroundColor: 'teal', padding: 5 }}>
      <Text>{singleCrypto.name}</Text>
      <Text>Latest Price: {price} USD</Text>
      <Text>Refreshes left: {5 - counting}</Text>
      <Text>{timing} seconds left to the next refresh</Text>
    </View>
  );
}
