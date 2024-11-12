import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Image, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { supabase } from '../lib/supabase';

// Importing images
import i1 from '../assets/i1.png';
import i2 from '../assets/i2.png';
import i3 from '../assets/i3.png';
import i4 from '../assets/i4.png';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [profileData, setProfileData] = useState({
    fullName: '',
    averageScore: '',
    height: '',
    age: '',
    postStyle: '',
    competitivePlay: '',
    armSpan: ''
  });

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    const { data } = await supabase.from('profiles').select('*');
    if (data && data.length > 0) {
      const { full_name, average_score, height, age, post_style, competitive_play, arm_span } = data[0];
      setProfileData({
        fullName: full_name || 'User',
        averageScore: average_score || 'Unknown Score',
        height: height || 'Unknown',
        age: age || 'Unknown',
        postStyle: post_style || 'Unknown',
        competitivePlay: competitive_play || 'Unknown',
        armSpan: arm_span || 'Unknown'
      });
    }
  };

  const handlePress = async (idx) => {
    const urls = ['https://www.clippd.com/', 'https://www.thestacksystem.com/', 'https://www.bluegolf.com/', 'https://www.trackman.com/'];
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
      <Text style={styles.welcomeText}>{profileData.fullName}</Text>
      <Text style={styles.infoText}>Average Score: {profileData.averageScore}</Text>
      <Text style={styles.infoText}>Height: {profileData.height}</Text>
      <Text style={styles.infoText}>Age: {profileData.age}</Text>
      <Text style={styles.infoText}>Post Style: {profileData.postStyle}</Text>
      <Text style={styles.infoText}>Competitive Play: {profileData.competitivePlay}</Text>
      <Text style={styles.infoText}>Arm Span: {profileData.armSpan}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => handlePress(0)}>
          <Image source={i1} style={styles.buttonImage} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handlePress(1)}>
          <Image source={i2} style={styles.buttonImage} />
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => handlePress(2)}>
          <Image source={i3} style={styles.buttonImage} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handlePress(3)}>
          <Image source={i4} style={styles.buttonImage} />
        </TouchableOpacity>
      </View>
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.profileButton} onPress={handleBarPressHome}>
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
    backgroundColor: '#FC7108',
    paddingTop: 50,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 15,
    marginLeft: 30,
    alignSelf: 'flex-start',
  },
  infoText: {
    fontSize: 20,
    color: 'white',
    marginBottom: 20,
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
    paddingVertical: 20,
    paddingHorizontal: 15,
    marginBottom: 30,
    borderRadius: 15,
    width: '40%',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
  },
  buttonImage: {
    width: 100,
    height: 100,
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
  profileButton: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 25,
    marginRight: 10,
  },
});

export default ProfileScreen;
