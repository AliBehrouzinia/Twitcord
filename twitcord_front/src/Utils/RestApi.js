/* eslint-disable */

import axios from "axios";
import * as Constants from "./Constants";

const instance = axios.create({
  baseURL: Constants.BASE_URL,
  responseType: "json",
  headers: {
    Authorization: "token 3c2380f638b1a5456efe4621a5ff3debac83e457",
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

const postTweet = (data) =>
  instance({
    method: "POST",
    url: "/tweets/",
    data,
  });

export default postTweet;
