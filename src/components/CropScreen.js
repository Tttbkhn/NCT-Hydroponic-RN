import React, { Component } from 'react';
import {
  View, Text, StyleSheet, TextInput, FlatList, Image, TouchableOpacity
} from 'react-native';
import { Button, Icon } from 'react-native-elements';
import ModalDropdown from 'react-native-modal-dropdown';
import Modal from 'react-native-modal';

import { connect } from 'react-redux';
import images from './images/images';
import * as actions from '../actions/index';

// eslint-disable-next-line react/prefer-stateless-function
class CropScreen extends Component {
    static navigationOptions = {
      header: null
    }

    constructor(props) {
      super(props);
      this.state = {
        name: '',
        deviceId: '',
        plantName: '',
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

    deleteCrop(cropId) {
        this.props.deleteCrop(this.props.authData, cropId).then(() => {
          if (this.props.error) {
            alert(this.props.error);
          } else {
              if(this.props.isCropStopped === false) {
                  alert('Delete Crop Failed! Your crop is planting!')
              } else {
                alert(this.props.deleteData.message);
                this.getCrop();
              }
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

    createCrop() {
      const { name, deviceId, plantName } = this.state;
      const plantId = this.props.plantData.find(value => value.name === plantName).id;
      this.props.createCrop(this.props.authData, name, deviceId, plantId).then(() => {
        if (this.props.error) {
          alert(this.props.error);
        } else {
          alert(this.props.createData.message);
          this.getCrop();
        }
      });
    }


    getCropDetails(cropId) {
      this.props.getCropDetails(this.props.authData, cropId).then(() => {
        if (this.props.error) {
          alert(this.props.error);
        } else {
        //   console.log(this.props.cropDataDetails.name);
          this.props.navigation.navigate('Info');
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
      console.log(this.state.plantName);
      this.createCrop();
      this.setState({ deviceId: '' });
      this.setState({ name: '' });
      this.setState({ plantName: '' });
    }

  renderSeperator = () => (
    <View
      style={{
        height: 1,
        backgroundColor: '#CED0CE',
      }}
    />
  )

  renderCrop() {
    if (this.state.plantArray.length !== 0) {
      return (
        <View>
          <FlatList
            data={this.state.cropArray}
            keyExtractor={item => item.id.toString()}
            ItemSeparatorComponent={this.renderSeperator}
            renderItem={({ item }) => (
              <TouchableOpacity activeOpacity={1} onPress={() => this.getCropDetails(item.id)}>
                <View style={styles.cropView}>
                  <View style={{ flexDirection: 'row', alignSelf: 'stretch' }}>
                      <Text style={styles.cropText}>{item.name}</Text>
                      <Icon
                      containerStyle={styles.iconContainer}
                      name="ios-trash"
                      type="ionicon"
                      color="#517fa4"
                      onPress={() => this.deleteCrop(item.id)}
                    />
                  </View>

                  {images.filter(value => value.id === item.plantId)
                    .map(value => (
                      <Image
                        style={styles.cropImageView}
                        key={value.id}
                        source={value.src}
                      />
                    ))}
                  {/* <View>
                    <Icon
                    //   containerStyle={styles.buttonStyle}
                      size={20}
                      raised
                      name="ios-arrow-back"
                      type="ionicon"
                      color="#f50"
                      onPress={() => console.log('hello')}
                    />
                    <Text style={styles.cropText}>{item.plantTypeName}</Text>
                  </View> */}
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      );
    }
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 25 }}>You have no crop!</Text>

      </View>
    );
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
    let loggedIn = false;
    if (this.props.isLoggedIn) {
      loggedIn = true;
    }
    if (loggedIn) {
      return (
        <View style={{ flex: 1 }}>
          <Button
            title="Create new crop"
            buttonStyle={styles.buttonCreateCrop}
            containerStyle={styles.buttonContainer}
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
                  onSelect={value => this.setState({ plantName: this.state.plantArray[value] })}
                />
              </View>
              <Button
                style={{ paddingTop: 100 }}
                title="Hide modal"
                onPress={() => this._toggleModal()}
              />
            </View>
          </Modal>
          <View style={{ flex: 1 }}>{this.renderCrop()}</View>
        </View>
      );
    } return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 25 }}>Please log in to see your crop</Text>
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
  buttonStyle: {
    alignItems: 'flex-end',
    marginRight: 100,
    paddingBottom: 10,
  },
  buttonCreateCrop: {
    width: 200,
    height: 50,
  },
  iconContainer: {
    alignSelf: 'center'
  },
  buttonContainer: {
    alignItems: 'flex-end',
    marginTop: 7,
    marginRight: 5,
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
  },
  cropView: {
    // justifyContent: 'center',
    flex: 1,
    alignItems: 'center',
    height: 300,
    padding: 12,
  },
  cropImageView: {
    flex: 1,
    aspectRatio: 1.45,
    resizeMode: 'contain',
    borderRadius: 5,
    margin: 7,
    borderColor: 'black',
    borderWidth: 1,
  },
  cropText: {
      fontSize: 20,
    height: 30,
    lineHeight: 30,
    // marginLeft: 130,
    fontWeight: 'bold',
    backgroundColor: '#fff',
  }
});

const mapStateToProps = state => ({
  isLoading: state.crop.isLoading,
  cropData: state.crop.cropData,
  error: state.crop.error,
  //   cropId: state.crop.cropId,
  isLoggedIn: state.auth.isLoggedIn,
  deviceData: state.device.deviceData,
  plantData: state.plant.plantData,
  authData: state.auth.authData,
  cropDataDetails: state.crop.cropDataDetails,
  createData: state.crop.createData,
  deleteData: state.crop.deleteData,
  isCropStopped: state.crop.isCropStopped,
});

const mapDispatchToProps = dispatch => ({
  // eslint-disable-next-line max-len
  createCrop: (authData, name, deviceId, plantId) => dispatch(actions.createCrop({
    authData, name, deviceId, plantId
  })),
  getPlant: () => dispatch(actions.getPlant()),
  getCrop: authData => dispatch(actions.getCrop(authData)),
  getCropDetails: (authData, data) => dispatch(actions.getCropDetails(authData, data)),
  deleteCrop: (authData, cropId) => dispatch(actions.deleteCrop(authData, cropId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CropScreen);
