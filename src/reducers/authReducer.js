import {
  LOGIN_ATTEMPT, LOGOUT, LOGIN_SUCCESS, LOGIN_FAILED, SIGN_UP_SUCCESS, SIGN_UP_FAILED
} from '../actions/types';

const INITIAL_STATE = {
  isLoggedIn: false,
  isLoading: false,
  authData: {},
  error: undefined,
  isSignedUp: false
};

export default function auth(state = INITIAL_STATE, action) {
  console.log(action.type);
  switch (action.type) {
  case LOGIN_ATTEMPT:
    return {
      ...state,
      isLoading: true,
      isLoggedIn: false
    };
  case LOGIN_SUCCESS:
    return {
      ...state,
      isLoading: false,
      isLoggedIn: true,
      authData: action.authData,
      error: undefined
    };
  case LOGIN_FAILED:
    return {
      ...state,
      isLoading: false,
      isLoggedIn: false,
      error: action.error
    };
  case LOGOUT:
    return {
      ...state,
      isLoading: false,
      isLoggedIn: false
    };
  case SIGN_UP_SUCCESS:
    return {
      ...state,
      isSignedUp: true,
      authData: action.authData,
      error: undefined
    };
  case SIGN_UP_FAILED:
    return {
      ...state,
      isSignedUp: false,
      error: action.error
    };
  default:
    return state;
  }
}
