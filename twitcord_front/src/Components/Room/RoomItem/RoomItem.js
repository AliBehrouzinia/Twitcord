import React from 'react';
import Grid from '@material-ui/core/Grid';
import './RoomItem.css';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

const RoomItem = () => {
  return (
    <Grid container className="ri-container" >
      <Grid className="ri-avatar-container" item xs={12} sm={2} md={1} >
        <Avatar className="ri-avatar" alt="room name"/>
      </Grid>
      <Grid className="ri-details-container" item xs>
        <Typography className="ri-room-name">room name</Typography>
        <Typography className="ri-members-count">48 members</Typography>
      </Grid>
    </Grid>
  );
};

export default RoomItem;
