import React, { Component } from 'react';
import {
  View, Text, FlatList, StyleSheet, Image, ActivityIndicator, Alert, ImageBackground
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Button } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';

export default class HomeScreen extends Component {
  static navigationOptions = {
    title: 'Home',
    tabBarIcon: ({ tintColor }) => {
      const IconComponent = Ionicons;
      const iconName = 'ios-home';
      return <IconComponent name={iconName} size={25} color={tintColor} />;
    }
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
        console.log('hello App');
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  }

  getItem = (name) => {
    Alert.alert(name);
  }

  
  renderSeperator = () => (
    <View
      style={{
        height: 1,
        backgroundColor: '#CED0CE',
      }}
    />
  )

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
      <View style={{ flex: 1, paddingTop: 10 }}>
        <ScrollView>
          <View>
            <ImageBackground source={{ uri: dataSource[0].flower_image_url }} style={styles.mainImageView}>
              {/* <Image source={{ uri: dataSource[0].flower_image_url}} style={styles.mainImageView} /> */}
              <Text style={styles.mainTextView}>{dataSource[0].flower_name}</Text>
            </ImageBackground>
          </View>
          <FlatList
            data={dataSource.slice(1)}
            renderItem={({ item }) => (
              <View style={{ flex: 1, flexDirection: 'row' }}>
                <Image source={{ uri: item.flower_image_url }} style={styles.imageView} />
                <View style={{ flex: 1, flexDirection: 'column' }}>
                  <Text
                    onPress={this.getItem.bind(this, item.flower_name)}
                    style={styles.textView}
                  >
                    {item.flower_name}
                  </Text>
                  {/* <Text style={styles.textView}>{item.flower_name}</Text> */}
                </View>
              </View>
            )}
            ItemSeparatorComponent={this.renderSeperator}
            keyExtractor={(item, index) => index.toString()}
          />
        </ScrollView>
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
    textAlignVertical: 'center',
    padding: 10,
    color: '#000'

  },
  mainImageView: {
    borderRadius: 7,
    position: 'relative',
    height: 200
  },
  mainTextView: {
    fontWeight: 'bold',
    color: 'white',
    position: 'absolute',
    bottom: 10,
    left: 20,
    fontSize: 20
  }
});
