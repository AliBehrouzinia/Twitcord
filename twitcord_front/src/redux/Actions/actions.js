import {ActionTypes} from './actionTypes.js';

export const setTweetText = (data) => ({
  type: ActionTypes.SET_TWEET_TEXT,
  ...data,
});
