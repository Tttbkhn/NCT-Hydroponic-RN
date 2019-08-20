import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import * as actions from '../actions/index';

class DetailsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deviceCreateTime: '',
      plantInfo: '',
      cropStartTime: '',
      cropEndTime: '',
    };
  }

  componentDidMount() {
    this.setState({ deviceCreateTime: this.props.cropDataDetails.device.crop.start_time });
    this.setState({ plantInfo: this.props.cropDataDetails.plant.name });
    this.setState({ cropStartTime: this.props.cropDataDetails.startTime });
  }

//   componentDidUpdate(prevProps) {
//       if(prevProps.isCropStopped !== this.props.isCropStopped) {
//           this.renderEndTime();
//       }
//   }

  stopCrop() {
    const cropId = this.props.cropDataDetails.id;
    this.props.stopCrop(this.props.authData, cropId).then(() => {
      if (this.props.error) {
        alert(this.props.error);
      } else {
        console.log(this.props.stopData.message);
        alert(this.props.stopData.message);
      }
    });
  }

  renderEndTime() {
    let cropStop = false;
    if (this.props.isCropStopped) {
      cropStop = true;
    }
    if (cropStop) {
      return (
        <View>
          <Text style={styles.deviceTextView}>
            Crop End Time:
            {' '}
            {this.props.cropDataDetails.endTime}
          </Text>
        </View>
      );
    }
    return (
      <View>
        <Text />
      </View>
    );
  }

  render() {
    return (
      <View style={styles.containerView}>
        <Text style={styles.textView}>Crop name: {this.props.cropDataDetails.name}</Text>
        <Text style={styles.textView}>
Plant Info:
          {' '}
          {this.state.plantInfo}
        </Text>
        <Text style={styles.deviceTextView}>
Device Creation Time:
          {' '}
          {this.state.deviceCreateTime}
        </Text>
        
        <Text style={styles.deviceTextView}>
          Crop Start Time:
          {' '}
          {this.state.cropStartTime}
        </Text>
        <View>{this.renderEndTime()}</View>
        <View style={{ flexDirection: 'row' }} />
        <Button
          title="Stop Crop"
          containerStyle={{
            padding: 30
          }}
          buttonStyle={{
            backgroundColor: '#4d28e0'
          }}
          onPress={() => this.stopCrop()}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  cropDataDetails: state.crop.cropDataDetails,
  authData: state.auth.authData,
  stopData: state.crop.stopData,
  error: state.crop.error,
  isCropStopped: state.crop.isCropStopped,
});

const mapDispatchToProps = dispatch => ({
  stopCrop: (authData, cropId) => dispatch(actions.stopCrop(authData, cropId)),

});

const styles = StyleSheet.create({
  containerView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textView: {
      fontSize: 18,
      padding: 5,
  },
  deviceTextView: {
      fontSize: 15,
      padding: 5
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(DetailsScreen);
