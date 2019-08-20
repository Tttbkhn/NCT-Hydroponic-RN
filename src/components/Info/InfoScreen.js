/* eslint-disable max-len */
import React, { Component } from 'react';
import {
  View, FlatList, StyleSheet, Text, TouchableOpacity, Image,
} from 'react-native';
import { connect } from 'react-redux';
import pH from '../images/pH.png';
import activitylog from '../images/activitylog.png';
import EC from '../images/EC.png';
import light from '../images/light.png';
import soilhumidity from '../images/soilhumidity.png';
// import * as actions from '../../actions/index';

// eslint-disable-next-line react/prefer-stateless-function
class InfoScreen extends Component {
//   componentDidMount() {
//     this.subs = [
//       this.props.navigation.addListener('willFocus', () => console.log('will focus')),
//       this.props.navigation.addListener('willBlur', () => this.props.isOutOfCrop(false)),
//       this.props.navigation.addListener('didFocus', () => console.log('did focus')),
//     ];
//   }

  //   componentWillUnmount() {
  //     this.subs.forEach((sub) => {
  //       sub.remove();
  //     });
  //   }


  //   componentDidMount() {

  //     //   console.log(this.props.cropDataDetails.sensors.map(value => value.type));
  //   }

  renderSeperator = () => (
    <View
      style={{
        height: 1,
        backgroundColor: '#CED0CE',
      }}
    />
  )

  render() {
    const { navigation } = this.props;
    return (
      <View style={{
        flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: 10
      }}
      >
        <Text style={{fontWeight: 'bold', fontSize: 20, }}>{this.props.cropDataDetails.name}</Text>
        <FlatList
          data={[
            {
              key: 'PH',
              logo: pH
            },
            {
              key: 'EC',
              logo: EC
            },
            {
              key: 'Humidity and Light',
              logo: soilhumidity
            },
            {
              key: 'Temperature',
              logo: light
            },
          ]}
          ItemSeparatorComponent={this.renderSeperator}
          renderItem={({ item }) => (
            <TouchableOpacity activeOpacity={1} onPress={() => navigation.navigate(item.key.replace(/\s/g, ''))}>
                {/* \s is the regex for "whitespace", and g is the "global" flag, meaning match ALL \s (whitespaces). */}
            <View style={{ flex: 1, flexDirection: 'row', paddingBottom: 10 }}>
              <Image
                style={{ width: 50, height: 50, marginTop: 20, }}
                source={item.logo}
              />
                <Text style={styles.item}>{item.key}</Text>
            </View>
            </TouchableOpacity>
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

const mapStateToProps = state => ({
  cropDataDetails: state.crop.cropDataDetails,
});

// const mapDispatchToProps = dispatch => ({
//   isOutOfCrop: bool => dispatch(actions.isOutOfCrop(bool))
// });
export default connect(mapStateToProps)(InfoScreen);
