import {
  StyleSheet,
  View,
  TextInput,
  Text,
  Alert,
  Button,
  ScrollView,
} from 'react-native';
import Start from './components/Start';
import Chat from './components/Chat';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState } from 'react';

const Stack = createNativeStackNavigator();

const App = () => {
  const [text, setText] = useState('');
  const alertMyText = () => {
    Alert.alert(text);
  };
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen name="Chat" component={Chat} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
