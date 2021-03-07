import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { APP_TITLE, ADD_SCHEDULE, EDIT_SCHEDULE } from '../constants/index';
import Home from '../components/Home';
import EditForm from '../components/EditForm';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <StatusBar 
        backgroundColor="#64b5f6"/>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ title: APP_TITLE,
            headerTintColor: '#fff',
            headerStyle: {
              backgroundColor: '#1976d2',
            } }}
        />
        <Stack.Screen
          name="Add"
          component={EditForm}
          options={{ title: ADD_SCHEDULE,
            headerTintColor: '#fff',
            headerStyle: {
              backgroundColor: '#1976d2',
            } }}
        />
        <Stack.Screen
          name="Edit"
          component={EditForm}
          options={{ title: EDIT_SCHEDULE,
            headerTintColor: '#fff',
            headerStyle: {
              backgroundColor: '#1976d2',
            } }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default AppNavigator;