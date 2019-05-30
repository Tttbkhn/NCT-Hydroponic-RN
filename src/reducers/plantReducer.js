import { GET_PLANT } from '../actions/types';

const INITIAL_STATE = {
  plantData: {},
  error: undefined
};

export default function plant(state = INITIAL_STATE, action) {
  console.log(action.type);
  switch (action.type) {
  case GET_PLANT:
    return {
      ...state,
      plantData: action.plantData,
      error: undefined
    };
  default:
    return state;
  }
}
