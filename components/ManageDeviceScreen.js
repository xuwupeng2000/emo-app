import React, {Component} from 'react';
import { Alert, StatusBar, StyleSheet } from "react-native";
import { httpClient } from './HttpClient.js'
import { View, Card, CardItem, Icon, Button, Body, Container, Header, Content, Text, Left, Right, Title, List, ListItem, Footer, FooterTab } from 'native-base';

export default class ManageDevicesScreen extends Component {

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

  onViewTrackButtonPress(device) {
    this.props.navigation.navigate('Map', { params: device });
  }

  render() {
    let devices = this.state.devices.map((d) => {
      return (
        <View key={d.serial_code} >
          <CardItem>
            <Text>{d.serial_code}</Text>
          </ CardItem>
          <CardItem>
            <Left>
              <Button transparent onPress={() => {this.onViewTrackButtonPress(d)}} bordered full>
                <Text>View Tacks</Text>
              </Button>
            </Left>
            <Right>
              <Button transparent onPress={() => {this.onUnlinkButtonPress(d)}} bordered full danger>
                <Text>Remove</Text>
              </Button>
            </Right>
          </CardItem>
        </View>
      );
    });

    let drawer = (
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
    );

    return (
      <Container>
        {drawer}

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
}
