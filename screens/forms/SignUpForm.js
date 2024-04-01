import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
// import auth from '@react-native-firebase/auth';

const SignupForm = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // general player information 
  const [age, setAge] = useState('');
  const [playerType, setPlayerType] = useState(''); // Drop down: Junior, College, Adult, Pro
  const [competitivePlay, setCompetitivePlay] = useState(''); // Drop down: Yes / No
  const [memberStatus, setMemberStatus] = useState(''); // Drop down: None / Facility / Coaching / All In
  const [averageScore, setAverageScore] = useState('');
  const [height, setHeight] = useState('');
  const [armSpan, setArmSpan] = useState('');
  const [rightOrLeftHanded, setRightOrLeftHanded] = useState('');
  const [postStyle, setPostStyle] = useState(''); // Drop down: Front, Center, Rear, Not Sure
  const [injuryHistory, setInjuryHistory] = useState('');
  const [otherSportsHistory, setOtherSportsHistory] = useState('');

  const handleEmailChange = (text) => {
    setEmail(text);
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
  };

  const handleConfirmPasswordChange = (text) => {
    setConfirmPassword(text);
  };

  const handleAgeChange = (text) => {
    setAge(text);
  };

  const handlePlayerTypeChange = (text) => {
    setPlayerType(text);
  };

  const handleCompetitivePlayChange = (text) => {
    setCompetitivePlay(text);
  };

  const handleMemberStatusChange = (text) => {
    setMemberStatus(text);
  };
  
  const handleAverageScoreChange = (text) => {
    setAverageScore(text);
  };

  const handleHeightChange = (text) => {
    setHeight(text);
  };
  
  const handleArmSpanChange = (text) => {
    setArmSpan(text);
  };

  const handleRightOrLeftChange = (text) => {
    setRightOrLeftHanded(text);
  };

  const handlePostStyleChange = (text) => {
    setPostStyle(text);
  };
  
  const handleinjuryHistoryChange = (text) => {
    setInjuryHistory(text);
  };

  const handleOtherSportsHistoryChange = (text) => {
    setOtherSportsHistory(text);
  };


  const handleSubmit = () => { // may need to make async later
    // Perform necessary actions, ie. validating input and creating a new user
    if (password !== confirmPassword) {
      // Passwords don't match, display an error message
      Alert.alert('Passwords do no match');
      console.error('Passwords do not match');
      return;
    }

    // Do something with the email and password ie. sign up the user
    try {
      console.log('Email:', email); 
      console.log('Password:', password);
      // await auth().createUserWithEmailAndPassword(email, password);

      navigation.navigate('Home'); // TODO: Replace with where we're redirecting after login
    }
    catch(error) {
      Alert.alert('Sign up failed', error.message);
      console.error('Sign up failed:', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={handleEmailChange}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="New Password"
        value={password}
        onChangeText={handlePasswordChange}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm New Password"
        value={confirmPassword}
        onChangeText={handleConfirmPasswordChange}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Age"
        value={age}
        onChangeText={handleAgeChange}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Player Type"
        value={playerType}
        onChangeText={handlePlayerTypeChange}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Competitive Play"
        value={competitivePlay}
        onChangeText={handleCompetitivePlayChange}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Member Status"
        value={memberStatus}
        onChangeText={handleMemberStatusChange}
        secureTextEntry
      /> 
      <TextInput
        style={styles.input}
        placeholder="Average Score"
        value={averageScore}
        onChangeText={handleAverageScoreChange}
        secureTextEntry
      />     
      <TextInput
        style={styles.input}
        placeholder="Height"
        value={height}
        onChangeText={handleHeightChange}
        secureTextEntry
      /> 
      <TextInput
        style={styles.input}
        placeholder="Arm Span"
        value={armSpan}
        onChangeText={handleArmSpanChange}
        secureTextEntry
      /> 
      <TextInput
        style={styles.input}
        placeholder="Right/Left Handed"
        value={rightOrLeftHanded}
        onChangeText={handleRightOrLeftChange}
        secureTextEntry
      /> 
      <TextInput
        style={styles.input}
        placeholder="Post Style"
        value={postStyle}
        onChangeText={handlePostStyleChange}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Injury History"
        value={injuryHistory}
        onChangeText={handleinjuryHistoryChange}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Other Sports History"
        value={otherSportsHistory}
        onChangeText={handleOtherSportsHistoryChange}
        secureTextEntry
      />
      <Button title="Submit" onPress={handleSubmit} />
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
  input: {
    width: '100%',
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
});

export default SignupForm;
