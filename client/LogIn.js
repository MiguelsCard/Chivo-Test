import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';

export default function LogIn() {
  const [username, setUsername] = useState('');
  const handleSubmit = () => {
    if (username) {
      console.log('LOGGING IN AS: ', username);
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
  },
  button: {
    margin: 10,
    backgroundColor: 'lightblue',
    borderRadius: 10,
    padding: 10,
    paddingHorizontal: 20,
  },
});
