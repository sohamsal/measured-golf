import React, { useState } from 'react'
import { Alert, Text, StyleSheet, View, ImageBackground, AppState } from 'react-native'
import LoginForm from './forms/LoginForm'; // Import the LoginForm component
import { supabase } from '../lib/supabase'
import { Button, Input } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'


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
  const [loading, setLoading] = useState(false)
  const navigation = useNavigation();

  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      Alert.alert(error.message);
    }else {
      navigation.navigate('Home');
    }
    setLoading(false);
  }

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <ImageBackground source={require('./images/FullClub.png')} style={styles.backgroundImage0}></ImageBackground>
        {/* <Text style={styles.bigText}>Login</Text> */}
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
      <View style={[styles.verticallySpaced, styles.mt20]}>
      <Button title="Login" buttonStyle={{ backgroundColor: '#FC7108' }} disabled={loading} onPress={() => signInWithEmail()}/>
      </View>
    </View>
  )
}

// const LoginScreen = () => {
//   return (
//     <View style={styles.topContainer}>
//       <ImageBackground source={require('./images/FullClub.png')} style={styles.backgroundImage0}></ImageBackground>
//       <Text style={styles.bigText}>Login</Text>
//       <View style={styles.form}>
//         <LoginForm />
//       </View>
//     </View>
//   );
// };

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
  topContainer: {
    flex: 1,
    backgroundColor: '#fc7108',
    alignItems: 'center',
  },
  bigText: {
    marginTop: 200,
    fontSize: 40,
    textAlign: 'left',
    color: 'white',
    paddingRight: 200,
    paddingLeft: 35,
    fontWeight: '600', // 400 is normal text, 700 is bold
  },
  backgroundImage0: {
    position: 'absolute',
    width: 180,
    height: 190,
    top: -20,
    left: 210,
    zIndex: 1,
  },
  form: {
    marginTop: 20,
    backgroundColor: 'white',
    flex: 1, // Fill the available vertical space
    width: '100%', // Fill the entire width of the screen
    paddingHorizontal: 20, // Add horizontal padding for better appearance
  }
});

// export default LoginScreen;