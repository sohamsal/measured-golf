import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import SignUpForm from './forms/SignUpForm'; // Import the SignUpForm component

const SignUpScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create an Account</Text>
      <SignUpForm />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default SignUpScreen;
