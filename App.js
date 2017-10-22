import React from 'react';
import { WebView, StyleSheet, Text, View } from 'react-native';

export default class App extends React.Component {
  render() {
    return (

      <WebView 
        source={{uri: 'https://radiant-springs-36432.herokuapp.com/'}}
        style={styles.container}>

      </WebView>
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
