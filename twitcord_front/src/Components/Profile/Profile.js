import React from 'react';
import ProfileUserinfo from '../ProfileUserinfo/ProfileUserinfo';
import ProfileTweetlist from '../ProfileTweetlist/ProfileTweetlist';
import './Profile.css';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const Profile = () => {
  const [tabSelected, setSelectedTab] = React.useState(0);

  const handleChange = (event, selectedTab) => {
    setSelectedTab(selectedTab);
  };

  return (
    <Grid container direction="column">
      <Grid item className="grid-item" xs={12} sm={10} md={8}>
        <ProfileUserinfo/>
        </Grid>
        <Grid item className="grid-item" xs={12} sm={10} md={8}>
        <Tabs 
        item
        xs={12} sm={10} md={8}
        variant="fullWidth"
        value={tabSelected} 
        onChange={handleChange} 
        indicatorColor="primary"
        textColor="primary">
          <Tab label="tweets"  />
          <Tab label="replys"  />
          <Tab label="likes" />
          <Tab label="rooms"  />
        </Tabs>
        </Grid>
      <Grid item xs={12} sm={10} md={8} className="grid-item">
      {tabSelected == 0 && <p className="profile-content">tweets</p> }
      {tabSelected == 1 && <p className="profile-content">replys</p> }
      {tabSelected == 2 && <p className="profile-content">likes</p> }
      {tabSelected == 3 && <p className="profile-content">rooms</p> }
      </Grid>
    </Grid>
  );
};
Profile.propTypes = {
  componentid: PropTypes.number,
};
export default Profile;
