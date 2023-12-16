import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { auth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from './firebaseConfig';

// password screen component for handling user login or sign up
const PasswordScreen = ({ route, navigation }) => {
  // retrieve email from route parameters and set up state for password
  const { email } = route.params;
  const [password, setPassword] = useState('');

  // handle user login with email and password
  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigation.navigate('UserProfileScreen');
    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        Alert.alert(
          "Login Failed",
          "Would you like to sign up with this email?",
          [
            { text: "Yes", onPress: handleSignUp },
            { text: "No" }
          ]
        );
      } else {
        Alert.alert('Login Error', error.message);
      }
    }
  };

  // const handleLogin = async () => {
  //   try {
  //     await auth.signInWithEmailAndPassword(auth, email, password);
  //     navigation.navigate('UserProfileScreen');
  //   } catch (error) {
  //     console.log('Login error:', error.message);
  //     Alert.alert(
  //       "Login Failed",
  //       "Would you like to sign up with this email?",
  //       [
  //         { text: "Yes", onPress: handleSignUp },
  //         { text: "No", onPress: () => console.log("User canceled sign up") }
  //       ]
  //     );
  //   }
  // };
  
  // handle user sign up with email and password
  const handleSignUp = async () => {
    try {
      // create new user with provided credentials
      await createUserWithEmailAndPassword(auth, email, password);
      navigation.navigate('UserProfileScreen');
    } catch (error) {
      console.log('Sign up error:', error.message);
    }
  };

  // render the password input and continue button
  return (
    <View style={styles.container}>
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Enter your password"
        secureTextEntry
        style={styles.input}
      />
      <Button title="Continue" onPress={handleLogin} />
    </View>
  );
};

// styles for the password screen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '80%',
    padding: 10,
    margin: 10,
    borderWidth: 1,
    borderColor: 'gray',
  },
});

export default PasswordScreen;
