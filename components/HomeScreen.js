import React, { Component } from 'react';
import {
  View, Text, FlatList, StyleSheet, Image, ActivityIndicator, Alert
} from 'react-native';

export default class HomeScreen extends Component {
  static navigationOptions = {
    title: 'Change ome',
  }

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      dataSource: null
    };
    this.getItem = this.getItem.bind(this);
  }

  async componentDidMount() {
    try {
      const response = await fetch('https://reactnativecode.000webhostapp.com/FlowersList.php');
      const responseJson = await response.json();
      this.setState({
        isLoading: false,
        dataSource: responseJson,
      }, () => {
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  }

  getItem = (name) => {
    Alert.alert(name);
  }

  render() {
    const { isLoading } = this.state;
    const { dataSource } = this.state;
    if (isLoading) {
      return (
        <View style={{ flex: 1, padding: 20, justifyContent: 'center' }}>
          <ActivityIndicator size="large" />
        </View>
      );
    }

    return (
      <View style={{ flex: 1, paddingTop: 20 }}>
        <FlatList
          data={dataSource}
          renderItem={({ item }) => (
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <Image source={{ uri: item.flower_image_url }} style={styles.imageView} />
              <Text
                onPress={this.getItem.bind(this, item.flower_name)}
                style={styles.textView}
              >
                {item.flower_name}
              </Text>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  imageView: {

    width: '50%',
    height: 100,
    margin: 7,
    borderRadius: 7

  },

  textView: {

    width: '50%',
    textAlignVertical: 'center',
    padding: 10,
    color: '#000'

  },
});
