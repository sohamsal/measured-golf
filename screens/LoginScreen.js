import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import LoginForm from './forms/LoginForm'; // Import the LoginForm component

const LoginScreen = () => {
  return (
    <View style={styles.container}>
      <ImageBackground source={require('./images/FullClub.png')} style={styles.backgroundImage0}></ImageBackground>
      <Text style={styles.bigText}>Login</Text>
      <View style={styles.form}>
        <LoginForm />
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
    marginTop: 200,
    fontSize: 40,
    textAlign: 'left',
    color: 'white',
    paddingRight: 200,
    paddingLeft: 35,
    fontWeight: '600', // 400 is normal text, 700 is bold
  },
  backgroundImage0: {
    position: 'absolute',
    width: 180,
    height: 190,
    top: -20,
    left: 210,
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

export default LoginScreen;