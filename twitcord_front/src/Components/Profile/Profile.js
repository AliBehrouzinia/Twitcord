import React from 'react';
/* eslint-disable */
import ProfileUserinfo from '../ProfileUserinfo/ProfileUserinfo';
import './Profile.css';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { useSelector } from 'react-redux';
import ProfileTweetlist from '../ProfileTweetlist/ProfileTweetlist';
const Profile = () => {
  const [tabSelected, setSelectedTab] = React.useState(0);

  const handleChange = (event, selectedTab) => {
    setSelectedTab(selectedTab);
  };
  const tweets = useSelector((state) => state).tweet.tweetInfo;


  const tweetlists = tweets.map(
    (user) => <div key={user.id}>
      <ProfileTweetlist
        name={user.first_name + ' ' + user.last_name}
        username={user.username}
        bio={user.bio}
        followState={user.status}
        isPublic={user.is_public} />
      <Divider />
    </div>,
  )

  return (
    <Grid container direction="column">
      <Grid item className="grid-item" xs={12}>
        <ProfileUserinfo />
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
      </Grid>
      <Grid item xs={12} className="grid-item">
        {tabSelected == 0 && tweetlists}
        {tabSelected == 1 && <p className="profile-content">replys</p>}
        {tabSelected == 2 && <p className="profile-content">likes</p>}
        {tabSelected == 3 && <p className="profile-content">rooms</p>}
      </Grid>
      <ProfileTweetlist />
    </Grid>
  );
};
Profile.propTypes = {
  componentid: PropTypes.number,
};
export default Profile;
