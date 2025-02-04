import React from "react";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import Catalog from "./Catalog.js"; // Replace with the path to your Catalog screen
import LessonsScreen from "./LessonsScreen.js"; // Replace with the path to your Lessons screen

const Stack = createStackNavigator();

function CatalogStack() {
  return (
    <Stack.Navigator>
      {/* Catalog Screen */}
      <Stack.Screen
        name="Catalog"
        component={Catalog}
        options={{
          headerShown: false,
          gestureDirection: "horizontal-inverted", // Slide left on returning
        }}
      />
      {/* Lessons Screen */}
      <Stack.Screen
        name="Lessons"
        component={LessonsScreen}
        options={{
          headerShown: false,
          gestureDirection: "horizontal", // Slide right on navigation
        }}
      />
    </Stack.Navigator>
  );
}

export default CatalogStack;
