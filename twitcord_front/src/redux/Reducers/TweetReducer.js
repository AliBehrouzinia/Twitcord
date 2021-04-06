import {SET_TWEET_TEXT} from '../actionTypes';

const initialState = {
  tweetText: null,
};

const tweetReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TWEET_TEXT:
      return {...state, tweetText: action.tweetText};
    default:
      return state;
  }
};

export default tweetReducer;
