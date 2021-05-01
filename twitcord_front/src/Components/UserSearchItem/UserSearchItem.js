import React from 'react';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {Icon} from '@material-ui/core';
import './UserSearchItem.css';

export const UserSearchItem = () => {
  return (
    <Grid container
      direction="row"
      spacing={6}
      className="root"
      justify="space-between">
      <Grid item xs={6} >
        <div className="avatar-container">
          <Avatar className="avatar" alt="avatar"/>
          <div className="username-container">
            <div className="name-container">
              <Typography className="name" >name</Typography>
              <Icon className="lock-icon">lock</Icon>
            </div>
            <Typography className="username">@username</Typography>
          </div>
        </div>
      </Grid>

      <Grid item xs={12} sm={3} md={2} >
        <Button className="follow-button" color="primary" variant="outlined">
             follow
        </Button>
      </Grid>

      <Grid xs={12} item>
        <Typography> Weve inspired people around the world to fight
             for bottom-up change since 2011, when we liberated a
             square block of Manhattans Financial District. </Typography>
      </Grid>
    </Grid>
  );
};
