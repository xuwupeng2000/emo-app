import React from 'react';
import { WebView, StyleSheet, Text, View } from 'react-native';
import { NativeRouter, Route, Link } from 'react-router-native'
import LoginScreen from './components/LoginScreen.jsx'
import RegisterScreen from './components/RegisterScreen.jsx'

export default class App extends React.Component {
  render() {
    return (
      <NativeRouter>
        <View>
          <Route exact path="/" component={LoginScreen}/> # Login
          <Route path="/register" component={RegisterScreen}/> # Create an account here
          <Route path="/login" component={LoginScreen}/> # Create an account here
        </View>
      </NativeRouter>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
