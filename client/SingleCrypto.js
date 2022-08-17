import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { GlobalDataContext } from '../App';

export default function SingleCrypto() {
  const { singleCrypto } = React.useContext(GlobalDataContext);
  console.log('SINGLE: ', singleCrypto);
  return (
    <View style={{ flex: 1, backgroundColor: 'teal' }}>
      <Text>Single Crypto</Text>
      <Text>{singleCrypto.name}</Text>
    </View>
  );
}
