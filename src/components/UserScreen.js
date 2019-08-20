import React, { Component } from 'react';
import {
  View, Text, Clipboard, StyleSheet, FlatList
} from 'react-native';
import { Button, CheckBox } from 'react-native-elements';
import { Notifications, Permissions } from 'expo';
import { connect } from 'react-redux';
import * as actions from '../actions/index';


async function register() {
  const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
  if (status !== 'granted') {
    alert('You need to enable permission in settings');
    return;
  }
  const token = await Notifications.getExpoPushTokenAsync();
  console.log(status, token);
}

// eslint-disable-next-line react/prefer-stateless-function
class UserScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      name: '',
      deviceinfo: '',
      numofdevices: '',
      checked: false,
    };
  }


//   componentWillMount() {
//     register();
//     this.listener = Notifications.addListener(this.listen);
//   }

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
        this.setState({ numofdevices: this.props.deviceData.content.length });
        this.setState({ deviceinfo: this.props.deviceData.content.map(content => content.id) });
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

//   componentWillUnmount() {
//     this.listener && Notifications.removeListener(this.listen);
//   }

    listen = ({ origin, data }) => {
      console.log('cool data', origin, data);
    }

    checkBoxControl() {
      this.setState({ checked: !this.state.checked });
      if (this.state.checked === false) {
        register();
        this.listener = Notifications.addListener(this.listen);
        alert('Turn on Open Field Mode');
      } else {
        alert('Turn off Open Field Mode');
        // this.listener && Notifications.removeEventListener(this.listen);
      }
    }

  renderSeperator = () => (
    <View
      style={{
        height: 1,
        backgroundColor: '#CED0CE',
      }}
    />
  )

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
          <Button
            title="Click here to copy the authorization token to clipboard"
            buttonStyle={{
              backgroundColor: '#f3dc04',
            }}
            containerStyle={{ padding: 30 }}
            onPress={() => this.copyToken()}
          />
          <View style={styles.listView}>
            <FlatList
              data={[
                {
                  key: 'Username',
                  description: this.state.username,
                },
                {
                  key: 'Name',
                  description: this.state.name
                },
                {
                  key: 'Number of Devices Available',
                  description: this.state.numofdevices
                },
              ]}
              renderItem={({ item }) => (
                <View style={{ flex: 1, flexDirection: 'row' }}>
                  <Text style={styles.keyView}>{item.key}</Text>
                  <Text style={styles.descriptionView}>{item.description}</Text>
                </View>
              )}
              ItemSeparatorComponent={this.renderSeperator}
            />
          </View>
          <CheckBox
            center
            title="Open Field mode"
            checked={this.state.checked}
            onPress={() => this.checkBoxControl()}
          />

        </View>
      );
    }
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 15 }}>Please Log In Again To Have Your Information</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textView: {
    fontSize: 18,
  },
  buttonContainer: {
    padding: 30,
  },
  buttonStyle: {
    backgroundColor: '#f3dc04',
  },
  keyView: {
    padding: 10,
    fontSize: 15,
    flex: 1
  },
  descriptionView: {
    padding: 10,
    fontSize: 15,
    marginLeft: 20
  },
  listView: {
    width: 300,
    paddingTop: 30,
  }
});

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
