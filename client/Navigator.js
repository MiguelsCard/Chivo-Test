import { NavigationContainer } from '@react-navigation/native';
import LogIn from './LogIn';
import CryptoList from './CryptoList';
import SingleCrypto from './SingleCrypto';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

export default function Navigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='LogIn'>
          {(props) => <LogIn {...props} />}
        </Stack.Screen>
        <Stack.Screen name='CryptoList'>
          {(props) => <CryptoList {...props} />}
        </Stack.Screen>
        <Stack.Screen name='SingleCrypto'>
          {(props) => <SingleCrypto {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
