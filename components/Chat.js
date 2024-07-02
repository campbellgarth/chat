import { useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';

const Chat = ({ route, navigation }) => {
  const { name, color } = route.params; //extracts name and color inputs from start screen

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
  }, []);
  return (
    <View
      style={[styles.container, { backgroundColor: color }]} //sets background color
    >
      <Text style={[styles.text, { color: textColor }]}>Hello {name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
  },
});

export default Chat;
