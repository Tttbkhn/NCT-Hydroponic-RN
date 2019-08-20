import React, { Component } from 'react';
import { Text, View } from 'react-native';
import Echarts from 'native-echarts';
import { connect } from 'react-redux';

// eslint-disable-next-line react/prefer-stateless-function
class HALScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      humidValue: '',
      lightValue: ''
    };
  }

  componentDidMount() {
    const sensorArray = this.props.cropDataDetails.sensors;
    const humidDetails = sensorArray.find(value => value.type === 3);
    const lightDetails = sensorArray.find(value => value.type === 5);
    this.setState({ humidValue: humidDetails.currentValue, lightValue: lightDetails.currentValue });
    console.log(humidDetails.currentValue);
    console.log(lightDetails.currentValue);
    console.log(this.state.humidValue);
    console.log(this.state.lightValue);
  }

  render() {
    const option = {
      color: ['#3398DB'],
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      xAxis: {
        type: 'category',
        data: ['Humidity', 'Light'],
        axisTick: {
          alignWithLabel: true
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      yAxis: {
        type: 'value',
        max: 100
      },
      series: [{
        data: [this.state.humidValue, this.state.lightValue],
        barWidth: '60%',
        type: 'bar'
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
  cropDataDetails: state.crop.cropDataDetails
});

export default connect(mapStateToProps)(HALScreen);
