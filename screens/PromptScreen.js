import React from 'react';
import { View, Button, Text, StyleSheet, TouchableOpacity, ImageBackground, Linking } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';
import { withSafeAreaInsets } from 'react-native-safe-area-context';

const PromptScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>
        Welcome to Measured Golf!
      </Text>
      <ImageBackground source={require('./images/BackgroundClub.png')} style={styles.backgroundImage0}></ImageBackground>
      <ImageBackground source={require('./images/WhiteBkgd.png')} style={styles.backgroundImage1}>
        <ImageBackground source={require('./images/SignUpButton.png')} style={styles.backgroundImage2}>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
        </ImageBackground>
        <ImageBackground source={require('./images/LoginButton.png')} style={styles.backgroundImage3}>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </ImageBackground>
      </ImageBackground>
      <ImageBackground source={require('./images/LeftBorder.png')} style={styles.backgroundImage4}></ImageBackground>
      <ImageBackground source={require('./images/RightBorder.png')} style={styles.backgroundImage5}></ImageBackground>
      <ImageBackground source={require('./images/Tee.png')} style={styles.backgroundImage6}></ImageBackground>
      <ImageBackground source={require('./images/Flag.png')} style={styles.backgroundImage7}></ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fc7108',
    alignItems: 'center',
  },
  welcomeText: {
    marginTop: 80,
    fontSize: 40,
    textAlign: 'left',
    color: 'white',
    paddingRight: 130,
    paddingLeft: 35,
    fontWeight: '600', // 400 is normal text, 700 is bold
  },
  backgroundImage0: {
    position: 'absolute',
    width: '100%',
    height: '80%',
    top: 150,
    left: 0,
    zIndex: -2,
  },
  backgroundImage1: {
    position: 'absolute',
    width: '100%',
    height: '80%',
    top: 300,
    left: 0,
    zIndex: -1,
  },
  backgroundImage2: {
    position: 'absolute',
    marginLeft: 99,
    marginTop: 80, 
    top: 80,
    left: 1,
    width: 180,
    height: 61,
    zIndex: 1,
  },
  backgroundImage3: {
    position: 'absolute',
    marginLeft: 70, 
    marginTop: 80, 
    top: 160,
    left: 1,
    width: 240,
    height: 61,
    zIndex: 1,
  },
  backgroundImage4: {
    position: 'absolute',
    marginLeft: 10, 
    marginTop: 200, 
    top: 160,
    left: 21,
    width: 92,
    height: 357,
    zIndex: 0,
  },
  backgroundImage5: {
    position: 'absolute',
    marginLeft: 100,
    marginTop: 200, 
    top: 160,
    left: 160,
    width: 92,
    height: 361,
    zIndex: 0,
  },
  backgroundImage6: {
    position: 'absolute',
    marginLeft: 165, 
    marginTop: 50,
    top: 620,
    left: 1,
    width: 50,
    height: 50,
    zIndex: 0,
  },
  backgroundImage7: {
    position: 'absolute',
    marginLeft: 177,
    marginTop: 170,
    top: 160,
    left: 1,
    width: 25,
    height: 40,
    zIndex: 0,
  },
  button: {
    marginTop: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 20,
    color: 'black',
    fontWeight: '500',
  }
});

export default PromptScreen;
