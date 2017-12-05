import React, { Component } from 'react'
import { StatusBar } from "react-native";
import LoginScreen from './components/LoginScreen.js'
import RegisterScreen from './components/RegisterScreen.js'
import ManageDevicesScreen from './components/ManageDeviceScreen.js'
import AddNewDeviceScreen from './components/AddNewDeviceScreen.js';
import MapScreen from './components/MapScreen.js'
import SettingScreen from './components/SettingScreen.js'
import { StackNavigator, DrawerNavigator } from 'react-navigation';
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

const EmoApp = StackNavigator({
  Home: { screen: HomeScreen },
  Register: { screen: RegisterScreen },
  Devices: {
    screen: DrawerNavigator(
      {
        ManageDevices: { screen: ManageDevicesScreen },
        LinkNewDevice: { screen: AddNewDeviceScreen, navigationOptions: ({ navigation }) => ({ title: 'Add new device', }) },
        Map: { screen: MapScreen },
        Settings: { screen: SettingScreen },
      })
  }
},
  {
    headerMode: 'none'
  }
);

export default EmoApp;