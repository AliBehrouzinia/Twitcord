import axios from 'axios';
import * as Constants from '../Constants.js';

const instance = axios.create({
  baseURL: Constants.BASE_URL,
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

const withoutAuthInstance = axios.create({
  baseURL: Constants.BASE_URL,
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

const request = (data, params, url, method) => {
  if (url !== Constants.URL_SIGN_UP && url !== Constants.URL_LOG_IN) {
    return instance({
      method: method,
      url: url,
      params: params,
      data,
      headers: {
        'Authorization': 'token ' + localStorage.getItem('token'),
      },
    });
  } else {
    return withoutAuthInstance({
      method: method,
      url: url,
      data,
    });
  }
};

export const signUp = (data) => {
  return request(
      data,
      {},
      Constants.URL_SIGN_UP,
      Constants.POST_REQUEST_METHOD,
  );
};

export const postTweet = (data) => {
  return request(
      data,
      {},
      Constants.URL_POST_TWEET,
      Constants.POST_REQUEST_METHOD,
  );
};

export const logIn = (data) => {
  return request(
      data,
      {},
      Constants.URL_LOG_IN,
      Constants.POST_REQUEST_METHOD,
  );
};

export const rejectfollowrequest = (data, params) => {
  return request(
      data,
      params,
      Constants.REJECT_FOLLOW_REQUEST.replace('{id}', data.id),
      Constants.PATCH_REQUEST_METHOD,
  );
};
export const acceptfollowrequest = (data, params) => {
  return request(
      data,
      params,
      Constants.ACCEPT_FOLLOW_REQUEST.replace('{id}', data.id),
      Constants.PATCH_REQUEST_METHOD,
  );
};

export const searchUsers = (data, params) => {
  return request(
      data,
      params,
      Constants.URL_SEARCH_USER,
      Constants.GET_REQUEST_METHOD,
  );
};

export const searchTweets = (data, params) => {
  return request(
      data,
      params,
      Constants.URL_SEARCH_TWEET,
      Constants.GET_REQUEST_METHOD,
  );
};

export const getProfileInfo = (data) => {
  return request(
      data,
      {},
      Constants.URL_PROFILE_INFO.replace('{id}', data.id),
      Constants.GET_REQUEST_METHOD,
  );
};

export const updateProfileInfo = (id, data) => {
  return request(
      data,
      {},
      Constants.URL_PROFILE_INFO.replace('{id}', id),
      Constants.PATCH_REQUEST_METHOD,
  );
};

export const followcount = (data) => {
  return request(
      data,
      {},
      Constants.URL_FOLLOW_COUNT.replace('{id}', data.id),
      Constants.GET_REQUEST_METHOD,
  );
};

export const userGeneralInfo = (data) => {
  return request(
      data,
      {},
      Constants.URL_USER_GENERAL_INFO,
      Constants.GET_REQUEST_METHOD,
  );
};
export const followerslist = (data) => {
  return request(
      data,
      {},
      Constants.URL_FOLLOWERS.replace('{id}', data.id),
      Constants.GET_REQUEST_METHOD,
  );
};
export const followingslist = (data) => {
  return request(
      data,
      {},
      Constants.URL_FOLLOWINGS.replace('{id}', data.id),
      Constants.GET_REQUEST_METHOD,
  );
};

export const getFollowRequests = (data) => {
  return request(
      data,
      {},
      Constants.URL_FOLLOW_REQUESTS,
      Constants.GET_REQUEST_METHOD,
  );
};

export const follow = (data) => {
  return request(
      data,
      {},
      Constants.URL_FOLLOW,
      Constants.POST_REQUEST_METHOD,
  );
};

export const unfollow = (data) => {
  return request(
      {},
      {},
      Constants.URL_UNFOLLOW.replace('{id}', data.id),
      Constants.DELETE_REQUEST_METHOD,
  );
};

export const deleteFollowRequest = (data) => {
  return request(
      {},
      {},
      Constants.URL_DELETE_FOLLOW_REQUEST.replace('{id}', data.id),
      Constants.DELETE_REQUEST_METHOD,
  );
};
