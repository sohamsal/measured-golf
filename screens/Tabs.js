import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { NavigationContainer } from '@react-navigation/native';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import HomeScreen from "./HomeScreen";
import ProfileScreen from "./ProfileScreen";
import Catalog from "./Catalog";
import { Dimensions } from 'react-native'
import LessonDetailScreen from "./Lessons";
import CatalogStack from "./CatalogStack";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Tab = createBottomTabNavigator() 

const Tabs = ({user}) => {
    return (
        <Tab.Navigator 
        screenOptions={{
            tabBarActiveTintColor: 'black', 
            tabBarInactiveTintColor: 'grey',
            headerStyle: {
                backgroundColor: 'black'
            },
            tabBarStyle: {
                shadowOffset: {
                    width: 0,
                    height: 0
                },
                shadowRadius: 5,
                shadowOpacity: 1.0,
                height: windowHeight*0.1,
                marginBottom:0,
                backgroundColor: 'white'
            }
        }}>
            <Tab.Screen name = {'Catalog'} component = {CatalogStack} options = {{headerShown: false, tabBarIcon: ({ focused }) => 
                <Entypo name="folder-video" size={28} color={focused ? 'black' : 'black'}/>}}/>
            <Tab.Screen name = {'Home'} component = {HomeScreen} options = {{headerShown: false, tabBarIcon: ({ focused }) => 
                <FontAwesome name="home" size={30} color={focused ?  'black' : 'black'} />}} />
            <Tab.Screen name = {'Profile'} component = {ProfileScreen} options = {{headerShown: false,tabBarIcon: ({ focused }) => 
                <FontAwesome name="user" size={28} color={focused ?  'black' : 'black'} />}} />
        </Tab.Navigator>
    )
}

export default Tabs