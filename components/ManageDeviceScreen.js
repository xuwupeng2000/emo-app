import React, {Component} from 'react';
import { Alert, StatusBar, StyleSheet } from "react-native";
import { httpClient } from './HttpClient.js'
import { Card, CardItem, Icon, Button, Body, Container, Header, Content, Text, Left, Right, Title, List, ListItem, Footer, FooterTab } from 'native-base';
import { StackNavigator } from 'react-navigation';
import AddNewDeviceScreen from './AddNewDeviceScreen.js';

class ManageDevicesScreen extends Component {

  static navigationOptions = {
    drawerLabel: 'Manage devices',
    header: null
  };

  constructor() {
    super();

    this.state = {
      devices: [],
    };

    this.listSensors();
  }

  unlinkSensorToAccount(device) {
    let id = device.serial_code;
    httpClient.delete('/api/v1/user_sensors/' + id)
      .then((resp) => {
        let sensors = resp.data.sensors;
        this.setState({ devices: sensors });
      })
      .catch((err) => {
        alert(err);
      });
  }

  onUnlinkButtonPress(device) {
    Alert.alert(
      null,
      'Are you sure you want to unlink this device?',
      [
        {text: 'Cancel', onPress: () => {}, style: 'cancel'},
        {text: 'Confirm', onPress: () => {this.unlinkSensorToAccount(device)}},
      ],
      { cancelable: false }
    )
  }

  onAddButtonPress() {
    this.props.navigation.navigate('LinkNewDevice');
  }

  listSensors() {
    httpClient.get('/api/v1/user_sensors')
      .then((resp) => {
        let sensors = resp.data.sensors;
        this.setState({ devices: sensors });
      })
      .catch((err) => {
        alert(err);
      });
  }

  render() {
    let devices = this.state.devices.map((d) => {
      return (
        <CardItem key={d.serial_code} style={styles.device}>
          <Body style={styles.device}>
            <Text>{d.serial_code}</Text>
          </Body>
          <Right>
            <Button transparent onPress={() => {this.onUnlinkButtonPress(d)}} iconLeft danger>
              <Icon name="ios-remove-circle"></Icon>
            </Button>
          </Right>
        </CardItem>
      );
    });

    return (
      <Container>

        <Header>
          <Left>
            <Button onPress={() => this.props.navigation.navigate('DrawerOpen')} transparent>
              <Icon name='menu' />
            </Button>
          </Left>
          <Body>
            <Title>Devices 📱</Title>
          </Body>
          <Right />
        </Header>

        <Content>
          <Card>
            {devices}
          </Card>
        </Content>

        <Footer>
          <FooterTab>
            <Button onPress={() => {this.onAddButtonPress()}}>
              <Icon name="ios-add-circle-outline" />
              <Text>Add new device</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>

    )
  }
};

const DeviceStackNav = StackNavigator({
  ManageDevices: { screen: ManageDevicesScreen },
  LinkNewDevice: { screen: AddNewDeviceScreen },
});

export default DeviceStackNav;

const styles = StyleSheet.create({
  device: {
  }
});
