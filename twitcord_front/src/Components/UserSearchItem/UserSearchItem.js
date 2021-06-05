/* eslint-disable require-jsdoc */
import React, {useState} from 'react';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {Icon} from '@material-ui/core';
import PropTypes from 'prop-types';
import Tooltip from '@material-ui/core/Tooltip';
import * as API from '../../Utils/API/index';
import './UserSearchItem.css';

export const UserSearchItem = (props) => {
  const [Situation, setSituation] = useState(props.status);
  function handleunrequest(id) {
    API.deleteFollowRequest({id: id})
        .then((response) => {
          console.log(Situation);
          setSituation(response.status);
          console.log(Situation);
        })
        .catch((error) => {
          console.log(error);
        });
  }
  function handleunfollow(id) {
    API.unfollow({id: id})
        .then((response) => {
          console.log(Situation);
          setSituation(response.status);
          console.log(Situation);
        })
        .catch((error) => {
          console.log(error);
        });
  }
  function handlefollow(id) {
    API.follow({'request_to': id})
        .then((response) => {
          console.log(response.status);
          setSituation(response.status);
          console.log(Situation);
        })
        .catch((error) => {
          console.log(error);
        });
  }
  console.log(props.status);
  return (
    <Grid container
      direction="row"
      spacing={6}
      className="usi-container"
      justify="space-between">
      <Grid item xs={12} sm={9} md={10}>
        <div className="usi-avatar-container">
          <Avatar className="usi-avatar" alt="avatar"/>
          <div className="usi-username-container">
            <div className="usi-name-container">
              <Tooltip title={props.name} placement="top-start">
                <Typography className="usi-name" >{props.name}</Typography>
              </Tooltip>
              {!props.isPublic && <Icon className="usi-lock-icon">lock</Icon>}
            </div>
            <Tooltip title={'@'+props.username} placement="top-start">
              <Typography className="usi-username">
                @{props.username}
              </Typography>
            </Tooltip>
          </div>
        </div>
      </Grid>
      { Situation == 'not following' ?(
      <Grid item xs={12} sm={3} md={2} className="usi-item-follow">
        <Button
          className="usi-follow-button"
          color="primary"
          onClick={() => handlefollow(props.id)}
          variant="outlined">
             follow
        </Button>
      </Grid>) : Situation == 'following' ? (
      <Grid item xs={12} sm={3} md={2} className="usi-item-follow">
        <Button
          className="usi-follow-button"
          color="primary"
          onClick={() => handleunfollow(props.id)}
          variant="outlined">
             unfollow
        </Button>
      </Grid>) : Situation == 'Requested' ?(
          <Grid item xs={12} sm={3} md={2} className="usi-item-follow">
            <Button
              className="usi-follow-button"
              color="primary"
              onClick={() => handleunrequest(props.id)}
              variant="outlined">
             pending
            </Button>
          </Grid>) : (<div/>)}


      {props.bio != null && <Grid xs={12} item className="usi-item-desc">
        <Typography className="usi-desc">{props.bio}</Typography>
      </Grid>}
    </Grid>
  );
};

UserSearchItem.propTypes = {
  name: PropTypes.string,
  username: PropTypes.string,
  bio: PropTypes.string,
  id: PropTypes.number,
  isPublic: PropTypes.bool,
  status: PropTypes.string,
};
