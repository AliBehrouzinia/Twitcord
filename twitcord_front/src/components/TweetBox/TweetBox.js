import React from 'react';
import Button from '@material-ui/core/Button';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import * as actionTypes from '../../redux/actionTypes';
import {connect} from 'react-redux';
import './TweetBox.css';
import PropTypes from 'prop-types';

const TweetBox = (props) => (
  <div className="tweet-box">
    <TextareaAutosize
      rowsMin={4}
      rowsMax={4}
      placeholder="what is in your mind?"
      onChange={(e) => props.onTweetTextChanged(e.target.value)}
    />
    <div className="bottom-bar">
      <Button className="cancel tweet-box-button" variant="contained">
        cancel
      </Button>
      <Button
        className="submit tweet-box-button"
        variant="contained"
        color="primary"
      >
        post
      </Button>
    </div>
  </div>
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
