import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
// import PromptScreen from "./archive/PromptScreen";
// import LoginScreen from "./archive/LoginScreen";
// import SignUpScreen from "./archive/SignUpScreen";
import React from "react";
// import HomeScreen from "./screens/HomeScreen";
import ProfileScreen from "./screens/ProfileScreen";
import Tabs from "./screens/Tabs";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tabs />
      {/*
          <Stack.Navigator>
            <Stack.Screen name = "Prompt" component = {PromptScreen} options={{ headerShown: false }}/>
            <Stack.Screen name="SignUp" component={SignUpScreen}  options={{ headerShown: false }}/>
            <Stack.Screen name="Login" component={LoginScreen}  options={{ headerShown: false }}/>
            <Stack.Screen name="Home" component={HomeScreen}  options={{ headerShown: false }}/>
            <Stack.Screen name="Profile" component={ProfileScreen}  options={{ headerShown: false }}/>
          </Stack.Navigator> 
        */}
    </NavigationContainer>
  );
}
