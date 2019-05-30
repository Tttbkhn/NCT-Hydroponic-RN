import { GET_USER } from '../actions/types';

const INITIAL_STATE = {
  userData: {},
  error: undefined
};

export default function user(state = INITIAL_STATE, action) {
  console.log(action.type);
  switch (action.type) {
  case GET_USER:
    return {
      ...state,
      userData: action.userData,
      error: undefined
    };
  default:
    return state;
  }
}
