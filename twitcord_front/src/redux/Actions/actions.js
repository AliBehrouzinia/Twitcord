import {ActionTypes} from './actionTypes';

export const setSignUpInfo = (data) => ({
  type: ActionTypes.SET_SIGN_UP_INFO,
  ...data,
});

export const setLogInInfo = (data) => ({
  type: ActionTypes.SET_LOG_IN_INFO,
  ...data,
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

export const setTweetText = (data) => ({
  type: ActionTypes.SET_TWEET_TEXT,
  ...data,
});
