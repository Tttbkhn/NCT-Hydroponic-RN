import { GET_PLANT } from './types';
import api from '../Constants/constants';

export function getPlantSuccess(plantData) {
  return {
    type: GET_PLANT,
    plantData
  };
}

export function getPlant() {
  return dispatch => fetch(`http://${api}/api/plant`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  })
    .then((response) => {
      if (response.status < 300) {
        response.json().then((responseJSON) => {
        //   console.log('responseJSON', responseJSON);
          dispatch(getPlantSuccess(responseJSON));
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
