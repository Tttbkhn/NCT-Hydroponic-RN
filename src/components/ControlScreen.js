/* eslint-disable indent */
import React, { Component } from 'react';
import {
  View, Text, Alert, StyleSheet, Switch
} from 'react-native';
import { connect } from 'react-redux';
import { Button, Input, ButtonGroup } from 'react-native-elements';
import * as actions from '../actions/index';


// eslint-disable-next-line react/prefer-stateless-function
class ControlScreen extends Component {
  constructor(props) {
    super(props);
    this.timeOutId = null;
    this.updateIndex1 = this.updateIndex1.bind(this);
    this.state = {
      deviceId: '',
      param1: '',
      param2: '',
      param3: '',
      param4: '',
      param5: '',
      param6: '',
      param7: '',
      param8: '',
      actuatorStatus: [],
      pHUpSelectedIndex: 0,
      pHDownSelectedIndex: 0,
      pumpASelectedIndex: 0,
      pumpBSelectedIndex: 0,
      ledSelectedIndex: 0,
      fanSelectedIndex: 0,
      pumpUpSelectedIndex: 0,
      pumpWaterSelectedIndex: 0,
      pHUpDetails: { pHUpStatus: '', pHUpSwitch: Boolean },
      pHDownDetails: { pHDownStatus: '', pHDownSwitch: Boolean },
      pumpADetails: { pumpAStatus: '', pumpASwitch: Boolean },
      pumpBDetails: { pumpBStatus: '', pumpBSwitch: Boolean },
      ledDetails: { ledStatus: '', ledSwitch: Boolean },
      fanDetails: { fanStatus: '', fanSwitch: Boolean },
      pumpUpDetails: { pumpUpStatus: '', pumpUpSwitch: Boolean },
      pumpWaterDetails: { pumpWaterStatus: '', pumpWaterSwitch: Boolean },
    };
  }

  componentDidMount() {
    this.subs = [
              this.props.navigation.addListener('willFocus', () => this.getActuatorStatus()),
            ];
          }

  componentWillUnmount() {
    this.subs.forEach((sub) => {
              sub.remove();
            });
    clearTimeout(this.timeOutId);
  }

  getActuatorStatus() {
    this.props.getActuatorStatus(this.props.authData, this.props.cropDataDetails.device.id).then(() => {
      if (this.props.error) {
        alert(this.props.error);
      } else {
        this.setState({ actuatorStatus: this.props.actuatorData.actuators });
        this.setState({ deviceId: this.props.actuatorData.id });
        const pHUpDetails = Object.assign({}, this.state.pHUpDetails);
        pHUpDetails.pHUpStatus = this.state.actuatorStatus.find(value => value.type === 5).status;
        if (pHUpDetails.pHUpStatus === 'ON') {
          pHUpDetails.pHUpSwitch = true;
        } else pHUpDetails.pHUpSwitch = false;
        this.setState({ pHUpDetails });
        const pHDownDetails = Object.assign({}, this.state.pHDownDetails);
        pHDownDetails.pHDownStatus = this.state.actuatorStatus.find(value => value.type === 6).status;
        if (pHDownDetails.pHDownStatus === 'ON') {
          pHDownDetails.pHDownSwitch = true;
        } else pHDownDetails.pHDownSwitch = false;
        this.setState({ pHDownDetails });
        const pumpADetails = Object.assign({}, this.state.pumpADetails);
        pumpADetails.pumpAStatus = this.state.actuatorStatus.find(value => value.type === 1).status;
        if (pumpADetails.pumpAStatus === 'ON') {
          pumpADetails.pumpASwitch = true;
        } else pumpADetails.pumpASwitch = false;
        this.setState({ pumpADetails });
        const pumpBDetails = Object.assign({}, this.state.pumpBDetails);
        pumpBDetails.pumpBStatus = this.state.actuatorStatus.find(value => value.type === 2).status;
        if (pumpBDetails.pumpBStatus === 'ON') {
          pumpBDetails.pumpBSwitch = true;
        } else pumpBDetails.pumpBSwitch = false;
        this.setState({ pumpBDetails });
        const ledDetails = Object.assign({}, this.state.ledDetails);
        ledDetails.ledStatus = this.state.actuatorStatus.find(value => value.type === 7).status;
        if (ledDetails.ledStatus === 'ON') {
          ledDetails.ledSwitch = true;
        } else ledDetails.ledSwitch = false;
        this.setState({ ledDetails });
        const fanDetails = Object.assign({}, this.state.fanDetails);
        fanDetails.fanStatus = this.state.actuatorStatus.find(value => value.type === 8).status;
        if (fanDetails.fanStatus === 'ON') {
          fanDetails.fanSwitch = true;
        } else fanDetails.fanSwitch = false;
        this.setState({ fanDetails });
        const pumpUpDetails = Object.assign({}, this.state.pumpUpDetails);
        pumpUpDetails.pumpUpStatus = this.state.actuatorStatus.find(value => value.type === 3).status;
        if (pumpUpDetails.pumpUpStatus === 'ON') {
          pumpUpDetails.pumpUpSwitch = true;
        } else pumpUpDetails.pumpUpSwitch = false;
        this.setState({ pumpUpDetails });
        const pumpWaterDetails = Object.assign({}, this.state.pumpWaterDetails);
        pumpWaterDetails.pumpWaterStatus = this.state.actuatorStatus.find(value => value.type === 4).status;
        if (pumpWaterDetails.pumpWaterStatus === 'ON') {
          pumpWaterDetails.pumpWaterSwitch = true;
        } else pumpWaterDetails.pumpWaterSwitch = false;
        this.setState({ pumpWaterDetails });
      }
    });
  }

