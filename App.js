import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import pHScreen from './components/pHScreen';

export default class App extends React.Component {
  componentDidMount(){
    console.log('hello')
  } 
  render() {
    return (
      <AppContainer />
    );
  }
}

class HomeScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Home!</Text>
      </View>
    );
  }
}

class SettingsScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Settings!</Text>
      </View>
    );
  }
}

const TabNavigator = createBottomTabNavigator({
  Home: HomeScreen,
  Settings: SettingsScreen,
  pH: pHScreen
});

const AppContainer = createAppContainer(TabNavigator);

styles = StyleSheet.create({
  home: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'
  }
});