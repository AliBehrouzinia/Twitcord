import React, {useState} from 'react';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import {Icon} from '@material-ui/core';
import PropTypes from 'prop-types';
import Tooltip from '@material-ui/core/Tooltip';
import './TweetSearchItem.css';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import CachedIcon from '@material-ui/icons/Cached';
import IconButton from '@material-ui/core/IconButton';
import {ReplyModal} from '../ReplyModal/ReplyModal';
import * as helper from '../../Utils/helper';

export const TweetSearchItem = (props) => {
  const [open, setOpen] = useState(false);

  const openReplyModal = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Grid container
        direction="row"
        spacing={6}
        className="tsi-container"
        justify="space-between">
        <Grid item xs={12} sm={9} md={10}>
          <div className="tsi-avatar-container">
            <Avatar className="tsi-avatar" alt="avatar"/>
            <div className="tsi-username-container">
              <div className="tsi-name-container">
                <Tooltip title={props.name} placement="top-start">
                  <Typography className="tsi-name" >{props.name}</Typography>
                </Tooltip>
                {!props.isPublic && <Icon className="tsi-lock-icon">lock</Icon>}
                <Typography className="tsi-date">
                  <div className="tsi-dot"/>
                  {helper.extractTime(props.createDate)}
                </Typography>
              </div>
              <Tooltip title={'@'+props.username} placement="top-start">
                <Typography className="tsi-username">@{props.username}
                </Typography>
              </Tooltip>
            </div>
          </div>
        </Grid>

        <Grid xs={12} item className="tsi-item-desc">
          <Typography className="tsi-desc">{props.content}</Typography>
        </Grid>

        <Grid xs={12} container item className="tsi-icon-bottom-bar">
          <Grid item>
            <IconButton>
              <FavoriteBorderIcon/>
            </IconButton>
          </Grid>

          <Grid item>
            <IconButton onClick={openReplyModal}>
              <ChatBubbleOutlineIcon/>
            </IconButton>
          </Grid>

          <Grid item>
            <IconButton>
              <CachedIcon/>
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
      <ReplyModal tweet={props} open={open} onClose={handleClose} />
    </div>
  );
};

TweetSearchItem.propTypes = {
  name: PropTypes.string,
  username: PropTypes.string,
  content: PropTypes.string,
  isPublic: PropTypes.bool,
  createDate: PropTypes.string,
  id: PropTypes.number,
  userId: PropTypes.number,
};
