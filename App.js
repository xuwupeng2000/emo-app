import React, { Component } from 'react'
import { StatusBar } from "react-native";
import LoginScreen from './components/LoginScreen.js'
import RegisterScreen from './components/RegisterScreen.js'
import DeviceStackNav from './components/ManageDeviceScreen.js'
import { DrawerNavigator } from 'react-navigation';
import { Root } from 'native-base';

class HomeScreen extends Component {
 static navigationOptions = {
    drawerLabel: 'Login'
  };

  render() {
    return (
      <LoginScreen {...this.props} />
    );
  }
}

const EmoApp = DrawerNavigator({
  Home: { screen: HomeScreen },
  Register: { screen: RegisterScreen },
  Devices: { screen: DeviceStackNav},
});

export default EmoApp;