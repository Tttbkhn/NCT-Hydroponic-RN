import {
 CREATE_ATTEMPT, CREATE_FAILED, CREATE_SUCCESS, GET_CROP 
} from '../actions/types';

const INITIAL_STATE = {
  isLoading: false,
  cropData: {},
  error: undefined
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
      cropData: action.cropData,
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
  default:
    return state;
  }
}
