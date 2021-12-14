import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SignInScreen from '../screens/SignInScreen';
import HomeScreen from '../screens/HomeScreen';
import AccountScreen from '../screens/AccountScreen';

const Stack = createStackNavigator();

const MainStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
    }}
    >
      <Stack.Screen 
      name='Home'
      component={HomeScreen}
      options={{
        title: ' '
      }}
      />
    </Stack.Navigator>
  )
}

const AccountStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen
        name="SignInScreen"
        component={SignInScreen}
        options={{
          title: ' '
        }}
      />
      <Stack.Screen
        name="AccountScreen"
        component={AccountScreen}
        options={{
          title: ' '
        }}
      />
    </Stack.Navigator>
  )
}

const MyStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="SignInScreen"
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen
          name="SignInScreen"
          component={SignInScreen}
          options={{
            title: ''
          }}
        />
        <Stack.Screen name="AccountScreen" component={AccountScreen}
          options={{
            title: ''
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export {
  MainStackNavigator, AccountStackNavigator,
  MyStack
};
