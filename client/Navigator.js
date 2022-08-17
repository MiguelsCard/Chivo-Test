import { NavigationContainer } from '@react-navigation/native';
import LogIn from './LogIn';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

export default function Navigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Home' component={LogIn} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
