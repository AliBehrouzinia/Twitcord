import axios from 'axios';
import * as Constants from '../Constants.js';

const instance = axios.create({
  baseURL: Constants.BASE_URL,
  responseType: 'json',
  headers: {
    'Authorization': 'token ' + localStorage.getItem('token'),
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

const request = (data, url, method) => {
  if (url !== Constants.URL_SIGN_UP && url !== Constants.URL_LOG_IN) {
    switch (method) {
      case Constants.POST_REQUEST_METHOD:
        return instance({
          method: method,
          url: url,
          data,
        });
    }
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
      Constants.URL_SIGN_UP,
      Constants.POST_REQUEST_METHOD,
  );
};

export const postTweet = (data) => {
  return request(
      data,
      Constants.URL_POST_TWEET,
      Constants.POST_REQUEST_METHOD,
  );
};

export const logIn = (data) => {
  return request(
      data,
      Constants.URL_LOG_IN,
      Constants.POST_REQUEST_METHOD,
  );
};
