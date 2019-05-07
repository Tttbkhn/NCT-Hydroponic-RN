import React, { Component } from 'react';
import { Text, View } from 'react-native';
import Echarts from 'native-echarts';


// eslint-disable-next-line react/prefer-stateless-function
export default class PHScreen extends Component {
  render() {
    const option = {
      title: {
        text: 'pH'
      },
      tooltip: {
        formatter: '{a} <br/>{b} : {c}%'
      },
      series: [{
        name: 'Do pH',
        type: 'gauge',
        detail: { formatter: '{value}%' },
        data: [{ value: 70, name: 'pH' }]
      }]
    };
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Echarts option={option} height={300} />
      </View>
    );
  }
}
