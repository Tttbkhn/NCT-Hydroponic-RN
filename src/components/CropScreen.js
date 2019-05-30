import React, { Component } from 'react';
import {
  View, Text, StyleSheet, TextInput, FlatList
} from 'react-native';
import { Button } from 'react-native-elements';
import ModalDropdown from 'react-native-modal-dropdown';
import Modal from 'react-native-modal';
import { connect } from 'react-redux';
import * as actions from '../actions/index';

// eslint-disable-next-line react/prefer-stateless-function
class CropScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      deviceId: '',
      plantId: '',
      isModalVisible: false,
      deviceArray: props.deviceData.content.map(content => content.id),
      plantArray: [],
      cropArray: [],
    };
  }

  componentDidMount() {
    this.getPlant();
    this.getCrop();
  }

  createCrop() {
    const { name, device, plant } = this.state;
    this.props.createCrop(name, deviceId, plantId).then(() => {
      if (this.props.error) {
        alert(this.props.error);
      } else {

      }
    });
  }

  getCrop() {
    this.props.getCrop(this.props.authData).then(() => {
      if (this.props.error) {
        alert(this.props.error); // cai nay la error nao phai check nhe
      } else {
        this.setState({ cropArray: this.props.cropData.content });
        console.log(this.state.cropArray);
      }
    });
  }

  toggleModal() {
    // this.setState({ isModalVisible: !(this.state.isModalVisible) });
    this.setState(prevState => ({ isModalVisible: !prevState.isModalVisible }));
  }

  _toggleModal() {
    this.setState(prevState => ({ isModalVisible: !prevState.isModalVisible }));
    console.log(this.state.deviceId);
    console.log(this.state.name);
    console.log(this.state.plantId);
    this.setState({ deviceId: '' });
    this.setState({ name: '' });
    this.setState({ plantId: '' });
  }

  renderCrop() {
    if(this.state.plantArray.length !== 0) {
      return (
        <View>
          <FlatList
            data={this.state.cropArray}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => (
                <View style={{padding: 10, justifyContent: 'center', alignItems: 'center'}}>
                    <Text>{item.name}</Text>
                </View>
              )}
          />
        </View>
      );
    }
    else return (
      <View>
        <Text>You have no crop!</Text></View>
    )
  }

  getPlant() {
    this.props.getPlant().then(() => {
      if (this.props.error) {
        alert(this.props.error);
      } else {
        this.setState({ plantArray: this.props.plantData.map(value => value.name) });
        // console.log(this.state.plantArray);
      }
    });
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Button
          title="Create new crop"
          buttonStyle={styles.buttonCreateCrop}
          containerStyle={{ alignItems: 'flex-end', padding: 10 }}
          onPress={() => this.toggleModal()}
        />
        <Modal isVisible={this.state.isModalVisible}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Please insert your crop details</Text>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ fontSize: 20, width: 150, marginTop: 8 }}>Your crop name: </Text>
              <TextInput
                style={styles.textInputView}
                onChangeText={name => this.setState({ name })}
                value={this.state.name}
              />
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.textView}>Your device: </Text>
              <ModalDropdown
                options={this.state.deviceArray}
                dropdownStyle={styles.dropdown_dropdown}
                dropdownTextStyle={styles.dropdown_list_text}
                style={styles.dropdown}
                textStyle={styles.dropdown_text}
                onSelect={value => this.setState({ deviceId: this.state.deviceArray[value] })}
              />
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.textView}>Your plant: </Text>
              <ModalDropdown
                options={this.state.plantArray}
                dropdownStyle={styles.dropdown_dropdown}
                dropdownTextStyle={styles.dropdown_list_text}
                style={styles.dropdown}
                textStyle={styles.dropdown_text}
                onSelect={value => this.setState({ plantId: this.state.plantArray[value] })}
              />
            </View>
            <Button
              style={{ paddingTop: 100 }}
              title="Hide modal"
              onPress={() => this._toggleModal()}
            />
          </View>
        </Modal>
        <View>{this.renderCrop()}</View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  modalView: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  modalText: {
    fontSize: 20,
    marginBottom: 12,
  },
  buttonCreateCrop: {
    width: 200,
    height: 50,
  },
  dropdown: {
    alignSelf: 'flex-end',
    width: 150,
    marginTop: 12,
    // right: 8,
    borderWidth: 0,
    borderRadius: 3,
    backgroundColor: 'cornflowerblue',
  },
  dropdown_text: {
    marginVertical: 10,
    marginHorizontal: 6,
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  dropdown_dropdown: {
    width: 150,
    height: 200,
    borderColor: 'cornflowerblue',
    borderWidth: 2,
    borderRadius: 3,
  },
  dropdown_list_text: {
    fontSize: 15,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  textInputView: {
    height: 40,
    width: 150,
    paddingLeft: 10,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10
  },
  textView: {
    fontSize: 20,
    width: 120,
    marginTop: 14
  }
});

const mapStateToProps = state => ({
  isLoading: state.crop.isLoading,
  cropData: state.crop.cropData,
  error: state.crop.error,
  isLoggedIn: state.auth.isLoggedIn,
  deviceData: state.device.deviceData,
  plantData: state.plant.plantData,
  authData: state.auth.authData,
});

const mapDispatchToProps = dispatch => ({
  // eslint-disable-next-line max-len
  createCrop: (name, deviceId, plantId) => dispatch(actions.createCrop({ name, deviceId, plantId })),
  getPlant: () => dispatch(actions.getPlant()),
  getCrop: authData => dispatch(actions.getCrop(authData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CropScreen);
