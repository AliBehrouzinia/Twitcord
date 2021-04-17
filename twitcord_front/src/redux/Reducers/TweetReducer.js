import {ActionTypes} from '../Actions/actionTypes.js';

const initialState = {
  signUpInfo: {
    username: '',
    email: '',
    password1: '',
    password2: '',
  },
  logInInfo: {
    email: '',
    password: '',
  },
  tweetText: '',
  tweetCharCount: 0,
};

const tweetReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SET_SIGN_UP_INFO:
      return {
        ...state,
        signUpInfo: {
          ...state.signUpInfo,
          username: action.username,
          email: action.email,
          password1: action.password,
          password2: action.confirmPassword,
        },
      };
    case ActionTypes.SET_LOG_IN_INFO:
      return {
        ...state,
        logInInfo: {
          ...state.logInInfo,
          username: action.username,
          password: action.password,
        },
      };
    case ActionTypes.SET_TWEET_TEXT:
      return {
        ...state,
        tweetText: action.tweetText,
        tweetCharCount: action.tweetText.length,
      };
    default:
      return state;
  }
};

export default tweetReducer;
