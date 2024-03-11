import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, Alert, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();
  const handlePress = async (idx) => {
    const urls = [
        'https://squareup.com/appointments/book/z7ravidw3wn876/7QQR9MA0FVNTX/services?rwg_token=AAh05qbFCGlk7pYJid-bnUFmeod-t4thq74gAOJfq50h2JjSjRSQxKes6-gC0QEzbGiqwjrY0BW-s8lK3ve1sWHUZoQClGjylg%3D%3D',
        'https://squareup.com/appointments/book/z7ravidw3wn876/7QQR9MA0FVNTX/services?rwg_token=AAh05qbFCGlk7pYJid-bnUFmeod-t4thq74gAOJfq50h2JjSjRSQxKes6-gC0QEzbGiqwjrY0BW-s8lK3ve1sWHUZoQClGjylg%3D%3D'
      ];
    const supported = await Linking.canOpenURL(urls[idx]);
    if (supported) {
      await Linking.openURL(urls[idx]);
    } else {
      Alert.alert(`Don't know how to open this URL: ${urls[idx]}`);
    }
  };

  const handleBarPress = () => {
    navigation.navigate('Profile');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome, Will!</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => handlePress(0)}>
          <Text style={[styles.buttonText, { color: 'black' }]}>Schedule Appointments</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handlePress(1)}>
          <Text style={[styles.buttonText, { color: 'black' }]}>Register For Events</Text>
        </TouchableOpacity>
      </View>
      {/*Add the calendar over here..*/}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.barButton} onPress={handleBarPress}>
            <Image source={require('../assets/icon.png')} style={styles.barButtonImage} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#fc7108',
    paddingTop: 50,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 30,
    marginLeft: 30,
    alignSelf: 'flex-start',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around', 
    alignItems: 'flex-end',
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: 'white',
    paddingVertical: 50,
    paddingHorizontal: 15,
    borderRadius: 15,
    width: '40%',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: 'white',
    height: 80,
  },
  barButton: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 50,
    bottom: 20,
  },
  barButtonImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
  }
});

export default HomeScreen;
