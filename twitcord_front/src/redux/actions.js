import {ActionTypes} from '../redux/actionTypes';

export const setTweetText = (data) => ({
  type: ActionTypes.SET_TWEET_TEXT,
  ...data,
});
