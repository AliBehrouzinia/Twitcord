import React from 'react';
import Button from '@material-ui/core/Button';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Grid from '@material-ui/core/Grid';
import './TweetBox.css';
import PropTypes from 'prop-types';
import * as Constants from '../../Utils/Constants';
import CharCounter from '../CharCounter/CharCounter';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import postTweet from '../../Utils/RestApi';
import {setTweetText} from '../../redux/actions';

const TweetBox = () => {
  const tweetInfo = useSelector((state) => state).tweet;
  const dispatch = useDispatch();
  const postButtonDisable =
  tweetInfo.tweetCharCount > Constants.TWEET_CHAR_LIMIT ||
  tweetInfo.tweetText.length == 0;

  return (
    <Grid container className="tweet-box">
      <Grid item xs={12}>
        <TextareaAutosize
          rowsMin={Constants.TWEET_BOX_ROW_MIN}
          rowsMax={Constants.TWEET_BOX_ROW_MAX}
          placeholder="what is in your mind?"
          onChange={(e) =>
            dispatch(
                setTweetText({
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
              onClick={() => {
                handlePostClick(dispatch, tweetInfo.tweetText);
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
  dispatch(setTweetText({
    tweetText: '',
  }));
}

const handlePostClick = (dispatch, tweetText) => {
  const tweetData = {content: tweetText};

  postTweet(tweetData)
      .then((response) => {
        clearTweet(dispatch);
      })
      .catch((error) => {
      });
};

TweetBox.propTypes = {
  tweetText: PropTypes.string,
  tweetCharCount: PropTypes.number,
};

export default TweetBox;
