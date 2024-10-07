import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { useColorScheme } from 'react-native';
import Home from '../../screens/Home';
import { colors } from '../../theme/colors';
import History from '../../screens/History';

const Stack = createStackNavigator();

const MainStack = () => {
  const colorScheme = useColorScheme();
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} options={{ title: '', headerStyle: { elevation: 0, backgroundColor: colorScheme === "dark" ? colors.black : colors.white }}} />
      <Stack.Screen name="History" component={History} options={{ headerStyle: { elevation: 0, backgroundColor: colorScheme === "dark" ? colors.black : colors.white }, headerTitleStyle: { color: colorScheme === "dark" ? colors.white : colors.black }, headerTintColor: colorScheme === "dark" ? colors.white : colors.black }} />
    </Stack.Navigator>
  )
}

export default MainStack;