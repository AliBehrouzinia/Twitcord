import {SET_TWEET_TEXT} from '../actionTypes';

const initialState = {
  tweetText: 'SS',
};

const tweetReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TWEET_TEXT:
      console.log(state);
      console.log(action);
      return {...state, tweetText: action.tweetText};
    default:
      return state;
  }
};

export default tweetReducer;
