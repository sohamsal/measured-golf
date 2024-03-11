import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, Alert, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';

const HomeScreen = () => {
  const navigation = useNavigation();

  const handleBarPressHome = () => {
    navigation.navigate('Home');
  };
  const handleBarPressProfile = () => {
    navigation.navigate('Profile');
  };
  return (
    <View style={styles.container}>
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.profileButton} onPress={handleBarPressHome}>
            {/* <Image source={require('../assets/icon.png')} style={styles.barButtonImage} /> */}
            <MaterialIcons name="home" size={32} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.profileButton} onPress={handleBarPressProfile}>
          <MaterialIcons name="person" size={32} color="black" />
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
    bottomBar: {
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        backgroundColor: 'white',
        height: 80,
        paddingHorizontal: 10,
    },
    barButton: {
        width: 100,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 50,
        bottom: 20,
        alignSelf: 'center',
        position: 'relative',
    },
    barButtonImage: {
      width: 70,
      height: 70,
      borderRadius: 35,
    },
    profileButtonContainer: {
      width: 60,
      height: 60,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
      borderRadius: 30,
    },
    profileButton: {
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 25,
        marginRight: 10, // ensure the profile button is pushed to the right
    },
  });  

export default HomeScreen;
