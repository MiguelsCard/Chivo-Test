import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { GlobalDataContext } from '../App';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LogIn({ navigation }) {
  //

  //
  const { username, setUsername } = React.useContext(GlobalDataContext);
  const handleSubmit = async () => {
    if (username) {
      try {
        await AsyncStorage.setItem('username', username);
        console.log('SAVED AND LOGGING IN AS: ', username);
      } catch (e) {
        console.log('DIDNT SAVE');
      }
      navigation.navigate('CryptoList');
    } else {
      console.log('NO USERNAME');
    }
  };
  return (
    <View style={styles.container}>
      <Text>Log in with your username</Text>
      <TextInput
        style={styles.input}
        value={username}
        onChangeText={setUsername}
      ></TextInput>
      <TouchableOpacity style={styles.button} onPress={() => handleSubmit()}>
        <Text>Log in</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    height: '100%',
    padding: 20,
    backgroundColor: 'cyan',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    borderColor: 'black',
    borderWidth: 1,
    width: 250,
  },
  button: {
    margin: 10,
    backgroundColor: 'lightblue',
    borderRadius: 10,
    padding: 10,
    paddingHorizontal: 20,
  },
});
