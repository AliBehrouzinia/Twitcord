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

  },
  followcount: {
    pk: 0,
    followers_count: 0,
    followings_count: 0,
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
    case ActionTypes.SET_FOLLOW_COUNT: {
      return {
        ...state,
        followcount: {
          ...state.followcount,
          pk: action.pk,
          followers_count: action.followers_count,
          followings_count: action.followings_count,
        },
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
          firstName: action.firstName,
          lastName: action.lastName,
          website: action.website,
          username: action.username,
          isPublic: action.isPublic,
          email: action.email,
          date_joined: action.date_joined,
        },
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
