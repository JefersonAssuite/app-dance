import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

// Importe seus componentes de tela
import HomeScreen from '../screens/Home/Index';
import ProfileScreen from '../screens/Perfil/Index';
import AlongamentoScreen from '../screens/Alongamento/Index';
import DancaScreen from '../screens/Danca/Index';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Dança') {
            iconName = focused ? 'walk' : 'walk-outline';
          } else if (route.name === 'Alongamento') {
            iconName = focused ? 'fitness' : 'fitness-outline';
          } else if (route.name === 'Perfil') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#ffcbdb',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen 
        name="Alongamento" 
        component={AlongamentoScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen 
        name="Dança" 
        component={DancaScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen 
        name="Perfil" 
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}