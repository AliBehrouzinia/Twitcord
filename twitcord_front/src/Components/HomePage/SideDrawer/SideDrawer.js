import React, { useState } from 'react';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import NotificationsRoundedIcon from '@material-ui/icons/NotificationsRounded';
import SearchRoundedIcon from '@material-ui/icons/SearchRounded';
import PersonRoundedIcon from '@material-ui/icons/PersonRounded';
import RecordVoiceOverRoundedIcon from '@material-ui/icons/RecordVoiceOverRounded';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import Typography from '@material-ui/core/Typography';
import './SideDrawer.css'
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import * as Actions from '../../../redux/Actions/index';


const SideDrawer = () => {
  const windowHeight = window['innerHeight']
  const selectedIndex = useSelector((state) => state).tweet.drawerSelectedTab;
  const dispatch = useDispatch();

  return (
      <div style={{height:windowHeight}}>
        <div className="sd-container">
            <Typography className="app-name">TweetCord</Typography>
            <div 
            onClick={() => dispatch(
              Actions.setDrawerSelectedTab({
                selectedTab: 0,
              }),
            )}
            className={selectedIndex === 0 ? "sd-item-selected" : "sd-item"}
            >
              <HomeRoundedIcon className="sd-icon" />
              <Typography className="sd-title">home</Typography>
            </div>

            <div 
            onClick={() => dispatch(
              Actions.setDrawerSelectedTab({
                selectedTab: 1,
              }),
            )}
            className={selectedIndex === 1 ? "sd-item-selected" : "sd-item"}
            >
              <PersonRoundedIcon className="sd-icon" />
              <Typography className="sd-title">Profile</Typography>
            </div>

            <div
            onClick={() => dispatch(
              Actions.setDrawerSelectedTab({
                selectedTab: 2,
              }),
            )}
            className={selectedIndex === 2 ? "sd-item-selected" : "sd-item"}
            >
              <NotificationsRoundedIcon className="sd-icon" />
              <Typography className="sd-title">Notification</Typography>
            </div>

            <div
            onClick={() => dispatch(
              Actions.setDrawerSelectedTab({
                selectedTab: 3,
              }),
            )}
            className={selectedIndex === 3 ? "sd-item-selected" : "sd-item"}
            >
              <SearchRoundedIcon className="sd-icon"/>
              <Typography className="sd-title">Search</Typography>
            </div>

            <div 
            onClick={() => dispatch(
              Actions.setDrawerSelectedTab({
                selectedTab: 4,
              }),
            )}
            className={selectedIndex === 4 ? "sd-item-selected" : "sd-item"}
            >
              <RecordVoiceOverRoundedIcon className="sd-icon"/>
              <Typography className="sd-title">Room</Typography>
            </div>

            <div 
            onClick={() => dispatch(
              Actions.setDrawerSelectedTab({
                selectedTab: 5,
              }),
            )}
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