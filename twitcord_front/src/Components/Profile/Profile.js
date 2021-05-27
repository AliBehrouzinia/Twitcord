import React from 'react';
import ProfileUserinfo from '../ProfileUserinfo/ProfileUserinfo';
import './Profile.css';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
/* eslint-disable */

const Profile = () => {
  const [tabSelected, setSelectedTab] = React.useState(0);

  const handleChange = (event, selectedTab) => {
    setSelectedTab(selectedTab);
  };

  return (

    <Grid xs={12} >
      <ProfileUserinfo/>
      <Tabs
        variant="fullWidth"
        value={tabSelected}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary">
        <Tab label="tweets" />
        <Tab label="replys" />
        <Tab label="likes" />
        <Tab label="rooms" />
      </Tabs>
      {tabSelected == 0 && <p className="profile-content">tweets</p> }
      {tabSelected == 1 && <p className="profile-content">replys</p> }
      {tabSelected == 2 && <p className="profile-content">likes</p> }
      {tabSelected == 3 && <p className="profile-content">rooms</p> }
    </Grid>
  );
};
Profile.propTypes = {
  componentid: PropTypes.number,
};
export default Profile;
