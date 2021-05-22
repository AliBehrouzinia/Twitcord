import React from 'react';
import Dialog from '@material-ui/core/Dialog';
// import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
// import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import PropTypes from 'prop-types';
import './ReplyModal.css';


export const ReplyModal = (props) => {
  const {onClose, open} = props;

  const handleClose = () => {
    onClose();
  };

  return (
    <div>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title"
        open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          <IconButton onClick={handleClose} aria-label="close">
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <div className="min-w-50 d-flex">
            <div className="d-flex flex-column align-items-center">
              <Avatar alt={props.tweet?.username} title={props.tweet?.username}
                src="/static/images/avatar/1.jpg" />
              <div className="vl mt-2 br-33"></div>
            </div>
            <div className="ml-2">
              <div className="d-flex">
                <div>{props.tweet?.name}</div>
                <div className="ml-2">@{props.tweet?.username}</div>
                {/* <div className="ml-2">
                {extractTime(props.tweet?.createDate)}</div> */}
              </div>
              <div>
                {props.tweet?.content}
              </div>
              <div className="mt-4">
              Replying to @{props.tweet?.username}
              </div>
            </div>
          </div>
          <div className="mt-2 d-flex">
            <Avatar alt={props.tweet?.username} title={props.tweet?.username}
              src="/static/images/avatar/1.jpg" />
            <TextareaAutosize
              rowsMin={4}
              rowsMax={10}
              className="custom-textarea"
              placeholder="Tweet your reply"
            />
          </div>
          {/* <Typography gutterBottom>
          this is reza
          </Typography> */}
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
