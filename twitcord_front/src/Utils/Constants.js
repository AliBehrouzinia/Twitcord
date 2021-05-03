/* eslint-disable max-len */

export const BASE_URL = 'http://127.0.0.1:8000';

// request types
export const POST_REQUEST_METHOD = 'POST';
export const GET_REQUEST_METHOD = 'GET';
export const PATCH_REQUEST_METHOD = 'PATCH';

// Urls
export const URL_POST_TWEET = '/tweets/';
export const URL_SIGN_UP = '/rest-auth/registration/';
export const URL_LOG_IN = '/rest-auth/login/';
export const URL_PROFILE_INFO = '/profile/{id}/header/';
export const URL_USER_GENERAL_INFO= '/rest-auth/user/';

export const TWEET_BOX_ROW_MIN = 6;
export const TWEET_BOX_ROW_MAX = 16;
export const TWEET_CHAR_LIMIT = 140;
export const LOG_IN_VERIFICATION_ERROR_MESSAGE = 'Verify your email or checkout your password again';
export const LOG_IN_SUCCESS_MESSAGE = 'You are logged in';
export const GET_USER_INFO_FAILURE= 'Could not get your info, try again later.';
export const SIGN_UP_EMAIL_ERROR_MESSAGE = 'A user is already registered with this e-mail or username';
export const SIGN_UP_VERIFICATION_SUCCESS_MESSAGE = 'Verification email is sent';

export const SNACKBAR_ERROR_SEVERITY = 'error';
export const SNACKBAR_SUCCESS_SEVERITY = 'success';

export const GENERAL_USER_INFO = 'GENERAL_USER_INFO';
