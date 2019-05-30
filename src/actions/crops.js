import {
  CREATE_SUCCESS, CREATE_ATTEMPT, CREATE_FAILED, GET_CROP
} from './types';
import api from '../Constants/constants';

export function createSuccess(cropData) {
  return {
    type: CREATE_SUCCESS,
    cropData
  };
}

export function isLoadingCreate(bool) {
  return {
    type: CREATE_ATTEMPT,
    isLoading: bool
  };
}

export function createFailed(error) {
  return {
    type: CREATE_FAILED,
    error
  };
}

export function getSuccess(cropData) {
  return {
    type: GET_CROP,
    cropData
  };
}

export function createCrop(data) {
  return (dispatch) => {
    dispatch(isLoadingCreate(true));
    return fetch(`http://${api}/api/crop`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${data.accessToken}`
      },
      body: JSON.stringify({
        name: data.name,
        deviceId: data.deviceId,
        plantId: data.plantId
      })
    })
      .then((response) => {
        if (response.status < 300) {
          dispatch(isLoadingCreate(false));
          response.json().then((responseJSON) => {
            console.log('responseJSON', responseJSON);
            dispatch(createSuccess(responseJSON));
          });
        } else {
          response.json().then((responseJSON) => {
            console.log('responseJSON', responseJSON);
            dispatch(isLoadingCreate(false));
            dispatch(createFailed(responseJSON.message));
          });
        }
      })
      .catch((error) => {
        console.log('error', error);
        dispatch(isLoadingCreate(false));
        dispatch(createFailed(error));
      });
  };
}

export function getCrop(data) {
  return dispatch => fetch(`http://${api}/api/crop`, {
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
          dispatch(getSuccess(responseJSON));
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
