import React, { Component } from 'react';
import {
  View, FlatList, StyleSheet, Text, TouchableHighlight
} from 'react-native';

class InfoScreen extends Component {
  constructor(props) {
    super(props);
  }

static navigationOptions = {
    headerTitle: 'Hello',
}

  componentDidMount() {
    // eslint-disable-next-line no-console
    console.log('hello Info');
  }


  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: 40 }}>
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

const styles = StyleSheet.create({
  item: {
    padding: 10,
    fontSize: 18,
    height: 30
  }
});

export default InfoScreen;
