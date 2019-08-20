import { GET_ALL_DEVICES, GET_ACTUATOR_STATUS, CONTROL_ACTUATOR } from './types';
import api from '../Constants/constants';

export function getDevicesSuccess(deviceData) {
  return {
    type: GET_ALL_DEVICES,
    deviceData
  };
}

export function getActuatorSuccess(actuatorData) {
  return {
    type: GET_ACTUATOR_STATUS,
    actuatorData
  };
}

export function controlActuatorSuccess(controlData) {
  return {
    type: CONTROL_ACTUATOR,
    controlData
  };
}
export function controlActuator(data) {
  return dispatch => fetch(`http://${api}/api/device/control`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${data.authData.accessToken}`
    },
    body: JSON.stringify({
      deviceId: data.deviceId,
      actuatorName: data.actuatorName,
      action: data.action,
      param: data.param
    })
  })
    .then((response) => {
      if (response.status < 300) {
        response.json().then((responseJSON) => {
          console.log('responseJSON', responseJSON);
          dispatch(controlActuatorSuccess(responseJSON));
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

export function getActuatorStatus(authData, deviceId) {
  return dispatch => fetch(`http://${api}/api/device/${deviceId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authData.accessToken}`
    }
  })
    .then((response) => {
      if (response.status < 300) {
        response.json().then((responseJSON) => {
          console.log('responseJSON', responseJSON);
          dispatch(getActuatorSuccess(responseJSON));
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

export function getAllDevices(data) {
  return dispatch => fetch(`http://${api}/api/device`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${data.accessToken}`
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
