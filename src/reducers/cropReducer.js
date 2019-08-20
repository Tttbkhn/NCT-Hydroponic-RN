import {
  CREATE_ATTEMPT, CREATE_FAILED, CREATE_SUCCESS, GET_CROP, GET_CROP_DETAILS, DELETE_CROP, STOP_CROP,
} from '../actions/types';

const INITIAL_STATE = {
  isGoneToCrop: false,
  isLoading: false,
  cropData: {},
  error: undefined,
  cropId: {},
  cropDataDetails: {},
  createData: {},
  deleteData: {},
  stopData: {},
  isCropStopped: false,
};

export default function crop(state = INITIAL_STATE, action) {
  console.log(action.type);
  switch (action.type) {
  case CREATE_ATTEMPT:
    return {
      ...state,
      isLoading: true,
    };
  case CREATE_SUCCESS:
    return {
      ...state,
      isLoading: false,
      createData: action.createData,
      error: undefined
    };
  case CREATE_FAILED:
    return {
      ...state,
      isLoading: false,
      error: action.error
    };
  case GET_CROP:
    return {
      ...state,
      isLoading: false,
      cropData: action.cropData,
      error: undefined
    };
  case GET_CROP_DETAILS:
    return {
      ...state,
      cropDataDetails: action.cropData,
      isGoneToCrop: true,
      error: undefined,
    };
  case DELETE_CROP:
    return {
      ...state,
      deleteData: action.deleteData,
      error: undefined,
    };
  case STOP_CROP:
    return {
      ...state,
      stopData: action.stopData,
      error: undefined,
      isCropStopped: true,
    };
  default:
    return state;
  }
}