  checkToggle=(param) => {
      this.getActuatorStatus();
    console.log(this.timeOutId);
    console.log('Hello Timeout');
    clearTimeout(this.timeOutId);
    console.log('Clear Old Timeout');
    this.timeOutId = setTimeout(() => {
    this.getActuatorStatus();
    }, param * 1000);
  }

  updateIndex1(pHUpSelectedIndex) {
    this.setState({ pHUpSelectedIndex });
  }

  updateIndex2(pHDownSelectedIndex) {
      this.setState({ pHDownSelectedIndex });
  }

  updateIndex3(pumpASelectedIndex) {
    this.setState({ pumpASelectedIndex });
}

updateIndex4(pumpBSelectedIndex) {
    this.setState({ pumpBSelectedIndex });
}

updateIndex5(fanSelectedIndex) {
    this.setState({ fanSelectedIndex });
}

updateIndex6(ledSelectedIndex) {
    this.setState({ ledSelectedIndex });
}

updateIndex7(pumpWaterSelectedIndex) {
    this.setState({ pumpWaterSelectedIndex });
}

updateIndex8(pumpUpSelectedIndex) {
    this.setState({ pumpUpSelectedIndex });
}


sendCommand1() {
const { pHUpSelectedIndex } = this.state;
if (pHUpSelectedIndex === 0) {
    this.controlActuator('PUMP_PH_UP', 'ON', this.state.param1);
} else this.controlActuator('PUMP_PH_UP', 'OFF', this.state.param1);
this.checkToggle(this.state.param1);
}

sendCommand2() {
    const { pHDownSelectedIndex } = this.state;
    if (pHDownSelectedIndex === 0) {
        this.controlActuator('PUMP_PH_DOWN', 'ON', this.state.param2);
    } else this.controlActuator('PUMP_PH_DOWN', 'OFF', this.state.param2);
    this.checkToggle(this.state.param2);
    }

    sendCommand3() {
        const { pumpASelectedIndex } = this.state;
        if (pumpASelectedIndex === 0) {
            this.controlActuator('PUMP_A', 'ON', this.state.param3);
        } else this.controlActuator('PUMP_A', 'OFF', this.state.param3);
        this.checkToggle(this.state.param3);
        }

