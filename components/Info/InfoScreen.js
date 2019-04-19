import React, { Component } from 'react';
import {
  View, FlatList, StyleSheet, Text, TouchableHighlight
} from 'react-native';

// eslint-disable-next-line react/prefer-stateless-function
class InfoScreen extends Component {
    // constructor(props) {
    //     super(props);
    //     viewConsole = this.viewConsole;
    // }

    viewConsole(name) {
        console.log(name);
    }

  render() {
    const { navigation } = this.props;
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <FlatList
          data={[
            { key: 'PH' },
            { key: 'SoilHumidity' },
            { key: 'Light' },
            { key: 'EC' },
            { key: 'Water' },
            { key: 'DHT' },
            { key: 'Activity Log' },
          ]}
          renderItem={({ item }) => (
            <TouchableHighlight onPress={() => navigation.navigate(item.key)}>
            {/* this.viewConsole(item.key)} */}
              <Text style={styles.item}>{item.key}</Text>
            </TouchableHighlight>
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    padding: 35,
    fontSize: 18,
    height: 44
  }
});

export default InfoScreen;
