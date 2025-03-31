import React from 'react';

import { AppNavigator } from './app/navigation/AppNavigator';
import { LogBox } from 'react-native';

// Ignore Firebase timer warnings
LogBox.ignoreLogs(['Setting a timer']);

export default function App() {
  return (
   
      <AppNavigator />
    
  );
}
