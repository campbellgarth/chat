import { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  ImageBackground,
  TouchableOpacity,
  Platform,
} from 'react-native';

const Start = ({ navigation }) => {
  const [name, setName] = useState('');
  const [color, setColor] = useState('');
  const image = require('../assets/background-image.png');

  return (
    <KeyboardAvoidingView //keeps keyboard from covering text box where typing
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <TouchableWithoutFeedback
        onPress={Keyboard.dismiss} //tapping on the screen collapses keyboard
      >
        <View style={styles.container}>
          <ImageBackground
            source={image}
            resizeMode="cover"
            style={styles.image}
          >
            <Text style={styles.title}>Let's Chat</Text>

            <View
              style={styles.infoBox} //textbox to input username
            >
              <TextInput
                style={styles.textInput}
                value={name}
                onChangeText={setName}
                placeholder="Your Name"
              ></TextInput>
              <View
                style={styles.backgroundColorContainer} //various colors to choose background. sent as prop to chat screen
              >
                <Text style={styles.backgroundColorText}>
                  Choose Background Color:
                </Text>
                <View style={styles.buttonRow}>
                  <TouchableOpacity //each button adds a class to focus on button only if chosen
                    style={[
                      styles.backgroundColorButton,
                      styles.blackButton,
                      color === '#090C08' && styles.selectedColorButton,
                    ]}
                    onPress={() => setColor('#090C08')}
                  ></TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.backgroundColorButton,
                      styles.slateButton,
                      color === '#474056' && styles.selectedColorButton,
                    ]}
                    onPress={() => setColor('#474056')}
                  ></TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.backgroundColorButton,
                      styles.grayButton,
                      color === '#8A95A5' && styles.selectedColorButton,
                    ]}
                    onPress={() => setColor('#8A95A5')}
                  ></TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.backgroundColorButton,
                      styles.sageButton,
                      color === '#B9C6AE' && styles.selectedColorButton,
                    ]}
                    onPress={() => setColor('#B9C6AE')}
                  ></TouchableOpacity>
                </View>
              </View>
              <TouchableOpacity //sends to chat screen sending name and background color as props
                style={styles.chatButton}
                onPress={() =>
                  navigation.navigate('Chat', { name: name, color: color })
                }
              >
                <Text style={styles.chatButtonText}>Start Chatting</Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    flex: 1,
    fontSize: 45,
    fontWeight: '600',
    color: '#fff',
    marginTop: 100,
    justifyContent: 'center',
  },
  infoBox: {
    flex: 1,
    position: 'absolute',
    bottom: '4%',
    alignItems: 'center',
    backgroundColor: '#fff',
    height: '44%',
    width: '88%',
  },
  textInput: {
    width: '88%',
    fontSize: 16,
    fontWeight: '300',
    fontColor: '#757083',
    opacity: 0.5,
    padding: 15,
    borderWidth: 1,
    marginBottom: 15,
    marginTop: 20,
  },
  chatButton: {
    backgroundColor: '#757083',
    width: '88%',
    height: '18%',
    padding: 15,
    alignItems: 'center',
    borderRadius: 5,
    position: 'absolute',
    bottom: '5%',
  },
  chatButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginTop: 5,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },

  backgroundColorContainer: {
    width: '88%',
    alignItems: 'left',
    marginBottom: 15,
    marginTop: 5,
  },
  backgroundColorText: {
    fontSize: 16,
    fontWeight: '300',
    fontColor: '#757083',
    textAlign: 'left',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  backgroundColorButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    opacity: 1,
    margin: 5,
  },
  selectedColorButton: {
    borderWidth: 3,
    borderColor: '#757083',
  },
  blackButton: {
    backgroundColor: '#090C08',
  },
  slateButton: {
    backgroundColor: '#474056',
  },
  grayButton: {
    backgroundColor: '#8A95A5',
  },
  sageButton: {
    backgroundColor: '#B9C6AE',
  },
});

export default Start;
