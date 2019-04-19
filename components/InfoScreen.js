import React, { Component } from 'react';
import {
  View, FlatList, StyleSheet, Text, TouchableHighlight
} from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';

class InfoScreen extends Component {
  // constructor(props) {
  //   super(props);
  // }

  componentDidMount() {
    // eslint-disable-next-line no-console
    console.log('hello Info');
  }


  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <FlatList
          data={[
            { key: 'PH' },
            { key: 'Soil Humidity' },
            { key: 'Light' },
            { key: 'EC' },
            { key: 'Water' },
            { key: 'DHT' },
            { key: 'Activity Log' },
          ]}
          renderItem={({ item }) => {
            return (
              <TouchableHighlight onPress={() => navigate('{item.key}')}>
                <Text style={styles.item}>{item.key}</Text>
              </TouchableHighlight>
            );
          }}
        />
      </View>

    );
  }
}
// const StackNavigator = createStackNavigator({
//   PH: PHScreen,
//   SoilHumidity: SHScreen,
//   Light: LightScreen,

// })
const styles = StyleSheet.create({
  item: {
    padding: 35,
    fontSize: 18,
    height: 44
  }
});

export default InfoScreen;
