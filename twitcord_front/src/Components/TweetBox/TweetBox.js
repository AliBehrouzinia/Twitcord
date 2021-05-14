import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Grid from '@material-ui/core/Grid';
import './TweetBox.css';
import PropTypes from 'prop-types';
import * as Constants from '../../Utils/Constants.js';
import CharCounter from '../CharCounter/CharCounter';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import * as API from '../../Utils/API/index';
import * as Actions from '../../redux/Actions/index';
import SnackbarAlert from '../Snackbar/Snackbar';

/* eslint-disable */


const TweetBox = () => {
  const tweetInfo = useSelector((state) => state).tweet;
  const dispatch = useDispatch();
  const isSnackbarOpen = useSelector((state) => state).tweet.isSnackbarOpen;
  const [snackbarAlertMessage, setSnackbarAlertMessage] = useState('');
  const [snackbarAlertSeverity, setSnackbarAlertSeverity] = useState('');
  const postButtonDisable =
  tweetInfo.tweetCharCount > Constants.TWEET_CHAR_LIMIT ||
  tweetInfo.tweetText.length == 0;

  const clearTweet = () => {
    dispatch(Actions.setTweetText({
      tweetText: '',
    }));
  }
  
  const handlePostClick = () => {
    const tweetData = {content: tweetInfo.tweetText};
  
    API.postTweet(tweetData)
        .then((response) => {
          clearTweet();
          setSnackbarAlertMessage(
            Constants.TWEET_SUCCESS_MESSAGE);
          setSnackbarAlertSeverity(
            Constants.SNACKBAR_SUCCESS_SEVERITY);
          dispatch(
            Actions.setSnackBarState({
              isSnackbarOpen: true,
            }),
        );
        })
        .catch((error) => {
          setSnackbarAlertMessage(
            Constants.TWEET_FAILURE_MESSAGE);
          setSnackbarAlertSeverity(
            Constants.SNACKBAR_ERROR_SEVERITY);
          dispatch(
            Actions.setSnackBarState({
              isSnackbarOpen: true,
            }),
        );
        });
  };

  return (
    <Grid container className="tweet-box">
      {isSnackbarOpen && (<SnackbarAlert
        alertMessage={snackbarAlertMessage}
        severity={snackbarAlertSeverity}/>)}
      <Grid item xs={12}>
        <TextareaAutosize
          rowsMin={Constants.TWEET_BOX_ROW_MIN}
          rowsMax={Constants.TWEET_BOX_ROW_MAX}
          placeholder="what is in your mind?"
          onChange={(e) =>
            dispatch(
                Actions.setTweetText({
                  tweetText: e.target.value,
                }),
            )
          }
          value={tweetInfo.tweetText}
        />
      </Grid>
      <Grid item xs={12}>
        <Grid container className="bottom-bar">
          <Grid item xs={1} sm={1}>
            <CharCounter numChar={tweetInfo.tweetCharCount} />
          </Grid>
          <Grid item xs={2} sm={2}>
            <Button
              className="tweet-box-button"
              variant="contained"
              color="primary"
              onClick={handlePostClick}
              disabled={postButtonDisable}
            >
              post
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

// eslint-disable-next-line require-jsdoc


TweetBox.propTypes = {
  tweetText: PropTypes.string,
  tweetCharCount: PropTypes.number,
};

export default TweetBox;
