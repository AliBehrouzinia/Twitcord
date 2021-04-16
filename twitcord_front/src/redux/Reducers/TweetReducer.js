import {ActionTypes} from '../Actions/actionTypes.js';

const initialState = {
  signUpInfo: {
    username: '',
    email: '',
    password1: '',
    password2: '',
  },
  tweetText: '',
  tweetCharCount: 0,
};

const tweetReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SET_SIGN_UP_INFO:
      return {
        ...state.signUpInfo,
        signUpInfo: {
          ...state.signUpInfo,
          username: action.username,
          email: action.email,
          password1: action.password,
          password2: action.confirmPassword,
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
