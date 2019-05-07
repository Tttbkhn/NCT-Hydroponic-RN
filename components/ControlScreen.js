import React, { Component } from 'react';
import { View, Text, Alert, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';

// eslint-disable-next-line react/prefer-stateless-function
export default class ControlScreen extends Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Button
          onPress={() => Alert.alert('PH UP!')}
          title="PH Up"
          buttonStyle={{
            backgroundColor: '#20ea53',
          }}
          containerStyle={{ padding: 30 }}
        />
        <Button
          onPress={() => Alert.alert('PH DOWN!')}
          title="PH Down"
          buttonStyle={{
            backgroundColor: '#969634',
          }}
          containerStyle={{ padding: 30 }}
        />
        <Button
          onPress={() => Alert.alert('PART A USED!')}
          title="Use part A"
          buttonStyle={{
            backgroundColor: '#f7074b',
          }}
          containerStyle={{ padding: 30 }}
        />
        <Button
          onPress={() => Alert.alert('PART B USED!')}
          title="Use part B"
          buttonStyle={{
            backgroundColor: '#b5c3e5',
          }}
          containerStyle={{ padding: 30 }}
        />
      </View>
    );
  }
}

// const styles = StyleSheet.create({
//     buttonStyle: {
//         color: '#20ea53',
//     }
// });
