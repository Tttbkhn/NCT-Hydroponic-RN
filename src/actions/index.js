import {
  LOGIN_ATTEMPT, LOGIN_SUCCESS, LOGIN_FAILED, SIGN_UP_SUCCESS, SIGN_UP_FAILED, LOGOUT, GET_USER
} from './types';
import api from '../Constants/constants';

export * from './devices';
export * from './crops';
export * from './plants';

export function isLoading(bool) {
  return {
    type: LOGIN_ATTEMPT,
    isLoading: bool
  };
}

export function loginSuccess(authData) {
  return {
    type: LOGIN_SUCCESS,
    authData
  };
}

export function loginFailed(error) {
  return {
    type: LOGIN_FAILED,
    error
  };
}

export function signupSuccess(authData) {
  return {
    type: SIGN_UP_SUCCESS,
    authData
  };
}

export function signupFailed(error) {
  return {
    type: SIGN_UP_FAILED,
    error
  };
}

export function logOut() {
  return {
    type: LOGOUT,
  };
}

export function getuserSuccess(userData) {
  return {
    type: GET_USER,
    userData
  };
}

export function getUser(data) {
  return dispatch => fetch(`http://${api}/api/user/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + data.accessToken
    }
  })
    .then((response) => {
      if (response.status < 300) {
        response.json().then((responseJSON) => {
          console.log('responseJSON', responseJSON);
          dispatch(getuserSuccess(responseJSON));
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

export function logIn(data) {
  return (dispatch) => {
    dispatch(isLoading(true));
    return fetch(`http://${api}/api/auth/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        usernameOrEmail: data.email,
        password: data.password
      })
    })
      .then((response) => {
        if (response.status < 300) {
          dispatch(isLoading(false));
          response.json().then((responseJSON) => {
            console.log('responseJSON', responseJSON);
            dispatch(loginSuccess(responseJSON));
          });
        } else {
          response.json().then((responseJSON) => {
            console.log('responseJSON', responseJSON);
            dispatch(isLoading(false));
            dispatch(loginFailed(responseJSON.message));
          });
        }
      })
      .catch((error) => {
        console.log('error', error);
        dispatch(isLoading(false));
        dispatch(loginFailed(error));
      });
  };
}

export function signUp(data) {
  return dispatch => fetch(`http://${api}/api/auth/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      fullName: data.fullname,
      username: data.username,
      email: data.email,
      password: data.password
    })
  })
    .then((response) => {
      if (response.status < 300) {
        response.json().then((responseJSON) => {
          console.log('responseJSON', responseJSON);
          dispatch(signupSuccess(responseJSON));
        });
      } else {
        response.json().then((responseJSON) => {
          console.log('responseJSON', responseJSON);
          dispatch(signupFailed(responseJSON.message));
        });
      }
    })
    .catch((error) => {
      console.log('error', error);
      dispatch(signupFailed(error));
    });
}
