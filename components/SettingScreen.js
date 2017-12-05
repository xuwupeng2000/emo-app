import React, { Component } from 'react';
import { StatusBar, StyleSheet, View } from "react-native";
import { httpClient } from './HttpClient.js'
import authLogic from './AuthLogic.js'
import { H1, Button, Separator, Label, Body, Container, Footer, Picker, Header, Content, Form, Item, Input, Text, Left, Right, Icon, Title } from 'native-base';
import { Col, Row, Grid } from "react-native-easy-grid";
import { Dimensions } from 'react-native';
import { style } from 'expo/src/Font';


export default class SettingScreen extends Component {

  constructor() {
    super();

    this.state = {
      ecNumber: '',
      updateFreq: '',
    };

  }

  setUpdateFrequency() {

  }

  setEcNumber() {

  }

  startRemoteListening() {

  }

  signOff() {
    authLogic.logOut();
    this.props.navigation.navigate('Home');
  }

  render() {

    return (
      <Container>
        <Header>
          <Left>
          </Left>
          <Body>
            <Title>Settings</Title>
          </Body>
          <Right></Right>
        </Header>

        <View style={styles.container}>

          <Form>
            <Item floatingLabel>
              <Label>EC Number</Label>
              <Input autoCapitalize='none' onChangeText={(text) => this.setState({ ecNumber: text })} />
            </Item>

            <Button style={styles.btn} onPress={() => { this.setEcNumber() }} full bordered>
              <Text>Confirm EC Number</Text>
            </Button>
          </Form>

          <View style={styles.footer}>
            <Button style={styles.btn} onPress={() => { this.signOff() }} full bordered>
              <Text>Log Out</Text>
            </Button>
            <Button style={styles.btn} onPress={() => { this.startRemoteListening() }} full bordered>
              <Text>Start Remote Listening</Text>
            </Button>
          </View>

        </View>
      </Container >
    );
  }
}

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  btn: {
    width: width,
    marginTop: 10,
    marginBottom: 10
  },

  footer: {
  },

  container: {
    width: width,
    height: height
  }
});