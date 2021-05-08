import React from 'react';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {Icon} from '@material-ui/core';
import PropTypes from 'prop-types';
import Tooltip from '@material-ui/core/Tooltip';
import './UserSearchItem.css';

export const UserSearchItem = (props) => {
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
            <Tooltip title={'@'+props.username} placement="top-start">
              <Typography className="username">@{props.username}</Typography>
            </Tooltip>
          </div>
        </div>
      </Grid>

      <Grid item xs={12} sm={3} md={2} className="item-follow">
        <Button className="follow-button" color="primary" variant="outlined">
             follow
        </Button>
      </Grid>

      {props.bio != null && <Grid xs={12} item className="item-desc">
        <Typography className="desc">{props.bio}</Typography>
      </Grid>}
    </Grid>
  );
};

UserSearchItem.propTypes = {
  name: PropTypes.string,
  username: PropTypes.string,
  bio: PropTypes.string,
  isPublic: PropTypes.bool,
};
