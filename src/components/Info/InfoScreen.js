/* eslint-disable max-len */
import React, { Component } from 'react';
import {
  View, FlatList, StyleSheet, Text, TouchableHighlight, Image,
} from 'react-native';
import pH from '../images/pH.png';
import activitylog from '../images/activitylog.png';
import DHT from '../images/DHT.png';
import EC from '../images/EC.png';
import light from '../images/light.png';
import soilhumidity from '../images/soilhumidity.png';

// eslint-disable-next-line react/prefer-stateless-function
class InfoScreen extends Component {
  render() {
    const { navigation } = this.props;
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: 30 }}>
        <FlatList
          data={[
            {
              key: 'PH',
              logo: pH
            },
            {
              key: 'Soil Humidity',
              logo: soilhumidity
            },
            {
              key: 'Light',
              logo: light
            },
            {
              key: 'EC',
              logo: EC
            },
            {
              key: 'DHT',
              logo: DHT
            },
            {
              key: 'Activity Log',
              logo: activitylog
            },
          ]}
          renderItem={({ item }) => (
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <Image
                style={{ width: 50, height: 50 }}
                source={item.logo}
              />
              <TouchableHighlight onPress={() => navigation.navigate(item.key.replace(/\s/g, ''))}>
                {/* \s is the regex for "whitespace", and g is the "global" flag, meaning match ALL \s (whitespaces). */}
                <Text style={styles.item}>{item.key}</Text>
              </TouchableHighlight>
            </View>
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
