import React from 'react';
import Button from '@material-ui/core/Button';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import * as actionTypes from '../../redux/actionTypes';
import Grid from '@material-ui/core/Grid';
import './TweetBox.css';
import PropTypes from 'prop-types';
import * as Constants from '../../Utils/Constants';
import CharCounter from '../CharCounter/CharCounter';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';

const TweetBox = (props) => {
  const counter = useSelector((state) => state);
  const dispatch = useDispatch();
  const postButtonDisable =
    counter.tweet.tweetCharCount > Constants.TWEET_CHAR_LIMIT ||
    counter.tweet.tweetText.length == 0;

  return (
    <Grid container className="tweet-box">
      <Grid item xs={12}>
        <TextareaAutosize
          rowsMin={Constants.TWEET_BOX_ROW_MIN}
          rowsMax={Constants.TWEET_BOX_ROW_MAX}
          placeholder="what is in your mind?"
          onChange={(e) =>
            dispatch({
              type: actionTypes.SET_TWEET_TEXT,
              tweetText: e.target.value,
            })
          }
          value={counter.tweet.tweetText}
        />
      </Grid>
      <Grid item xs={12}>
        <Grid container className="bottom-bar">
          <Grid item xs={1} sm={1}>
            <CharCounter numChar={counter.tweet.tweetCharCount} />
          </Grid>
          <Grid item xs={2} sm={2}>
            <Button
              className="submit tweet-box-button"
              variant="contained"
              color="primary"
              onClick={() => {
                handlePostClick(dispatch);
              }}
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
function clearTweet(dispatch) {
  dispatch({
    type: actionTypes.SET_TWEET_TEXT,
    tweetText: '',
  });
}

const handlePostClick = (dispatch) => {
  clearTweet(dispatch);
  alert('send tweet');
};

TweetBox.propTypes = {
  tweetText: PropTypes.string,
  tweetCharCount: PropTypes.number,
};

export default TweetBox;
