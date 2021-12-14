import React, { useContext, useEffect } from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';
import { MainStackNavigator, AccountStackNavigator } from './StackNavigation';
import { UserContext } from '../contexts/UserContext'
import { HomeScreen } from '../screens/HomeScreen'

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  const userCtx = useContext(UserContext);

  useEffect(() => { }, [userCtx])

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: 'coral',
        tabBarStyle: {
          "display": "flex"
        }
      }}
    >
      <Tab.Screen name="HomeScreen" component={MainStackNavigator}
        options={{
          tabBarLabel: 'Główna',
          tabBarIcon: ({ color, size }) => (
            <Feather name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen name="Account" component={AccountStackNavigator}
        options={{
          tabBarLabel: 'Konto',
          tabBarIcon: ({ color, size }) => (
            <Feather name="user" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  )
}

export default BottomTabNavigator;