import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const ProfileScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Profile Screen</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <Text>Go back to Home</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fc7108',
    alignItems: 'center',
  },
});

export default ProfileScreen;
