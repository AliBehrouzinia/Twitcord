import {ActionTypes} from './actionTypes';

export const setSignUpInfo = (data) => ({
  type: ActionTypes.SET_SIGN_UP_INFO,
  ...data,
});

export const setLogInInfo = (data) => ({
  type: ActionTypes.SET_LOG_IN_INFO,
  ...data,
});

export const setTweetText = (data) => ({
  type: ActionTypes.SET_TWEET_TEXT,
  ...data,
});

export const setSnackBarState = (data) => ({
  type: ActionTypes.SET_SNACKBAR_STATE,
  ...data,
});

<<<<<<< HEAD
export const setUserSearchResults = (data) => ({
  type: ActionTypes.SET_USER_SEARCH_RESULT,
=======
export const setProfileInfo = (data) => ({
  type: ActionTypes.SET_PROFILE_INFO,
  ...data,
});

export const setUserGeneralInfo = (data) => ({
  type: ActionTypes.SET_USER_GENERAL_INFO,
>>>>>>> c561fe336b74d07327206e2930b781daada91765
  ...data,
});
