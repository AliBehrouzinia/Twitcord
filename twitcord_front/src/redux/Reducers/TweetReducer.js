import {ActionTypes} from '../Actions/actionTypes.js';

const initialState = {
  userGeneralInfo: {
    userID: null,
    userEmail: '',
    userProfile: '',
  },
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
  profileInfo: {
    username: '',
    bio: '',
    date_joined: '',
    followers: 0,
    following: 0,
    birthday: '',
    firstName: '',
    lastName: '',
    website: '',
    isPublic: false,
    email: '',

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
          email: action.email,
          password: action.password,
        },
      };
    case ActionTypes.SET_TWEET_TEXT:
      return {
        ...state,
        tweetText: action.tweetText,
        tweetCharCount: action.tweetText.length,
      };
    case ActionTypes.SET_PROFILE_INFO:
      return {
        ...state,
        profileInfo: {
          ...state.profileinfo,
          username: action.username,
          bio: action.bio,
          date_joined: action.date_joined,
          followers: action.followers,
          following: action.following,
          birthday: action.birthday,
          firstName: action.firstName,
          lastName: action.lastName,
          website: action.website,
          isPublic: action.isPublic,
          email: action.email,
        },
      };
    case ActionTypes.SET_SNACKBAR_STATE: {
      return {
        ...state,
        isSnackbarOpen: action.isSnackbarOpen,
      };
    }
    case ActionTypes.SET_USER_GENERAL_INFO: {
      return {
        ...state,
        userGeneralInfo: {
          ...state.userGeneralInfo,
          userID: action.pk,
          userEmail: action.email,
          userProfile: action.profile_img,
        },
      };
    }
    default:
      return state;
  }
};

export default tweetReducer;
