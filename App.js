import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import BottomTabNavigator from "./navigation/TabNavigator";
import { UserDataProvider } from './contexts/UserContext';
import { PostDataProvider } from './contexts/PostContext';

export default function App() {
  return (
    <UserDataProvider>
      {/*Context wrapping*/}
      <PostDataProvider>
        <NavigationContainer>
          <BottomTabNavigator />
        </NavigationContainer>
      </PostDataProvider>
    </UserDataProvider>
  );
}
