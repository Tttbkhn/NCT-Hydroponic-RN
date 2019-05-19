/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import {
  View, StyleSheet, Text, FlatList
} from 'react-native';
import { MapView } from 'expo';


export default class ContactScreen extends Component {
    renderSeperator = () => (
      <View
        style={{
          height: 1,
          backgroundColor: '#CED0CE',
        }}
      />
    );

    render() {
      return (
        <View style={{ flex: 1 }}>
          <View style={styles.mapContainer}>
            <MapView
              style={{ flex: 1 }}
              provider="google"
              region={{
                latitude: 21.005352,
                longitude: 105.845978,
                latitudeDelta: 0.02,
                longitudeDelta: 0.04
              }}
            >
              <MapView.Marker
                coordinate={{
                  latitude: 21.005352,
                  longitude: 105.845978
                }}
                title="Đại học Bách Khoa"
                description="NCT Lab"
              />
            </MapView>
          </View>
          <View style={styles.listView}>
            <FlatList
              data={[
                {
                  key: 'Phone Contact',
                  description: '0363565160',
                },
                {
                  key: 'Address',
                  description: 'NCT Lab HUST'
                },
                {
                  key: 'Email',
                  description: 'tttbkhn@gmail.com'
                },
                {
                  key: 'App Developer',
                  description: 'Truong Thanh Thu'
                },
                {
                  key: 'Version',
                  description: 'Version 1'
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
        </View>
      );
    }
}

const styles = StyleSheet.create({
  mapContainer: {
    height: 350
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
    backgroundColor: '#44ea81',
    flex: 1
  }
});
