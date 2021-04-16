import axios from 'axios';
import * as Constants from './Constants';

const instance = axios.create({
  baseURL: Constants.BASE_URL,
  responseType: 'json',
  headers: {
    'Authorization': 'token 3c2380f638b1a5456efe4621a5ff3debac83e457',
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

const postTweet = (data) => {
  return request(
      data,
      Constants.URL_POST_TWEET,
      Constants.POST_REQUEST_METHOD,
  );
};

export default postTweet;
