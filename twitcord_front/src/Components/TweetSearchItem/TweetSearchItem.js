import React from 'react';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {Icon} from '@material-ui/core';
import PropTypes from 'prop-types';
import Tooltip from '@material-ui/core/Tooltip';
import './TweetSearchItem.css';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import CachedIcon from '@material-ui/icons/Cached';
import IconButton from '@material-ui/core/IconButton';


export const TweetSearchItem = (props) => {
  const extractTime = (dateString) => {
    const date = new Date(dateString);
    const currentDate = new Date();

    if (date.getMinutes() < currentDate.getMinutes()) {
      const diff = currentDate.getUTCHours() - date.getUTCHours();
      if ( diff < 1) {
        return '1 minute';
      } else {
        return diff + ' minutes';
      }
    }

    if (date.getUTCHours() < currentDate.getUTCHours()) {
      const diff = currentDate.getUTCHours() - date.getUTCHours();
      if ( diff < 1) {
        return '1 hour';
      } else {
        return diff + ' hours';
      }
    }

    if (date.getDate() < currentDate.getDate()) {
      return date.getFullYear() +
      ',' + ( date.getMonth() + 1 ) +
      ',' + date.getDate();
    }

    return 'now';
  };


  return (
    <Grid container
      direction="row"
      spacing={6}
      className="container"
      justify="space-between">
      <Grid item xs={12} sm={9} md={10}>
        <div className="avatar-container">
          <Avatar className="avatar" alt="avatar"/>
          <div className="username-container">
            <div className="name-container">
              <Tooltip title={props.name} placement="top-start">
                <Typography className="name" >{props.name}</Typography>
              </Tooltip>
              {!props.isPublic && <Icon className="lock-icon">lock</Icon>}
            </div>
            <div className="date-container">
              <Tooltip title={'@'+props.username} placement="top-start">
                <Typography className="username">@{props.username}
                </Typography>
              </Tooltip>
              <Typography className="date">
                <span className="dot"> ^</span>
                {extractTime(props.createDate)}
              </Typography>
            </div>
          </div>
        </div>
      </Grid>

      <Grid item xs={12} sm={3} md={2} className="item-follow">
        <Button className="follow-button" color="primary" variant="outlined">
             follow
        </Button>
      </Grid>

      <Grid xs={12} item className="item-desc">
        <Typography className="desc">{props.content}</Typography>
      </Grid>

      <Grid xs={12} container item className="icon-bottom-bar">
        <Grid item>
          <IconButton>
            <FavoriteBorderIcon/>
          </IconButton>
        </Grid>

        <Grid item>
          <IconButton>
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
  );
};

TweetSearchItem.propTypes = {
  name: PropTypes.string,
  username: PropTypes.string,
  content: PropTypes.string,
  isPublic: PropTypes.bool,
  createDate: PropTypes.string,
};
