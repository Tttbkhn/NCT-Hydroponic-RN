import { GET_ALL_DEVICES } from '../actions/types';

const INITIAL_STATE = {
  deviceData: {},
  error: undefined
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
  default:
    return state;
  }
}
