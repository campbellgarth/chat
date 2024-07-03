import { useState, useEffect } from 'react';
import { StyleSheet, View, KeyboardAvoidingView, Platform } from 'react-native';
import { Bubble, GiftedChat } from 'react-native-gifted-chat';

const Chat = ({ route, navigation }) => {
  const { name, color } = route.params; //extracts name and color inputs from start screen
  const [messages, setMessages] = useState([]);
  const onSend = (newMessages) => {
    //appends new messages to message state
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, newMessages)
    );
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

  useEffect(() => {
    navigation.setOptions({ title: name }); //sets name as title
    setMessages([
      //sets a static message plus a system message
      {
        _id: 1,
        text: 'Hello ' + `${name}`, //first message in chat
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
      {
        _id: 2,
        text: `${name}` + ' has entered the chat', //system message
        createdAt: new Date(),
        system: true,
      },
    ]);
  }, []);
  return (
    <View
      style={[styles.container, { backgroundColor: color }]} //sets background color
    >
      <GiftedChat //renders chat screen
        messages={messages}
        renderBubble={renderBubble}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: 1,
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
