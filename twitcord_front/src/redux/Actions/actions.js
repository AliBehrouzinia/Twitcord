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
export const setProfileInfo = (data) => ({
  type: ActionTypes.SET_PROFILE_INFO,
=======
export const setUserGeneralInfo = (data) => ({
  type: ActionTypes.SET_USER_GENERAL_INFO,
>>>>>>> ddfaf156e31af0a8c4391205547cc3444b042a9e
  ...data,
});
