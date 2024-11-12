import React, { useEffect, useState } from 'react';
  import { View, Text, StyleSheet, TouchableOpacity, Linking, Alert, Image } from 'react-native';
  import { useNavigation } from '@react-navigation/native';
  import { MaterialIcons } from '@expo/vector-icons';
  import { WebView } from 'react-native-webview';
  import { supabase } from '../lib/supabase';

  const HomeScreen = () => {
    const navigation = useNavigation();
    const [fullName, setFullName] = useState('');

    useEffect(() => {
      fetchUserProfile();
    }, []);

  const fetchUserProfile = async () => {
    const { data } = await supabase.from('profiles').select('full_name')
    setFullName(data[0]?.full_name); // Assuming data contains 'full_name'
  };
    const handlePress = async (idx) => {
      const urls = [
          'https://squareup.com/appointments/book/z7ravidw3wn876/7QQR9MA0FVNTX/services?rwg_token=AAh05qbFCGlk7pYJid-bnUFmeod-t4thq74gAOJfq50h2JjSjRSQxKes6-gC0QEzbGiqwjrY0BW-s8lK3ve1sWHUZoQClGjylg%3D%3D',
          'mailto:info@measuredgolf.commailto:info@measuredgolf.com?subject=Register%20For%20Events'
        ];
      const supported = await Linking.canOpenURL(urls[idx]);
      if (supported) {
        await Linking.openURL(urls[idx]);
      } else {
        Alert.alert(`Don't know how to open this URL: ${urls[idx]}`);
      }
    };
    const handleBarPressHome = () => {
      navigation.navigate('Home');
    };
    const handleBarPressProfile = () => {
      navigation.navigate('Profile');
    };
    return (
      <View style={styles.container}>
        <Text style={styles.welcomeText}>Welcome, {fullName || 'User'}!</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => handlePress(0)}>
            <Text style={[styles.buttonText, { color: 'black' }]}>Schedule Appointments</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handlePress(1)}>
            <Text style={[styles.buttonText, { color: 'black' }]}>Register For Events</Text>
          </TouchableOpacity>
        </View>
        {/* Embed the YouTube video here */}
        <WebView
          style={styles.videoContainer}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          source={{ uri: 'https://www.youtube.com/embed/Y1A9HafQs8I' }}
        />
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
    videoContainer: {
      height: 20,
      width: '90%',
      marginTop: 80,
      marginBottom: 120,
      alignSelf: 'center',
      borderRadius: 15,
      borderWidth: 6,
      borderColor: 'white',
      overflow: 'hidden',
    },
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        backgroundColor: '#FC7108',
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