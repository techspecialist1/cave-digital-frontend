// AppNavigator.js

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import {
  HomeScreen,
  LoginScreen,
  SignUpScreen,
  TaskDetailScreen,
} from '../../screens';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Registration" component={SignUpScreen} />
      <Stack.Screen name="TaskDetailScreen" component={TaskDetailScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
