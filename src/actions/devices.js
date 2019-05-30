import { GET_ALL_DEVICES } from './types';
import api from '../Constants/constants';

export function getDevicesSuccess(deviceData) {
  return {
    type: GET_ALL_DEVICES,
    deviceData
  };
}

export function getAllDevices(data) {
  return dispatch => fetch(`http://${api}/api/device`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${data.accessToken}`
    }
  })
    .then((response) => {
      if (response.status < 300) {
        response.json().then((responseJSON) => {
          console.log('responseJSON', responseJSON);
          dispatch(getDevicesSuccess(responseJSON));
        });
      } else {
        response.json().then((responseJSON) => {
          console.log('responseJSON', responseJSON);
        });
      }
    })
    .catch((error) => {
      console.log('error', error);
    });
}
