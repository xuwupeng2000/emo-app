import React, {Component} from 'react';
import { StatusBar, StyleSheet } from "react-native";
import { httpClient } from './HttpClient.js'
import { H1, Button, Label, FooterTab, Body, Container, Footer, Header, Content, Form, Item, Input, Text, Left, Right, Icon, Title } from 'native-base';

export default class RegisterScreen extends Component {

  constructor() {
    super();

    this.state = {
      username: '',
      email: '',
      password: '',
      password_confirmation: ''
    };
  }

  createAccount() {
    httpClient.post('/api/v1/users', { user: this.state })
      .then((resp) => {
        this.props.navigation.navigate('Home');
      })
      .catch((err) => {
        alert(err.response.data.errors);
      });
  }

  render() {
    return (
      <Container>
        <Header>
          <Left>
          </Left>
          <Body>
            <Title>Register</Title>
          </Body>
          <Right></Right>
        </Header>

        <Content>
          <Form>
            <Item floatingLabel>
              <Label>Username</Label>
              <Input autoCapitalize = 'none' onChangeText={(text) => this.setState({username: text})} />
            </Item>
            <Item floatingLabel>
              <Label>Email</Label>
              <Input autoCapitalize = 'none' onChangeText={(text) => this.setState({email: text})} />
            </Item>
            <Item floatingLabel>
              <Label>Password</Label>
              <Input onChangeText={(text) => this.setState({password: text})} secureTextEntry={true} />
            </Item>
            <Item floatingLabel>
              <Label>Password Confirmation</Label>
              <Input onChangeText={(text) => this.setState({password_confirmation: text})} secureTextEntry={true} />
            </Item>

            <Button style={styles.btn} onPress={() => { this.createAccount() }} full bordered>
              <Text>Confirm</Text>
            </Button>

            <Button style={styles.btn} full bordered  onPress={() => this.props.navigation.goBack()} >
              <Text>Back</Text>
            </Button>
          </Form>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  btn: {
    marginTop:10,
    marginBottom: 10
  }
});