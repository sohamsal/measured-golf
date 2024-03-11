import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import SignUpForm from './forms/SignUpForm'; // Import the SignUpForm component

const SignUpScreen = () => {
  return (
    <View style={styles.container}>
      <ImageBackground source={require('./images/CutOffClub.png')} style={styles.backgroundImage0}></ImageBackground>
      <Text style={styles.bigText}>Sign Up</Text>
      <View style={styles.form}>
        <SignUpForm />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fc7108',
    alignItems: 'center',
  },
  bigText: {
    marginTop: 120,
    fontSize: 40,
    textAlign: 'left',
    color: 'white',
    paddingRight: 200,
    paddingLeft: 35,
    fontWeight: '600', // 400 is normal text, 700 is bold
  },
  backgroundImage0: {
    position: 'absolute',
    width: 120,
    height: 190,
    top: -60,
    left: 270,
    zIndex: 1,
  },
  form: {
    marginTop: 20,
    backgroundColor: 'white',
    flex: 1, // Fill the available vertical space
    width: '100%', // Fill the entire width of the screen
    paddingHorizontal: 20, // Add horizontal padding for better appearance
  }
});

export default SignUpScreen;