        sendCommand4() {
            const { pumpBSelectedIndex } = this.state;
            if (pumpBSelectedIndex === 0) {
                this.controlActuator('PUMP_B', 'ON', this.state.param4);
            } else this.controlActuator('PUMP_B', 'OFF', this.state.param4);
            this.checkToggle(this.state.param4);
            }

            sendCommand5() {
                const { fanSelectedIndex } = this.state;
                if (fanSelectedIndex === 0) {
                    this.controlActuator('FAN', 'ON', this.state.param5);
                } else this.controlActuator('FAN', 'OFF', this.state.param5);
                this.checkToggle(this.state.param5);
                }

                sendCommand6() {
                    const { ledSelectedIndex } = this.state;
                    if (ledSelectedIndex === 0) {
                        this.controlActuator('LED', 'ON', this.state.param6);
                    } else this.controlActuator('LED', 'OFF', this.state.param6);
                    this.checkToggle(this.state.param6);
                    }

                    sendCommand7() {
                        const { pumpWaterSelectedIndex } = this.state;
                        if (pumpWaterSelectedIndex === 0) {
                            this.controlActuator('PUMP_WATER', 'ON', this.state.param7);
                        } else this.controlActuator('PUMP_WATER', 'OFF', this.state.param7);
                        this.checkToggle(this.state.param7);
                        }

