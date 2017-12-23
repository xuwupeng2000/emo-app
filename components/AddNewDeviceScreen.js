import React, { Component } from 'react'
import { StatusBar, StyleSheet } from "react-native";
import authLogic from './AuthLogic.js'
import { httpClient } from './HttpClient.js'
import { H1, Button, Label, FooterTab, Body, Container, Footer, Header, Content, Form, Item, Input, Text, Left, Right, Icon, Title } from 'native-base';

export default class AddNewDeviceScreen extends Component {

  static navigationOptions = {
    headerTitle: 'Add'
  };

  constructor() {
    super();

    this.state = {
      serial_code: '',
      serial_code_confirmation: ''
    };
  }

  addSensorToAccount() {
    httpClient.post('/api/v1/user_sensors', { sensor: this.state })
      .then((resp) => {
        this.props.navigation.navigate('ManageDevices');
      })
      .catch((err) => {
        alert(err.response.data.errors);
      });
  }

  render() {

    let drawer = (
      <Header>
        <Left>
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

        <Content padder>
          <Form>
            <Item floatingLabel>
              <Label>Serial code</Label>
              <Input autoCapitalize='none' onChangeText={(text) => this.setState({ serial_code: text })} />
            </Item>
            <Item floatingLabel>
              <Label>Serial code confirmation</Label>
              <Input autoCapitalize='none' onChangeText={(text) => this.setState({ serial_code_confirmation: text })} />
            </Item>

            <Button style={styles.btn} onPress={() => { this.addSensorToAccount() }} full bordered>
              <Text>Add</Text>
            </Button>
          </Form>
        </Content>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  btn: {
    marginTop: 10,
    marginBottom: 10
  }
});

