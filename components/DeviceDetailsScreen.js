// Show details of device,  and:
// - change EC number,
// - start remote listening,
// - remove device from user account
import React, { Component } from 'react';
import { Alert } from 'react-native';
import { httpClient } from './HttpClient.js'
import { View, Card, CardItem, Form, Item, Button, Label, Input, Body, Container, Header, Content, Text, Left, Right, Title, Footer, FooterTab } from 'native-base';

export default class DeviceDetailsScreen extends Component {

  constructor() {
    super();

    this.state = {
      device: null
    };
  }

  componentWillMount() {
    let device = this.props.navigation.state.params.device;
    this.setState({ device: device });
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

  onUnlinkButtonPress() {
    Alert.alert(
      null,
      'Are you sure you want to unlink this device?',
      [
        { text: 'Cancel', onPress: () => { }, style: 'cancel' },
        { text: 'Confirm', onPress: () => { this.unlinkSensorToAccount(this.state.device) } }
      ],
      { cancelable: false }
    )
  }

  onViewTrackButtonPress() {
    this.props.navigation.navigate('Map', { device: this.state.device });
  }

  render() {
    return (
      <Container>

        <Content>
          <Card>
            {this.state.device ?
              <View key={this.state.device.serial_code} >
                <CardItem>
                  <Text>{this.state.device.serial_code}</Text>
                </ CardItem>
                <CardItem>
                  <Body>
                    <Button style={{ flex: 0 }} full onPress={() => { this.onViewTrackButtonPress() }} bordered>
                      <Text>View Tacks</Text>
                    </Button>
                  </Body>
                </CardItem>

                <CardItem>
                  <Body>
                    <Button full onPress={() => { this.onUnlinkButtonPress() }} bordered danger>
                      <Text>Remove</Text>
                    </Button>
                  </Body>
                </CardItem>

                <CardItem>
                  <Body>
                    <Button full bordered>
                      <Text>Start Remote Listening</Text>
                    </Button>
                  </Body>
                </CardItem>

              </View> : null
            }

          </Card>


          <Card>
            <CardItem>
              <Item floatingLabel>
                <Label>EC Number</Label>
                <Input autoCapitalize='none' onChangeText={(text) => this.setState({ ecNumber: text })} />
              </Item>
            </CardItem>
            <CardItem>
              <Body>
                <Button full bordered>
                  <Text>Confirm EC Number</Text>
                </Button>
              </Body>
            </CardItem>
          </Card>

        </Content>

      </Container>

    )
  }
}
