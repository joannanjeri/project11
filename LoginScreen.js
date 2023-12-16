import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { FontAwesome, AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebaseConfig';

// login screen component for authentication
const LoginScreen = ({ navigation }) => {
  // state for email and password
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = useState('');

  // const handleContinue = () => {
  //   signInWithEmailAndPassword(auth, email, password)
  //     .then((userCredential) => {
  //       navigation.navigate('UserProfileScreen');
  //     })
  //     .catch((signInError) => {
  //       if (signInError.code === 'auth/user-not-found') {
  //         createUserWithEmailAndPassword(auth, email, password)
  //           .then((userCredential) => {
  //             navigation.navigate('UserProfileScreen');
  //           })
  //           .catch((createUserError) => {
  //             Alert.alert('Registration Error', createUserError.message);
  //           });
  //       } else {
  //         Alert.alert('Login Error', signInError.message);
  //       }
  //     });
  // };

  // handle navigation to password screen with email
  const handleContinue = () => {
    navigation.navigate('Password', { email });
  };

  // render the login screen UI
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={loginStyles.container}>

        <TouchableOpacity style={loginStyles.closeButton} onPress={() => navigation.goBack()}>
          <AntDesign name="close" size={24} color="black" />
        </TouchableOpacity>

        <Text style={loginStyles.headerText}>Log in or sign up</Text>

        <TextInput style={loginStyles.input} placeholder="Email" keyboardType="email-address" value={email} 
        onChangeText={setEmail} />

        <TextInput
          style={loginStyles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword} />

        <TouchableOpacity 
          style={loginStyles.continueButton} 
          onPress={handleContinue}>
          <Text style={loginStyles.continueButtonText}>Continue</Text>
        </TouchableOpacity>

        <View style={loginStyles.dividerContainer}>
          <View style={loginStyles.line} />
          <Text style={loginStyles.orText}>or</Text>
          <View style={loginStyles.line} />
        </View>

        <TouchableOpacity style={loginStyles.optionButton} onPress={() => { }}>
          <FontAwesome name="phone" size={20} color="black" />
          <Text style={loginStyles.optionButtonText}>Continue with Phone</Text>
        </TouchableOpacity>

        <TouchableOpacity style={loginStyles.optionButton} onPress={() => { }}>
          <AntDesign name="apple1" size={20} color="black" />
          <Text style={loginStyles.optionButtonText}>Continue with Apple</Text>
        </TouchableOpacity>

        <TouchableOpacity style={loginStyles.optionButton} onPress={() => { }}>
          <AntDesign name="google" size={20} color="black" />
          <Text style={loginStyles.optionButtonText}>Continue with Google</Text>
        </TouchableOpacity>

        <TouchableOpacity style={loginStyles.optionButton} onPress={() => { }}>
          <FontAwesome name="facebook" size={20} color="black" />
          <Text style={loginStyles.optionButtonText}>Continue with Facebook</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

// styles for the login screen
const loginStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  closeButton: {
    alignSelf: 'flex-start',
    marginTop: 15,
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 32,
    alignSelf: 'center',
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  continueButton: {
    width: '100%',
    height: 50,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 15,
  },
  continueButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  orText: {
    color: 'gray',
    fontSize: 16,
    marginVertical: 16,
  },
  optionButton: {
    flexDirection: 'row',
    width: '100%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 16,
    padding: 10,
  },
  optionButtonText: {
    marginLeft: 10,
    fontSize: 16,
    color: 'black',
  },

  dividerContainer: {
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 16, 
  },

  line: {
    flex: 1, 
    height: 1, 
    backgroundColor: 'black', 
    marginHorizontal: 10,
  },

});

export default LoginScreen;
