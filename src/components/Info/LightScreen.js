import React, { Component } from 'react';
import { Text, View } from 'react-native';

// eslint-disable-next-line react/prefer-stateless-function
export default class LightScreen extends Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Light</Text>
      </View>
    );
  }
}
