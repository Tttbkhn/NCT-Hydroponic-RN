/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { MapView } from 'expo';

export default class ContactScreen extends Component {
  render() {
    return (
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
    );
  }
}

const styles = StyleSheet.create({
  mapContainer: {
    height: 300
  }
});
