import { combineReducers } from 'redux';
import authReducer from './authReducer';
import userReducer from './userReducer';
import deviceReducer from './deviceReducer';
import cropReducer from './cropReducer';
import plantReducer from './plantReducer';

export default combineReducers({
  auth: authReducer,
  user: userReducer,
  device: deviceReducer,
  crop: cropReducer,
  plant: plantReducer
});
