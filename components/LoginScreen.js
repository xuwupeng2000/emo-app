import React, { Component } from 'react'
import { StatusBar, StyleSheet } from "react-native";
import authLogic from './AuthLogic.js'
import { httpClient } from './HttpClient.js'
import { H1, Button, Label, FooterTab, Body, Container, Footer, Header, Content, Form, Item, Input, Text, Left, Right, Icon, Title, StyleProvider } from 'native-base';
import Emojicon from 'react-native-emojicon';
import getTheme from '../native-base-theme/components';
import material from '../native-base-theme/variables/material';

export default class LoginScreen extends Component {

  constructor() {
    super();

    this.state = {
      username: 'jack',
      password: 'pass'
    };
  }

  authenticate() {
    httpClient.post('/api/v1/user_tokens', {auth: this.state})
      .then((resp) => {
        let { token, payload } = resp.data.auth_token;
        authLogic.saveAuthTokenFromHttp(token);
        httpClient.defaults.headers.common['Authorization'] = token;
        this.props.navigation.navigate('Devices');
      }, (err) => {
        alert(err.response.data.errors);
      });
  }

  render() {
    return (
      <StyleProvider style={getTheme(material)}>
        <Container>
          <Header>
          </Header>
          <Content padder>
            <Form>
              <Item floatingLabel>
                <Label>Username</Label>
                <Input defaultValue={this.state.username} autoCapitalize = 'none' onChangeText={(text) => this.setState({username: text})} />
              </Item>
              <Item floatingLabel>
                <Label>Password</Label>
                <Input defaultValue={this.state.password} onChangeText={(text) => this.setState({password: text})} secureTextEntry={true} />
              </Item>

              <Button style={styles.btn} onPress={() => { this.authenticate() }} full bordered>
                <Text>Confirm</Text>
              </Button>
              <Button style={styles.btn} full bordered onPress={() => this.props.navigation.navigate('Register')} >
                <Text>Create new account</Text>
              </Button>
            </Form>
          </Content>
        </Container>
      </ StyleProvider>
    )
  }
};

const styles = StyleSheet.create({
  btn: {
    marginTop:10,
    marginBottom: 10
  }
});
