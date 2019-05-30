import React, { Component } from 'react';
import {
  Button, View, TextInput, StyleSheet
} from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../actions/index';

// eslint-disable-next-line react/prefer-stateless-function
class SignUpScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '', password: '', fullname: '', username: ''
    };
  }

  signUp() {
    const {
      fullname, username, email, password
    } = this.state;
    this.props.signUp(fullname, username, email, password).then(() => {
      if (this.props.error) {
        alert(this.props.error);
      } else {
        alert(`${this.props.authData} user successfully signed up `);
        console.log(this.props.authData);
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.textInputView}
          placeholder="   Fullname"
          onChangeText={fullname => this.setState({ fullname })}
          value={this.state.fullname}
        />
        <TextInput
          style={styles.textInputView}
          placeholder="   Username"
          onChangeText={username => this.setState({ username })}
          value={this.state.username}
        />
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
          title="Sign Up"
          onPress={() => this.signUp()}
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
  isSignedUp: state.auth.isSignedUp,
  authData: state.auth.authData,
  error: state.auth.error
});

const mapDispatchToProps = dispatch => ({
  signUp: (fullname, username, email, password) => dispatch(actions.signUp({
    fullname, username, email, password
  }))
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUpScreen);
