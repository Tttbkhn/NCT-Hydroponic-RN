import {
  CREATE_SUCCESS, CREATE_ATTEMPT, CREATE_FAILED, GET_CROP, GET_CROP_DETAILS, STOP_CROP, DELETE_CROP
} from './types';
import api from '../Constants/constants';

export function createSuccess(createData) {
  return {
    type: CREATE_SUCCESS,
    createData
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

export function getDetailsSuccess(cropData) {
  return {
    type: GET_CROP_DETAILS,
    cropData
  };
}

export function deleteCropSuccess(deleteData) {
  return {
    type: DELETE_CROP,
    deleteData
  };
}

export function stopCropSuccess(stopData) {
  return {
    type: STOP_CROP,
    stopData,
  };
}

// export function isOutOfCrop(bool) {
//   return {
//     type: IS_OUT_OF_CROP,
//     isGoneToCrop: bool
//   };
// }

export function createCrop(data) {
  return (dispatch) => {
    dispatch(isLoadingCreate(true));
    return fetch(`http://${api}/api/crop`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${data.authData.accessToken}`
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
      Authorization: `Bearer ${data.accessToken}`
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

export function getCropDetails(authData, data) {
  return dispatch => fetch(`http://${api}/api/crop/${data}`, {
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
          dispatch(getDetailsSuccess(responseJSON));
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

export function stopCrop(authData, cropId) {
  return dispatch => fetch(`http://${api}/api/crop/stop?cropId=${cropId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authData.accessToken}`
    }
  })
    .then((response) => {
      if (response.status < 300) {
        response.json().then((responseJSON) => {
          console.log('responseJSON', responseJSON);
          dispatch(stopCropSuccess(responseJSON));
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

export function deleteCrop(authData, cropId) {
  return dispatch => fetch(`http://${api}/api/crop?cropId=${cropId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authData.accessToken}`
    }
  })
    .then((response) => {
      if (response.status < 300) {
        response.json().then((responseJSON) => {
          console.log('responseJSON', responseJSON);
          dispatch(deleteCropSuccess(responseJSON));
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
