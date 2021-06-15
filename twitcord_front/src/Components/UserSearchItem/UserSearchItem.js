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
  console.log(props.status);
  function handleunrequest(id) {
    API.deleteFollowRequest({id: id})
        .then((response) => {
          setSituation(response.data.status);
        })
        .catch((error) => {
          console.log(error);
        });
  }
  function handleunfollow(id) {
    API.unfollow({id: id})
        .then((response) => {
          setSituation(response.data.status);
        })
        .catch((error) => {
          console.log(error);
        });
  }
  function handlefollow(id) {
    API.follow({'request_to': id})
        .then((response) => {
          setSituation(response.data.status);
        })
        .catch((error) => {
          console.log(error);
        });
  }
  return (
    <Grid
      container
      spacing={6}
      className="usi-container"
      justify="space-between">
      <Grid item container xs={12} className="usi-info-container">
        <Grid item className="text-right p-3" xs={6} >
          { Situation == 'not following' ? (
              <Button
                color="primary"
                onClick={() => handlefollow(props.id)}
                variant="contained">
                follow
              </Button>) : Situation == 'following' ? (
                <Button
                  color="primary"
                  onClick={() => handleunfollow(props.id)}
                  variant="contained">
                  unfollow
                </Button>) : Situation == 'pending' ? (
                <Button
                  color="primary"
                  onClick={() => handleunrequest(props.id)}
                  variant="contained">
                  pending
                </Button>) : (<button />)}

        </Grid>
        <Grid item xs={6} >
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
      </Grid>
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
