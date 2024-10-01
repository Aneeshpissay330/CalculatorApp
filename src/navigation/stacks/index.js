import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Home from '../../screens/Home';

const Stack = createStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} options={{ title: '' }} />
    </Stack.Navigator>
  )
}

export default MainStack;