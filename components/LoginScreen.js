import React, { Component } from 'react';
import {
 Text, View, StyleSheet, TextInput
} from 'react-native';

// eslint-disable-next-line react/prefer-stateless-function
export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { username: '', password: '' };
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.textInputView}
          placeholder="Email"
          onChangeText={username => this.setState({ username })}
          value={this.state.username}
        />
        <TextInput
          style={styles.textInputView}
          placeholder="Password"
          onChangeText={password => this.setState({ password })}
        />
        <Text style={{ padding: 10, fontSize: 20 }}>{`user input: ${this.state.username}`}</Text>
        <Text style={{ padding: 10, fontSize: 20 }}>{this.state.password}</Text>
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
    borderColor: 'gray',
    borderWidth: 1,
  }
});
