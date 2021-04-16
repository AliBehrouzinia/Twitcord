import axios from 'axios';
import * as Constants from '../Constants.js';

const instance = axios.create({
  baseURL: Constants.BASE_URL,
  responseType: 'json',
  headers: {
    // Change this with your own token
    'Authorization': 'token efa18a57ed840ca25cd07ae619485f7d52d28c48',
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

const request = (data, url, method) => {
  switch (method) {
    case Constants.POST_REQUEST_METHOD:
      return instance({
        method: method,
        url: url,
        data,
      });
  }
};

export const postTweet = (data) => {
  return request(
      data,
      Constants.URL_POST_TWEET,
      Constants.POST_REQUEST_METHOD,
  );
};