                        sendCommand8() {
                            const { pumpUpSelectedIndex } = this.state;
                            if (pumpUpSelectedIndex === 0) {
                                this.controlActuator('PUMP_UP', 'ON', this.state.param8);
                            } else this.controlActuator('PUMP_UP', 'OFF', this.state.param8);
                            this.checkToggle(this.state.param8);
                            }


//   toggleSwitch1 = (value) => {
//       const pHUpDetails = Object.assign({}, this.state.pHUpDetails);
//       pHUpDetails.pHUpSwitch = value;
//       if (pHUpDetails.pHUpStatus === 'ON') {
//         pHUpDetails.pHUpStatus = 'OFF';
//       } else pHUpDetails.pHUpStatus = 'ON';
//       this.setState({ pHUpDetails });
//       console.log(pHUpDetails);
//       this.controlActuator('PUMP_PH_UP', pHUpDetails.pHUpStatus, this.state.param1);
//       this.checkToggle(this.state.param1);
//   }

//   toggleSwitch2 = (value) => {
//     const pHDownDetails = Object.assign({}, this.state.pHDownDetails);
//     pHDownDetails.pHDownSwitch = value;
//     if (pHDownDetails.pHDownStatus === 'ON') {
//       pHDownDetails.pHDownStatus = 'OFF';
//     } else pHDownDetails.pHDownStatus = 'ON';
//     this.setState({ pHDownDetails });
//     console.log(pHDownDetails);
//     this.controlActuator('PUMP_PH_DOWN', pHDownDetails.pHDownStatus, this.state.param2);
//     this.checkToggle(this.state.param2);
// }

// toggleSwitch3 = (value) => {
//     const pumpADetails = Object.assign({}, this.state.pumpADetails);
//     pumpADetails.pumpASwitch = value;
//     if (pumpADetails.pumpAStatus === 'ON') {
//       pumpADetails.pumpAStatus = 'OFF';
//     } else pumpADetails.pumpAStatus = 'ON';
//     this.setState({ pumpADetails });
//     console.log(pumpADetails);
//     this.controlActuator('PUMP_A', pumpADetails.pumpAStatus, this.state.param3);
//     this.checkToggle(this.state.param3);
// }

// toggleSwitch4 = (value) => {
//     const pumpBDetails = Object.assign({}, this.state.pumpBDetails);
//     pumpBDetails.pumpBSwitch = value;
//     if (pumpBDetails.pumpBStatus === 'ON') {
//       pumpBDetails.pumpBStatus = 'OFF';
//     } else pumpBDetails.pumpBStatus = 'ON';
//     this.setState({ pumpBDetails });
//     console.log(pumpBDetails);
//     this.controlActuator('PUMP_B', pumpBDetails.pumpBStatus, this.state.param4);
//     this.checkToggle(this.state.param4);
// }

// toggleSwitch5 = (value) => {
//     const fanDetails = Object.assign({}, this.state.fanDetails);
//     fanDetails.fanSwitch = value;
//     if (fanDetails.fanStatus === 'ON') {
//       fanDetails.fanStatus = 'OFF';
//     } else fanDetails.fanStatus = 'ON';
//     this.setState({ fanDetails });
//     console.log(fanDetails);
//     this.controlActuator('FAN', fanDetails.fanStatus, this.state.param5);
//     this.checkToggle(this.state.param5);
// }

// toggleSwitch6 = (value) => {
//     const ledDetails = Object.assign({}, this.state.ledDetails);
//     ledDetails.ledSwitch = value;
//     if (ledDetails.ledStatus === 'ON') {
//       ledDetails.ledStatus = 'OFF';
//     } else ledDetails.ledStatus = 'ON';
//     this.setState({ ledDetails });
//     console.log(ledDetails);
//     this.controlActuator('LED', ledDetails.ledStatus, this.state.param6);
//     this.checkToggle(this.state.param6);
// }

// toggleSwitch7 = (value) => {
//     const pumpWaterDetails = Object.assign({}, this.state.pumpWaterDetails);
//     pumpWaterDetails.pumpWaterSwitch = value;
//     if (pumpWaterDetails.pumpWaterStatus === 'ON') {
//       pumpWaterDetails.pumpWaterStatus = 'OFF';
//     } else pumpWaterDetails.pumpWaterStatus = 'ON';
//     this.setState({ pumpWaterDetails });
//     console.log(pumpWaterDetails);
//     this.controlActuator('PUMP_WATER', pumpWaterDetails.pumpWaterStatus, this.state.param7);
//     this.checkToggle(this.state.param7);
// }

// toggleSwitch8 = (value) => {
//     const pumpUpDetails = Object.assign({}, this.state.pumpUpDetails);
//     pumpUpDetails.pumpUpSwitch = value;
//     if (pumpUpDetails.pumpUpStatus === 'ON') {
//       pumpUpDetails.pumpUpStatus = 'OFF';
//     } else pumpUpDetails.pumpUpStatus = 'ON';
//     this.setState({ pumpUpDetails });
//     console.log(pumpUpDetails);
//     this.controlActuator('PUMP_UP', pumpUpDetails.pumpUpStatus, this.state.param8);
//     this.checkToggle(this.state.param8);
// }

  controlActuator(actuator, state, time) {
    const actuatorName = actuator;
    const action = state;
    const param = time;
    const { deviceId } = this.state;
    this.props.controlActuator(this.props.authData, deviceId, actuatorName, action, param).then(() => {
        if (this.props.error) {
            alert(this.props.error);
        } else {
            alert(this.props.controlData.message);
        }
    });
}

