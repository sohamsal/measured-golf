import { createStackNavigator } from '@react-navigation/stack';
import Catalog from './Catalog';
import LessonsScreen from './Lessons';

const Stack = createStackNavigator();

function CatalogStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Catalog" component={Catalog} options={{ headerShown: false }}/>
      <Stack.Screen name="Lessons" component={LessonsScreen} options={{ headerShown: false }}/>
    </Stack.Navigator>
  );
}

export default CatalogStack;