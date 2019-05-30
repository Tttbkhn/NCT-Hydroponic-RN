import React, { Component } from 'react';
import { View, Text, Clipboard } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import * as actions from '../actions/index';

// eslint-disable-next-line react/prefer-stateless-function
class UserScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      name: '',
      deviceinfo: '',
      numofdevices: '',
    };
  }

  componentDidMount() {
    this.getUser();
    this.getAllDevices();
  }

  componentDidUpdate(prevProps) {
    if (this.props.authData !== prevProps.authData) {
      this.getUser();
      this.getAllDevices();
    }
  }

  getAllDevices() {
    this.props.getAllDevices(this.props.authData).then(() => {
      if (this.props.error) {
        alert(this.props.error);
      } else {
          this.setState({numofdevices: this.props.deviceData.content.length});
        this.setState({deviceinfo: this.props.deviceData.content.map(content => content.id)});
      }
    });
  }

  getUser() {
    this.props.getUser(this.props.authData).then(() => {
      if (this.props.error) {
        alert(this.props.error);
      } else {
        this.setState({ username: this.props.userData.username });
        this.setState({ name: this.props.userData.name });
      }
    });
  }

  copyToken() {
    Clipboard.setString(this.props.authData.accessToken);
    alert('Copied');
  }

  render() {
    let loggedIn = false;
    if (this.props.isLoggedIn) {
      loggedIn = true;
    }
    if (loggedIn) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>{this.state.username}</Text>
          <Text>{this.state.name}</Text>
          <Button
            title="Click here to copy the authorization token to clipboard"
            buttonStyle={{
              backgroundColor: '#f3dc04',
            }}
            containerStyle={{ padding: 30 }}
            onPress={() => this.copyToken()}
          />
          <Text>
            Number of Devices Available:
            {' '}
            {this.state.numofdevices}
          </Text>
          <Text>{this.state.deviceinfo}</Text>
        </View>
      );
    }
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Please Log In Again To Have Your Information</Text>
      </View>
    );
  }
}


const mapStateToProps = state => ({
  isLoggedIn: state.auth.isLoggedIn,
  authData: state.auth.authData,
  userData: state.user.userData,
  deviceData: state.device.deviceData,
  error: state.user.error
});

const mapDispatchToProps = dispatch => ({
  getUser: authData => dispatch(actions.getUser(authData)),
  getAllDevices: authData => dispatch(actions.getAllDevices(authData))
});

export default connect(mapStateToProps, mapDispatchToProps)(UserScreen);
