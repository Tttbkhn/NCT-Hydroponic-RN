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
        min: 0,
        max: 14,
        splitNumber: 14,
        radius: '90%',
        axisLine: {
          lineStyle: {
            color: [[0.285, 'lime'], [0.714, '#1e90ff'], [1, '#ff4500']],
            width: 25,
          }
        },
        detail: { formatter: '{value}%' },
        data: [{ value: 7, name: 'pH' }]
      }]
    };
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Echarts option={option} height={500} />
      </View>
    );
  }
}
