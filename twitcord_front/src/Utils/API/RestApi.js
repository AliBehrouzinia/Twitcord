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
      Constants.URL_TWEET,
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

export const userGeneralInfo = (data) => {
  return request(
      data,
      {},
      Constants.URL_USER_GENERAL_INFO,
      Constants.GET_REQUEST_METHOD,
  );
};

export const uploadPhoto = (data) => {
  return request(
      data.file,
      {},
      data.url,
      'PUT',
  );
};

export const replyTweet = (data) => {
  return request(
      data,
      {},
      Constants.URL_REPLY,
      Constants.POST_REQUEST_METHOD,
  );
};

export const createRoom = (data) => {
  return request(
      data,
      {},
      Constants.URL_CREATE_ROOM,
      Constants.POST_REQUEST_METHOD,
  );
};

export const getFollowersList = (data) => {
  return request(
      {},
      {},
      Constants.URL_FOLLOWERS_LIST.replace('{id}', data.id),
      Constants.GET_REQUEST_METHOD,
  );
};

export const getFollowingsList = (data) => {
  return request(
      {},
      {},
      Constants.URL_FOLLOWINGS_LIST.replace('{id}', data.id),
      Constants.GET_REQUEST_METHOD,
  );
};

export const getRoomsList = (data) => {
  return request(
      {},
      {},
      Constants.URL_ROOMS_LIST.replace('{id}', data.id),
      Constants.GET_REQUEST_METHOD,
  );
};

export const getTweet = (id) => {
  return request(
      {},
      {},
      Constants.URL_TWEET+id+'/family/',
      Constants.GET_REQUEST_METHOD,
  );
};