import React, { Component } from 'react';
import { View } from 'react-native';
import Echarts from 'native-echarts';
import { connect } from 'react-redux';

// eslint-disable-next-line react/prefer-stateless-function
class ECScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };
  }


  componentDidMount() {
    const sensorArray = this.props.cropDataDetails.sensors;
    const ECDetails = sensorArray.find(value => value.type === 4);
    this.setState({ value: ECDetails.currentValue });
    console.log(ECDetails.currentValue);
  }

  render() {
    const option = {
      title: {
        text: 'EC'
      },
      tooltip: {
        formatter: '{a} <br/>{b} : {c}%'
      },
      series: [{
        name: 'EC',
        type: 'gauge',
        min: 0,
        max: 20,
        splitNumber: 10,
        radius: '90%',
        axisLine: {
          lineStyle: {
            color: [[0.285, 'lime'], [0.714, '#1e90ff'], [1, '#ff4500']],
            width: 25,
          }
        },
        detail: { formatter: '{value}' },
        data: [{ value: this.state.value, name: 'EC' }]
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

export default connect(mapStateToProps)(ECScreen);
