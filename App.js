import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import store from './assets/store/store';
import HomeScreen from './assets/screens/HomeScreen';
import GateManagementScreen from './assets/screens/GateManagementScreen';
import GuardAssignmentScreen from './assets/screens/GuardAssignmentScreen';
import SplashScreen from './assets/screens/SplashScreen';

const Stack = createStackNavigator();

function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{ headerShown: false }}
        />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Gate Management" component={GateManagementScreen} />
          <Stack.Screen name="Guard Assignment" component={GuardAssignmentScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
