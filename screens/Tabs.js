import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import HomeScreen from "./HomeScreen";
import ProfileScreen from "./ProfileScreen";
// import Catalog from "./Catalog";
import { Dimensions } from "react-native";
import LessonsScreen from "./LessonsScreen";
// import CatalogStack from "./CatalogStack";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const Tab = createBottomTabNavigator();

const Tabs = ({ user }) => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "#EEE",
        headerStyle: {
          backgroundColor: "black",
        },
        tabBarStyle: {
          shadowOffset: {
            width: 0,
            height: 0,
          },
          shadowColor: "black",
          shadowRadius: 5,
          shadowOpacity: 1.0,
          height: windowHeight * 0.12,
          marginBottom: 0,
          backgroundColor: "#111",
          borderTopColor: '#111',
          elevation: 0, // This line removes the small white border around the bottom bar
          justifyContent: 'space-between', // This line horizontally aligns the icons
          paddingBottom: 10,  // Add padding at the bottom
          paddingTop: 7,    // Add padding at the top
        },
        tabBarItemStyle: {
          justifyContent: 'center',  // Center icons vertically
          alignItems: 'center',      // Center icons horizontally
          paddingVertical: 2,       // Add some vertical padding
        },
        // Optional: if you want to adjust the label position
        tabBarLabelStyle: {
          marginBottom: 2,  // Adjust space between icon and label
        },
      }}
    >
      {/* <Tab.Screen
        name={"Catalog"}
        component={CatalogStack}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Entypo
              name="folder-video"
              size={28}
              color={focused ? "black" : "black"}
            />
          ),
        }}
      /> */}
      <Tab.Screen
        name={"Home"}
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <FontAwesome
              name="home"
              size={focused ? 28 : 24}
              color={focused ? "white" : "white"}
            />
          ),
        }}
      />
      <Tab.Screen
        name={"Lessons"}
        component={LessonsScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <FontAwesome
              name="book"
              size={focused ? 28 : 24}
              color={focused ? "white" : "white"}
            />
          ),
        }}
      />
      <Tab.Screen
        name={"Profile"}
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <FontAwesome
              name="user"
              size={focused ? 28 : 24}
              color={focused ? "white" : "white"}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
