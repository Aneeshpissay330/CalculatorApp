import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import Navigation from './src/navigation';
import { StatusBar, useColorScheme } from 'react-native';
import { colors } from './src/theme/colors';

const App = () => {
  const colorScheme = useColorScheme();
  return (
    <NavigationContainer>
      <StatusBar backgroundColor={colorScheme === "dark" ? colors.black : colors.white} barStyle={colorScheme === "dark" ? "light-content" : "dark-content"} />
      <Navigation />
    </NavigationContainer>
  )
}

export default App;