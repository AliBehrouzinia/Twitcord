import React from 'react';
import Button from '@material-ui/core/Button';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import * as actionTypes from '../../redux/actionTypes';
import Grid from '@material-ui/core/Grid';
import {connect} from 'react-redux';
import './TweetBox.css';
import PropTypes from 'prop-types';

const TweetBox = (props) => (
  <Grid container className="tweet-box">
    <Grid item xs={12}>
      <TextareaAutosize
        rowsMin={4}
        rowsMax={4}
        placeholder="what is in your mind?"
        onChange={(e) => props.onTweetTextChanged(e.target.value)}
      />
    </Grid>
    <Grid item xs={12}>
      <Grid container className="bottom-bar">
        <Grid item xs={12} sm={3} md={2}>
          <Button className="cancel tweet-box-button" variant="contained">
            cancel
          </Button>
        </Grid>
        <Grid item xs={12} sm={3} md={2}>
          <Button
            className="submit tweet-box-button"
            variant="contained"
            color="primary"
          >
            post
          </Button>
        </Grid>
      </Grid>
    </Grid>
  </Grid>
);

TweetBox.propTypes = {
  onTweetTextChanged: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTweetTextChanged: (tweetText) => {
      console.log(tweetText);
      dispatch({type: actionTypes.SET_TWEET_TEXT, tweetText: tweetText});
    },
  };
};

export default connect(null, mapDispatchToProps)(TweetBox);