  render() {
    const buttons = ['ON', 'OFF'];
    const { pHUpSelectedIndex, pHDownSelectedIndex, pumpASelectedIndex, pumpBSelectedIndex, fanSelectedIndex, ledSelectedIndex, pumpWaterSelectedIndex, pumpUpSelectedIndex } = this.state;
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={styles.cropName}>{this.props.cropDataDetails.name}</Text>
        <View style={styles.actuatorContainerView}>
          <View style={styles.actuatorView}>
            <Text style={{ fontSize: 15 }}>{this.state.pHUpDetails.pHUpSwitch ? 'PUMP PH UP: ON' : 'PUMP PH UP: OFF'}</Text>
            <Input
              placeholder="Time in seconds"
              //   inputContainerStyle=
              containerStyle={{ paddingBottom: 5 }}
              inputStyle={{ fontSize: 15 }}
              onChangeText={param1 => this.setState({ param1 })}
              value={this.state.param1}
            />
            {/* <Switch
              onValueChange={this.toggleSwitch1}
              value={this.state.pHUpDetails.pHUpSwitch}
            /> */}
            <ButtonGroup
              onPress={this.updateIndex1}
              selectedIndex={pHUpSelectedIndex}
              buttons={buttons}
              containerStyle={{ height: 20 }}
            />
            <Button
              title="Send"
              containerStyle={{ height: 20 }}
              titleStyle={{ fontSize: 20 }}
              onPress={() => this.sendCommand1()}
            />
          </View>
          <View style={styles.actuatorView}>
            <Text style={{ fontSize: 15 }}>{this.state.pHDownDetails.pHDownSwitch ? 'PUMP PH DOWN: ON' : 'PUMP PH DOWN: OFF'}</Text>
            <Input
              placeholder="Time in seconds"
              //   inputContainerStyle=
              containerStyle={{ paddingBottom: 5 }}
              inputStyle={{ fontSize: 15 }}
              onChangeText={param2 => this.setState({ param2 })}
              value={this.state.param2}
            />
            <ButtonGroup
              onPress={this.updateIndex2}
              selectedIndex={pHDownSelectedIndex}
              buttons={buttons}
              containerStyle={{ height: 20 }}
            />
            <Button
              title="Send"
              containerStyle={{ height: 20 }}
              titleStyle={{ fontSize: 20 }}
              onPress={() => this.sendCommand2()}
            />
          </View>
        </View>
        <View style={styles.actuatorContainerView}>
          <View style={styles.actuatorView}>
            <Text style={{ fontSize: 15 }}>{this.state.pumpADetails.pumpASwitch ? 'PUMP A: ON' : 'PUMP A: OFF'}</Text>
            <Input
              placeholder="Time in seconds"
              //   inputContainerStyle=
              containerStyle={{ paddingBottom: 5 }}
              inputStyle={{ fontSize: 15 }}
              onChangeText={param3 => this.setState({ param3 })}
              value={this.state.param3}
            />
            <ButtonGroup
              onPress={this.updateIndex3}
              selectedIndex={pumpASelectedIndex}
              buttons={buttons}
              containerStyle={{ height: 20 }}
            />
            <Button
              title="Send"
              containerStyle={{ height: 20 }}
              titleStyle={{ fontSize: 20 }}
              onPress={() => this.sendCommand3()}
            />
          </View>
          <View style={styles.actuatorView}>
            <Text style={{ fontSize: 15 }}>{this.state.pumpBDetails.pumpBSwitch ? 'PUMP B: ON' : 'PUMP B: OFF'}</Text>
            <Input
              placeholder="Time in seconds"
              //   inputContainerStyle=
              containerStyle={{ paddingBottom: 5 }}
              inputStyle={{ fontSize: 15 }}
              onChangeText={param4 => this.setState({ param4 })}
              value={this.state.param4}
            />
            <ButtonGroup
              onPress={this.updateIndex4}
              selectedIndex={pumpBSelectedIndex}
              buttons={buttons}
              containerStyle={{ height: 20 }}
            />
            <Button
              title="Send"
              containerStyle={{ height: 20 }}
              titleStyle={{ fontSize: 20 }}
              onPress={() => this.sendCommand4()}
            />
          </View>
        </View>
        <View style={styles.actuatorContainerView}>
          <View style={styles.actuatorView}>
            <Text style={{ fontSize: 15 }}>{this.state.fanDetails.fanSwitch ? 'FAN: ON' : 'FAN: OFF'}</Text>
            <Input
              placeholder="Time in seconds"
              //   inputContainerStyle=
              containerStyle={{ paddingBottom: 5 }}
              inputStyle={{ fontSize: 15 }}
              onChangeText={param5 => this.setState({ param5 })}
              value={this.state.param5}
            />
            <ButtonGroup
              onPress={this.updateIndex5}
              selectedIndex={fanSelectedIndex}
              buttons={buttons}
              containerStyle={{ height: 20 }}
            />
            <Button
              title="Send"
              containerStyle={{ height: 20 }}
              titleStyle={{ fontSize: 20 }}
              onPress={() => this.sendCommand5()}
            />
          </View>
          <View style={styles.actuatorView}>
            <Text style={{ fontSize: 15 }}>{this.state.ledDetails.ledSwitch ? 'LED: ON' : 'LED: OFF'}</Text>
            <Input
              placeholder="Time in seconds"
              //   inputContainerStyle=
              containerStyle={{ paddingBottom: 5 }}
              inputStyle={{ fontSize: 15 }}
              onChangeText={param6 => this.setState({ param6 })}
              value={this.state.param6}
            />
            <ButtonGroup
              onPress={this.updateIndex6}
              selectedIndex={ledSelectedIndex}
              buttons={buttons}
              containerStyle={{ height: 20 }}
            />
            <Button
              title="Send"
              containerStyle={{ height: 20 }}
              titleStyle={{ fontSize: 20 }}
              onPress={() => this.sendCommand6()}
            />
          </View>
        </View>
        <View style={styles.actuatorContainerView}>
          <View style={styles.actuatorView}>
            <Text style={{ fontSize: 15 }}>{this.state.pumpWaterDetails.pumpWaterSwitch ? 'PUMP WATER: ON' : 'PUMP WATER: OFF'}</Text>
            <Input
              placeholder="Time in seconds"
              //   inputContainerStyle=
              containerStyle={{ paddingBottom: 5 }}
              inputStyle={{ fontSize: 15 }}
              onChangeText={param7 => this.setState({ param7 })}
              value={this.state.param7}
            />
            <ButtonGroup
              onPress={this.updateIndex7}
              selectedIndex={pumpWaterSelectedIndex}
              buttons={buttons}
              containerStyle={{ height: 20 }}
            />
            <Button
              title="Send"
              containerStyle={{ height: 20 }}
              titleStyle={{ fontSize: 20 }}
              onPress={() => this.sendCommand7()}
            />
          </View>
          <View style={styles.actuatorView}>
            <Text style={{ fontSize: 15 }}>{this.state.pumpUpDetails.pumpUpSwitch ? 'PUMP UP: ON' : 'PUMP UP: OFF'}</Text>
            <Input
              placeholder="Time in seconds"
              //   inputContainerStyle=
              containerStyle={{ paddingBottom: 5 }}
              inputStyle={{ fontSize: 15 }}
              onChangeText={param8 => this.setState({ param8 })}
              value={this.state.param8}
            />
            <ButtonGroup
              onPress={this.updateIndex8}
              selectedIndex={pumpUpSelectedIndex}
              buttons={buttons}
              containerStyle={{ height: 20 }}
            />
            <Button
              title="Send"
              containerStyle={{ height: 20 }}
              titleStyle={{ fontSize: 20 }}
              onPress={() => this.sendCommand8()}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  cropName: {
    fontSize: 20,
    padding: 10,
    fontWeight: 'bold'
  },
  actuatorContainerView: {
    flex: 1,
    flexDirection: 'row',
    padding: 5,
  },
  actuatorView: {
    // borderColor: 'gray',
    // borderWidth: 1,
    // borderRadius: 10,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
const mapStateToProps = state => ({
  cropDataDetails: state.crop.cropDataDetails,
  actuatorData: state.device.actuatorData,
  authData: state.auth.authData,
  error: state.device.error,
  controlData: state.device.controlData
});

const mapDispatchToProps = dispatch => ({
  getActuatorStatus: (authData, deviceId) => dispatch(actions.getActuatorStatus(authData, deviceId)),
  controlActuator: (authData, deviceId, actuatorName, action, param) => dispatch(actions.controlActuator({
    authData, deviceId, actuatorName, action, param
  }))
});

export default connect(mapStateToProps, mapDispatchToProps)(ControlScreen);
