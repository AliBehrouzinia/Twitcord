import {SET_TWEET_TEXT} from '../actionTypes';

const initialState = {
  tweetText: '',
  tweetCharCount: 0,
};

const tweetReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TWEET_TEXT:
      return {
        ...state,
        tweetText: action.tweetText,
        tweetCharCount:
          action.tweetText != undefined ? action.tweetText.length : 0,
      };
    default:
      return state;
  }
};

export default tweetReducer;
