import React, { Component } from 'react';
import { Text, View } from 'react-native';

// eslint-disable-next-line react/prefer-stateless-function
export default class ActivityLogScreen extends Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Activity Log</Text>
      </View>
    );
  }
}
