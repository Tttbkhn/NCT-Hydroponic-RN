import { GET_ALL_DEVICES, GET_ACTUATOR_STATUS, CONTROL_ACTUATOR } from '../actions/types';

const INITIAL_STATE = {
  deviceData: {},
  error: undefined,
  actuatorData: {},
  controlData: {}
};

export default function device(state = INITIAL_STATE, action) {
  console.log(action.type);
  switch (action.type) {
  case GET_ALL_DEVICES:
    return {
      ...state,
      deviceData: action.deviceData,
      error: undefined
    };
  case GET_ACTUATOR_STATUS:
    return {
      ...state,
      actuatorData: action.actuatorData
    };
  case CONTROL_ACTUATOR:
    return {
      ...state,
      error: undefined,
      controlData: action.controlData
    };
  default:
    return state;
  }
}
