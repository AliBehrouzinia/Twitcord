import {ActionTypes} from '../actionTypes';

const initialState = {
  tweetText: '',
  tweetCharCount: 0,
};

const tweetReducer = (state = initialState, action) => {
  switch (action.type) {
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
