/* eslint-disable no-undef */
/* eslint-disable no-alert */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import {
  Text, View, StyleSheet, TextInput
} from 'react-native';
import { connect } from 'react-redux';
import { Button, Avatar } from 'react-native-elements';
import * as actions from '../actions/index';


// eslint-disable-next-line react/prefer-stateless-function
class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { email: '', password: '' };
  }

  logIn() {
    const { email } = this.state;
    const { password } = this.state;
    this.props.logIn(email, password).then(() => {
      if (this.props.error) {
        alert(this.props.error);
      } else {
        console.log(this.props.authData);
      }
    });
  }

  //   logOut() {
  //     this.props.logOut();
  //   }

  render() {
    let loggedIn = false;
    if (this.props.isLoggedIn) {
      loggedIn = true;
    }
    if (loggedIn) {
      return (
        <View style={styles.container}>
          <Text style={{ fontSize: 20 }}>{`Welcome ${this.state.email}`}</Text>
          <Button
            title="Log Out"
            onPress={() => this.props.logOut()}
            buttonStyle={{
              backgroundColor: '#20ea53',
            }}
            containerStyle={{ padding: 30 }}
          />
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.textInputView}
          placeholder="   Email"
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />
        <TextInput
          style={styles.textInputView}
          placeholder="   Password"
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        />
        <Button
          title="Login"
          buttonStyle={{
            backgroundColor: '#f4dc04',
          }}
          containerStyle={{ padding: 30 }}
          onPress={() => this.logIn()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10
  },
  textInputView: {
    height: 60,
    width: 250,
    paddingLeft: 10,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20
  }
});

const mapStateToProps = state => ({
  isLoggedIn: state.auth.isLoggedIn,
  isLoading: state.auth.isLoading,
  authData: state.auth.authData,
  error: state.auth.error
});

const mapDispatchToProps = dispatch => ({
  logIn: (email, password) => dispatch(actions.logIn({ email, password })),
  logOut: () => dispatch(actions.logOut()),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
