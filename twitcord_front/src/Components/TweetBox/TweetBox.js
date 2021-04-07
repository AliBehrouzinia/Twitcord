import React from 'react';
import Button from '@material-ui/core/Button';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import * as actionTypes from '../../redux/actionTypes';
import Grid from '@material-ui/core/Grid';
import {connect} from 'react-redux';
import './TweetBox.css';
import PropTypes from 'prop-types';
import * as Constants from '../../Utils/Constants';
import CharCounter from '../CharCounter/CharCounter';

const TweetBox = (props) => (
  <Grid container className="tweet-box">
    <Grid item xs={12}>
      <TextareaAutosize
        rowsMin={Constants.TWEET_BOX_ROW_MIN}
        rowsMax={Constants.TWEET_BOX_ROW_MAX}
        placeholder="what is in your mind?"
        onChange={(e) => props.onTweetTextChanged(e.target.value)}
      />
    </Grid>
    <Grid item xs={12}>
      <Grid container className="bottom-bar">
        <Grid item xs={2} >
          <CharCounter numChar={121} />
        </Grid>
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
