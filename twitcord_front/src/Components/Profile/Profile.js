import React, {useState} from 'react';
import ProfileUserinfo from '../ProfileUserinfo/ProfileUserinfo';
import './Profile.css';
import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {useParams} from 'react-router-dom';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';

const Profile = () => {
  const params = useParams();
  const [tabSelected, setSelectedTab] = useState(0);

  const handleChange = (event, selectedTab) => {
    setSelectedTab(selectedTab);
  };

  return (
    <Box container direction="column" className="w-100 overflow-hidden">
      <Box>
        <ProfileUserinfo id={params.id}/>
      </Box>
      <Box className="mt-4">
        <Tabs
          variant="fullWidth"
          scrollButtons="auto"
          value={tabSelected}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab className="min-w-0" label="tweets" />
          <Tab className="min-w-0" label="replys" />
          <Tab className="min-w-0" label="likes" />
          <Tab className="min-w-0" label="rooms" />
        </Tabs>
      </Box>
      <Divider />
      <Box>
        {tabSelected == 0 && <p>tweets</p> }
        {tabSelected == 1 && <p>replys</p> }
        {tabSelected == 2 && <p>likes</p> }
        {tabSelected == 3 && <p>rooms</p> }
      </Box>
    </Box>
  );
};
Profile.propTypes = {
  componentid: PropTypes.number,
};
export default Profile;
