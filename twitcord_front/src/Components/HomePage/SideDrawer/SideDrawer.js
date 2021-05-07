import React, { useState } from 'react';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import NotificationsRoundedIcon from '@material-ui/icons/NotificationsRounded';
import SearchRoundedIcon from '@material-ui/icons/SearchRounded';
import PersonRoundedIcon from '@material-ui/icons/PersonRounded';
import RecordVoiceOverRoundedIcon from '@material-ui/icons/RecordVoiceOverRounded';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import Typography from '@material-ui/core/Typography';
import './SideDrawer.css'


const SideDrawer = () => {
  const windowHeight = window['innerHeight']

  const [selectedIndex, setSelectedIndex] = useState(-1);  

  return (
      <div style={{height:windowHeight}}>
        <div className="sd-container">
            <Typography className="app-name">TweetCord</Typography>
            <div 
            onClick={() => setSelectedIndex(0)}
            className={selectedIndex === 0 ? "sd-item-selected" : "sd-item"}
            >
              <HomeRoundedIcon className="sd-icon" />
              <Typography className="sd-title">home</Typography>
            </div>

            <div 
            onClick={() => setSelectedIndex(1)}
            className={selectedIndex === 1 ? "sd-item-selected" : "sd-item"}
            >
              <PersonRoundedIcon className="sd-icon" />
              <Typography className="sd-title">Profile</Typography>
            </div>

            <div
            onClick={() => setSelectedIndex(2)}
            className={selectedIndex === 2 ? "sd-item-selected" : "sd-item"}
            >
              <NotificationsRoundedIcon className="sd-icon" />
              <Typography className="sd-title">Notification</Typography>
            </div>

            <div
            onClick={() => setSelectedIndex(3)}
            className={selectedIndex === 3 ? "sd-item-selected" : "sd-item"}
            >
              <SearchRoundedIcon className="sd-icon"/>
              <Typography className="sd-title">Search</Typography>
            </div>

            <div 
            onClick={() => setSelectedIndex(4)}
            className={selectedIndex === 4 ? "sd-item-selected" : "sd-item"}
            >
              <RecordVoiceOverRoundedIcon className="sd-icon"/>
              <Typography className="sd-title">Room</Typography>
            </div>

            <div 
            onClick={() => setSelectedIndex(5)}
            className={selectedIndex === 5 ? "sd-item-selected" : "sd-item"}
            >
              <MailOutlineIcon className="sd-icon"/>
              <Typography className="sd-title">Message</Typography>
            </div>
        </div>
      </div>
  );
}

export default SideDrawer;