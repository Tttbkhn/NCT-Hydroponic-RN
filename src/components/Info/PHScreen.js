import React, { Component } from 'react';
import { Text, View } from 'react-native';
import Echarts from 'native-echarts';
import { connect } from 'react-redux';


// eslint-disable-next-line react/prefer-stateless-function
class PHScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };
  }

  componentDidMount() {
    const sensorArray = this.props.cropDataDetails.sensors;
    const pHDetails = sensorArray.find(value => value.type === 1);
    this.setState({ value: pHDetails.currentValue });
    console.log(pHDetails.currentValue);
  }

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
        detail: { formatter: '{value}' },
        data: [{ value: this.state.value, name: 'pH' }]
      }]
    };
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Echarts option={option} height={500} />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  cropDataDetails: state.crop.cropDataDetails,
});

export default connect(mapStateToProps)(PHScreen);
