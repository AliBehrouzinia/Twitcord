import {ActionTypes} from '../Actions/actionTypes';

const initialState = {
  signUpInfo: {
    username: '',
    email: '',
    password1: '',
    password2: '',
  },
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
    default:
      return state;
  }
};

export default tweetReducer;
