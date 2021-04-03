import React from 'react';
import Button from '@material-ui/core/Button';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import '../TweetBox/TweetBox.css';

const TweetBox = (props) => (
  <div className="tweet-box">
    <TextareaAutosize
      rowsMin={4}
      rowsMax={4}
      placeholder="what is in your mind?"
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

export default TweetBox;
