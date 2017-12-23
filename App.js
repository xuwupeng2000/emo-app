import React, { Component } from 'react'
import LoginScreen from './components/LoginScreen.js'
import RegisterScreen from './components/RegisterScreen.js'
import ManageDevicesScreen from './components/ManageDeviceScreen.js'
import AddNewDeviceScreen from './components/AddNewDeviceScreen.js';
import MapScreen from './components/MapScreen.js'
import SettingScreen from './components/SettingScreen.js'
import { StackNavigator, DrawerNavigator } from 'react-navigation';
import DeviceDetailsScreen from './components/DeviceDetailsScreen';

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
    screen: StackNavigator(
      {
        ManageDevicesScreen: { screen: ManageDevicesScreen },
        LinkNewDevice: { screen: AddNewDeviceScreen },
        Details: {
          screen: DrawerNavigator({
            Details: { screen: DeviceDetailsScreen },
            Map: { screen: MapScreen }
          })
        }
      })
  },
  Settings: { screen: SettingScreen }
},
  {
    headerMode: 'none'
  }
);

export default EmoApp;