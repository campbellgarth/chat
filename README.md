# Chat

Chat is an RTA chatting app made in React Native. Users are able to chat in real-time, send photos, and send their location.

## Github

Find the project on [Github](https://github.com/campbellgarth/chat)

## Key Features

● Users can enter their name and choose a background color for the chat screen
before joining the chat.

● A page displays the conversation, as well as an input field and submit button.

● The chat provides users with two additional communication features: sending images
and location data.

● Online and Offline storage functionality

## Technologies used

● React Native

● Gifted Chat

● Expo

● Android Studio

● Google Firebase/Firestore

## Operation manual

To use this project, please fork on [Github](https://github.com/campbellgarth/chat)

### Dependencies

It is important to use NPM to download the following project dependencies:

    "@react-navigation/native": "^6.1.17",

    "@react-navigation/native-stack": "^6.9.26",

    "expo": "~51.0.17",

    "expo-status-bar": "~1.12.1",

    "firebase": "^10.3.1",

    "react": "18.2.0",

    "react-native": "0.74.2",

    "react-native-gifted-chat": "^2.4.0",

    "react-native-safe-area-context": "4.10.1",

    "react-native-screens": "3.31.1",

    "@react-native-async-storage/async-storage": "1.23.1",

    "@react-native-community/netinfo": "11.3.1",

    "expo-image-picker": "~15.0.7",

    "expo-location": "~17.0.1",

    "react-native-maps": "1.14.0"

In addition, it is recommended for the project to use a version of Node.js at or below 16.19.0.

### Firebase

This project requires an account on [Google Firebase](https://firebase.google.com/) Create an account to use it.

Create a project in production mode and choose the server location closest to you.

All authentication will be done via Firebase, and you are able to create your own authentication method and get new credentials.

Storage is done via the Firestore database. When creating a database, it is important to make the data public by setting the rules to: allow read, write: if true; (instead of false).

### Android Studio

Testing on android devices is done for this app via Android Studio. Please visit [Android Studio](https://developer.android.com/studio/run/emulator-acceleration) for assistance with setup.

Android Emulator requires open disk space on your computer to run. If you are having issues running the emulator, please assure first you have sufficient disk space.

### Expo

Expo allows you to test your app via emulators such as Android Studio or Xcode as well as your physical smartphone. Create an account on [Expo](https://expo.dev/) to get started. In addition, download the Expo Go app on your smartphone.

To start your project, type the following in the terminal:

npx create-expo-app project-name --template (where "project-name" is the name of your project). Choose a Blank canvas to start.

To run expo, type "npm run start" in your terminal or "npx expo start"

To test on your emulator, press A for Android or I for IOS. To test on your smartphone, scan the QR code. If you get stuck at any point, you can refresh with R.
