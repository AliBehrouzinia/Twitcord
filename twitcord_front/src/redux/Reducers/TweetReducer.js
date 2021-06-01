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
  userSearchResult: [],
  tweetSearchResult: [],
  profileInfo: {
    username: '',
    bio: '',
    date_joined: '',
    birthday: '',
    firstName: '',
    lastName: '',
    website: '',
    isPublic: false,
    email: '',
    followers_count: 0,
    followings_count: 0,
  },
  sideDrawerEnable: true,
  tweetText: '',
  tweetCharCount: 0,
  searchInput: '',
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

    case ActionTypes.SET_SEARCH_INPUT: {
      return {
        ...state,
        searchInput: action.input,
      };
    }

    case ActionTypes.SET_SNACKBAR_STATE: {
      return {
        ...state,
        isSnackbarOpen: action.isSnackbarOpen,
      };
    }

    case ActionTypes.SET_USER_SEARCH_RESULT: {
      return {
        ...state,
        userSearchResult: action.users,
      };
    }

    case ActionTypes.SET_TWEET_SEARCH_RESULT: {
      return {
        ...state,
        tweetSearchResult: action.tweets,
      };
    }

    case ActionTypes.SET_PROFILE_INFO: {
      return {
        ...state,
        profileInfo: {
          ...state.profileInfo,
          bio: action.bio,
          birthday: action.birthday,
          firstName: action.first_name,
          lastName: action.last_name,
          website: action.website,
          username: action.username,
          isPublic: action.isPublic,
          email: action.email,
          date_joined: action.date_joined,
          followers_count: action.followers_count,
          followings_count: action.followings_count,
        },
      };
    }

    case ActionTypes.SET_SIDE_DRAWER_ENABLE: {
      return {
        ...state,
        sideDrawerEnable: action.enable,
      };
    }

    default:
      return state;
  }
};

export default tweetReducer;
