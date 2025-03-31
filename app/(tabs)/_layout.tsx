import React from 'react';
import { NativeBaseProvider } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from '../../src/navigation/Tab.Navigator';

export default function TabsLayout() {
  return (
    <NativeBaseProvider>
     
        <TabNavigator />
      
    </NativeBaseProvider>
  );
}