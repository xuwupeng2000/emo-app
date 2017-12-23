import React, { Component } from 'react';
import { httpClient } from './HttpClient.js'
import { View, Card, CardItem, Icon, Button, Body, Container, Item, Content, Text, Footer, FooterTab } from 'native-base';

export default class ManageDevicesScreen extends Component {

  constructor() {
    super();

    this.state = {
      devices: []
    };
  }

  componentDidMount() {
    this.listSensors();
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

  onViewDetailsButtonPress(d) {
    this.props.navigation.navigate('Details', { device: d });
  }

  render() {
    let devices = this.state.devices.map((d) => {
      return (
        <View key={d.serial_code} >
          <Card>
            <CardItem>
              <Text>{d.serial_code}</Text>
            </CardItem>
            <CardItem>
              <Body>
                <Button transparent onPress={() => { this.onViewDetailsButtonPress(d) }} bordered full>
                  <Text>View</Text>
                </Button>
              </Body>
            </CardItem>
          </Card>
        </View>
      );
    });

    return (
      <Container>

        <Content>
          <Card>
            {devices}
          </Card>
        </Content>

        <Footer>
          <FooterTab>
            <Button onPress={() => { this.onAddButtonPress() }}>
              <Icon name="ios-add-circle-outline" />
              <Text>Add new device</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>

    )
  }
}
