import React, {useState} from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import PropTypes from 'prop-types';
import './ReplyModal.css';
import {makeStyles} from '@material-ui/core/styles';
import * as API from '../../Utils/API/index';
import {Link} from 'react-router-dom';
import CharCounter from '../CharCounter/CharCounter';
import * as Constants from '../../Utils/Constants';

const useStyles = makeStyles({
  scrollPaper: {
    alignItems: 'baseline',
  },
});

export const ReplyModal = (props) => {
  const {onClose, open} = props;
  const [tweetInfo, setTweetInfo] = useState('');

  const isSubmitDisable = () =>
    (tweetInfo.length==0 || tweetInfo.length >= Constants.TWEET_CHAR_LIMIT);

  const classes = useStyles();

  const handleClose = () => {
    onClose();
  };

  const replyTweet = () => {
    const reqData = {content: tweetInfo, parent: props.tweet.id};
    API.replyTweet(reqData)
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {
          console.log(error);
        });
  };

  return (
    <div>
      <Dialog classes={{scrollPaper: classes.scrollPaper}}
        onClose={handleClose} aria-labelledby="customized-dialog-title"
        open={open}>
        <DialogTitle className="px-12 py-4-px"
          id="customized-dialog-title" onClose={handleClose}>
          <IconButton onClick={handleClose} aria-label="close">
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent className="px-12" dividers>
          <div className="min-w-50 d-flex">
            <div className="d-flex flex-column align-items-center">
              <Avatar alt={props.tweet?.username} title={props.tweet?.username}
                className="w-48 h-48"
                src="/static/images/avatar/1.jpg" />
              <div className="vl mt-1 br-33"></div>
            </div>
            <div className="ml-2">
              <div className="d-flex">
                <div className="b-900 fs-15 b-700 lh-20">
                  {props.tweet?.name}</div>
                <div className="ml-2 fs-15 b-400 lh-20 text-gray">
                  @{props.tweet?.username}</div>
                {/* <div className="ml-2">
                {extractTime(props.tweet?.createDate)}</div> */}
              </div>
              <div className="mt-2 fs-15 lh-20">
                {props.tweet?.content}
              </div>
              <div className="my-3">
                <span className="text-gray">Replying to </span>
                <Link to={'/profile/'+props.tweet.user} className="link-color">
                  @{props.tweet?.username}
                </Link>
              </div>
            </div>
          </div>
          <div className="mt-2 d-flex">
            <Avatar alt={props.tweet?.username} title={props.tweet?.username}
              className="w-48 h-48"
              src="/static/images/avatar/1.jpg" />
            <TextareaAutosize
              rowsMin={6}
              className="custom-textarea fs-20"
              placeholder="Tweet your reply"
              value={tweetInfo}
              onChange={(e) => setTweetInfo(e.target.value)}
            />
          </div>
          <div className="d-flex justify-content-between">
            <CharCounter numChar={tweetInfo.length} />
            <Button
              variant="contained"
              className="d-block"
              disabled={isSubmitDisable()}
              color="primary"
              onClick={replyTweet}
            >
              Submit
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

ReplyModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  tweet: PropTypes.object,
};
