// AppNavigator.js

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {
  AddNewTask,
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
      <Stack.Screen name="Signup" component={SignUpScreen} />
      <Stack.Screen name="TaskDetailScreen" component={TaskDetailScreen} />
      <Stack.Screen name="AddNewTask" component={AddNewTask} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
