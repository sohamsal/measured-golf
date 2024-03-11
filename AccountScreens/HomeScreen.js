import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Button
        title="Sign Up"
        onPress={() => navigation.navigate('SignUp')}
        style={styles.button}
      />
      <View style={styles.space}></View>
      <Button
        title="Login"
        onPress={() => navigation.navigate('Login')}
        style={styles.button}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    marginBottom: 10, // Add marginBottom to create space between buttons
  },
  space: {
    height: 10, // Adjust the height to create desired space between buttons
  },
});

export default HomeScreen;
