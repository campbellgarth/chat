import { useEffect } from 'react';
import { Alert } from 'react-native';
import { useNetInfo } from '@react-native-community/netinfo';
import Start from './components/Start';
import Chat from './components/Chat';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  disableNetwork,
  enableNetwork,
} from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

import { LogBox } from 'react-native'; //ignore warnings in expo
LogBox.ignoreAllLogs();

const Stack = createNativeStackNavigator();

const App = () => {
  const connectionStatus = useNetInfo(); //tracks online connection
  useEffect(() => {
    //alerts if connection is lost
    if (connectionStatus.isConnected === false) {
      Alert.alert('Connection lost!');
      disableNetwork(db);
    } else if (connectionStatus.isConnected === true) {
      enableNetwork(db);
    }
  }, [connectionStatus.isConnected]);
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
  const storage = getStorage(app);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen name="Chat">
          {(props) => (
            <Chat
              isConnected={connectionStatus.isConnected}
              db={db}
              storage={storage}
              {...props}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
