import 'react-native-gesture-handler';
import React from 'react';
import { Provider } from 'react-redux';
import { StyleSheet } from 'react-native';
import AppNavigator from './navigator/index';
import store from './store';

export default function App() {
  return (
    <Provider store={store}>
      <AppNavigator/>
    </Provider>  
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
