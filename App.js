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
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

import { LogBox } from 'react-native'; //ignore warnings in expo
LogBox.ignoreAllLogs();

const Stack = createNativeStackNavigator();

const App = () => {
  //configuration for firebase
  const firebaseConfig = {
    apiKey: 'AIzaSyD5_DN2Ql8NjU0cLyyRPkfSGWYgZR2OQFg',
    authDomain: 'chat-abd95.firebaseapp.com',
    projectId: 'chat-abd95',
    storageBucket: 'chat-abd95.appspot.com',
    messagingSenderId: '802200774428',
    appId: '1:802200774428:web:d17ce16fe8c110a28d7cd9',
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  // Initialize Cloud Firestore and get a reference to the service
  const db = getFirestore(app);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen name="Chat">
          {(props) => <Chat db={db} {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
