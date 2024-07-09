import { useState, useEffect } from 'react';
import { StyleSheet, View, KeyboardAvoidingView, Platform } from 'react-native';
import { Bubble, GiftedChat, InputToolbar } from 'react-native-gifted-chat';
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
} from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomActions from './CustomActions';
import MapView from 'react-native-maps';

const Chat = ({ db, route, navigation, isConnected, storage }) => {
  const { userID, name, color } = route.params; //extracts name and color inputs from start screen
  const [messages, setMessages] = useState([]);
  const onSend = (newMessages) => {
    //adds new messages to collection
    addDoc(collection(db, 'messages'), newMessages[0]);
  };

  const renderBubble = (props) => {
    //sets chat bubble colors
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#EA9087', // user's messages
          },
          left: {
            backgroundColor: '#EFAF96', //everyone else's messages
          },
        }}
      />
    );
  };
  const renderInputToolbar = (props) => {
    //if disconnected from the internet do not show keyboard to send new messages
    if (isConnected) return <InputToolbar {...props} />;
    else return null;
  };
  // Utility function to determine if a color is dark or light
  const isColorDark = (color) => {
    // Strip the leading '#' if present
    color = color.startsWith('#') ? color.slice(1) : color;

    // Convert the color to RGB values
    const r = parseInt(color.substr(0, 2), 16);
    const g = parseInt(color.substr(2, 2), 16);
    const b = parseInt(color.substr(4, 2), 16);

    // Calculate the brightness of the color
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;

    // Return true if the brightness is less than 128 (dark color)
    return brightness < 128;
  };
  const textColor = isColorDark(color) ? '#FFFFFF' : '#000000'; //sets text color to white if the background is dark and black if it's light

  let unsubMessages;
  useEffect(() => {
    navigation.setOptions({ title: name }); //sets name as title
    if (isConnected === true) {
      // unregister current onSnapshot() listener to avoid registering multiple listeners when useEffect code is re-executed
      if (unsubMessages) unsubMessages();
      unsubMessages = null;
      const q = query(collection(db, 'messages'), orderBy('createdAt', 'desc')); //puts rendered messages in order of oldest to newest

      unsubMessages = onSnapshot(q, (docs) => {
        //renders new messages to screen
        let newMessages = [];
        docs.forEach((doc) => {
          newMessages.push({
            id: doc.id,
            ...doc.data(),
            createdAt: new Date(doc.data().createdAt.toMillis()),
          });
        });
        cacheMessages(newMessages);
        setMessages(newMessages);
      });
    } else loadCachedMessages(); //load messages that are in the cache if not online

    //clean up code to avoid memory leaks
    return () => {
      if (unsubMessages) unsubMessages();
    };
  }, [isConnected]);
  const cacheMessages = async (messagesToCache) => {
    //caches the new messages
    try {
      await AsyncStorage.setItem('messages', JSON.stringify(messagesToCache));
    } catch (error) {
      console.log(error.message);
    }
  };

  const loadCachedMessages = async () => {
    const cachedMessages = (await AsyncStorage.getItem('messages')) || [];
    setMessages(JSON.parse(cachedMessages));
  };

  const renderCustomActions = (props) => {
    //renders the + box for taking a pic/location
    return <CustomActions storage={storage} userID={userID} {...props} />;
  };
  const renderCustomView = (props) => {
    //renders location view
    const { currentMessage } = props;
    if (currentMessage.location) {
      //if current message includes a location, render the map view
      return (
        <MapView
          style={{ width: 150, height: 100, borderRadius: 13, margin: 3 }}
          region={{
            latitude: currentMessage.location.latitude,
            longitude: currentMessage.location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
      );
    }
    return null;
  };
  return (
    <View
      style={[styles.container, { backgroundColor: color }]} //sets background color
    >
      <GiftedChat //renders chat screen
        messages={messages}
        renderBubble={renderBubble}
        renderInputToolbar={renderInputToolbar}
        renderActions={renderCustomActions}
        renderCustomView={renderCustomView}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: userID,
          name: name,
        }}
      />
      <KeyboardAvoidingView //keeps keyboard from covering text box where typing
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
  },
});

export default Chat;
