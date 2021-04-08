import {ActionTypes} from '../actions/actionTypes';

export const sendSignUpRequest = () => ({
  type: ActionTypes.SIGN_UP_REQUEST,
});

export const signUpRequestFailure = () => ({
  type: ActionTypes.SIGN_UP_REQUEST_FAILURE,
});

export const signUpRequestSuccess = () => ({
  type: ActionTypes.SIGN_UP_REQUEST_SUCCESS,
});

export const sendLogInRequest = () => ({
  type: ActionTypes.LOG_IN_REQUEST,
});

export const logInRequestFailure = () => ({
  type: ActionTypes.LOG_IN_REQUEST_FAILURE,
});

export const logInRequestSuccess = () => ({
  type: ActionTypes.SIGN_UP_REQUEST_SUCCESS,
});

