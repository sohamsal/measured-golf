import React, { useState } from 'react'
import { Alert, StyleSheet, View, AppState, Text, ImageBackground } from 'react-native'
import { supabase } from '../lib/supabase'
import { Button, Input } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


// Tells Supabase Auth to continuously refresh the session automatically if
// the app is in the foreground. When this is added, you will continue to receive
// `onAuthStateChange` events with the `TOKEN_REFRESHED` or `SIGNED_OUT` event
// if the user's session is terminated. This should only be registered once.
AppState.addEventListener('change', (state) => {
  if (state === 'active') {
    supabase.auth.startAutoRefresh()
  } else {
    supabase.auth.stopAutoRefresh()
  }
})

export default function Auth() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [age, setAge] = useState('')
  const [playerType, setPlayerType] = useState('')
  const [competitivePlay, setCompetitivePlay] = useState('')
  const [memberStatus, setMemberStatus] = useState('')
  const [averageScore, setAverageScore] = useState('')
  const [height, setHeight] = useState('')
  const [armSpan, setArmSpan] = useState('')
  const [rightLeftHanded, setRightLeftHanded] = useState('')
  const [postStyle, setPostStyle] = useState('')
  const [injuryHistory, setInjuryHistory] = useState('')
  const [otherSportsHistory, setOtherSportsHistory] = useState('')

  const [loading, setLoading] = useState(false)
  const navigation = useNavigation();
  
  async function signUpWithEmail() {
    setLoading(true);
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
    });
  
    if (error) {
      // Alert.alert(error.message);
      Alert.alert("An error has occured");
    } else if (!session) {
      Alert.alert('Please check your inbox for email verification!');
    } else {
      navigation.navigate('Home');
    }
    setLoading(false);
  }

  return (
    <KeyboardAwareScrollView>
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <ImageBackground source={require('./images/FullClub.png')} style={styles.backgroundImage0}></ImageBackground>
          {/* <Text style={styles.bigText}>Sign Up</Text> */}
          {/* <View style={styles.form}>
            <LoginForm />
          </View> */}
        </View>
        <View style={[styles.verticallySpaced, styles.mt20]}>
          <Input
            label="Email"
            leftIcon={{ type: 'font-awesome', name: 'envelope' }}
            onChangeText={(text) => setEmail(text)}
            value={email}
            placeholder="email@address.com"
            autoCapitalize={'none'}
          />
        </View>
        <View style={styles.verticallySpaced}>
          <Input
            label="Password"
            leftIcon={{ type: 'font-awesome', name: 'lock' }}
            onChangeText={(text) => setPassword(text)}
            value={password}
            secureTextEntry={true}
            placeholder="Password"
            autoCapitalize={'none'}
          />
        </View>
        <View style={styles.verticallySpaced}>
          <Input
            label="Age"
            onChangeText={(text) => setAge(text)}
            value={age}
            secureTextEntry={true}
            autoCapitalize={'none'}
          />
        </View>
        <View style={styles.verticallySpaced}>
          <Input
            label="Player Type"
            onChangeText={(text) => setPlayerType(text)}
            value={playerType}
            secureTextEntry={true}
            autoCapitalize={'none'}
          />
        </View>
        <View style={styles.verticallySpaced}>
          <Input
            label="Competitive Play"
            onChangeText={(text) => setCompetitivePlay(text)}
            value={competitivePlay}
            secureTextEntry={true}
            autoCapitalize={'none'}
          />
        </View>
        <View style={styles.verticallySpaced}>
          <Input
            label="Member Status"
            onChangeText={(text) => setMemberStatus(text)}
            value={memberStatus}
            secureTextEntry={true}
            autoCapitalize={'none'}
          />
        </View>
        <View style={styles.verticallySpaced}>
          <Input
            label="Average Score"
            onChangeText={(text) => setAverageScore(text)}
            value={averageScore}
            secureTextEntry={true}
            autoCapitalize={'none'}
          />
        </View>
        <View style={styles.verticallySpaced}>
          <Input
            label="Height"
            onChangeText={(text) => setHeight(text)}
            value={height}
            secureTextEntry={true}
            autoCapitalize={'none'}
          />
        </View>
        <View style={styles.verticallySpaced}>
          <Input
            label="Arm Span"
            onChangeText={(text) => setArmSpan(text)}
            value={armSpan}
            secureTextEntry={true}
            autoCapitalize={'none'}
          />
        </View>
        <View style={styles.verticallySpaced}>
          <Input
            label="Right/Left Handed"
            onChangeText={(text) => setRightLeftHanded(text)}
            value={rightLeftHanded}
            secureTextEntry={true}
            autoCapitalize={'none'}
          />
        </View>
        <View style={styles.verticallySpaced}>
          <Input
            label="Post Style"
            onChangeText={(text) => setPostStyle(text)}
            value={postStyle}
            secureTextEntry={true}
            autoCapitalize={'none'}
          />
        </View>
        <View style={styles.verticallySpaced}>
          <Input
            label="Injury History"
            onChangeText={(text) => setInjuryHistory(text)}
            value={injuryHistory}
            secureTextEntry={true}
            autoCapitalize={'none'}
          />
        </View>
        <View style={styles.verticallySpaced}>
          <Input
            label="Other Sports History"
            onChangeText={(text) => setOtherSportsHistory(text)}
            value={otherSportsHistory}
            secureTextEntry={true}
            autoCapitalize={'none'}
          />
        </View>
        <View style={styles.verticallySpaced}>
          <Button title="Sign up" buttonStyle={{ backgroundColor: '#FC7108' }} disabled={loading} onPress={() => signUpWithEmail()} />
        </View>
      </View>
    </KeyboardAwareScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: 'stretch',
  },
  mt20: {
    marginTop: 20,
  },
  backgroundImage0: {
    position: 'absolute',
    width: 180,
    height: 190,
    top: -20,
    left: 210,
    zIndex: 1,
  },
})