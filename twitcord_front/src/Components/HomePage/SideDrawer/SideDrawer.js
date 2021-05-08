import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import NotificationsRoundedIcon from '@material-ui/icons/NotificationsRounded';
import SearchRoundedIcon from '@material-ui/icons/SearchRounded';
import PersonRoundedIcon from '@material-ui/icons/PersonRounded';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import RecordVoiceOverRoundedIcon from
  '@material-ui/icons/RecordVoiceOverRounded';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import Typography from '@material-ui/core/Typography';
import './SideDrawer.css';
import Avatar from '@material-ui/core/Avatar';
import Menu from '@material-ui/core/Menu';
import {useDispatch} from 'react-redux';
import MenuItem from '@material-ui/core/MenuItem';
import * as Constants from '../../../Utils/Constants.js';
import * as Actions from '../../../redux/Actions/index';

const SideDrawer = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const windowHeight = window['innerHeight'];
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleMenuClose();
    localStorage.setItem(
        Constants.GENERAL_USER_INFO, null,
    );

    dispatch(
        Actions.setSideDrawerEnable({
          enable: false,
        }),
    );

    history.push('/login');
  };

  const handleClick = (index) => {
    setSelectedIndex(index);

    switch (index) {
      case 0:
        history.push('/homepage');
        break;

      case 1:
        history.push('/profile');
        break;

      case 2:
        history.push('/notification');
        break;

      case 3:
        history.push('/search');
        break;

      case 4:
        history.push('/room');
        break;

      case 5:
        history.push('/message');
        break;
    }
  };
  return (
    <div style={{height: windowHeight}} className="sd-root">
      <div className="sd-container">
        <Typography className="app-name">TweetCord</Typography>
        <div
          onClick={() => handleClick(0)}
          className={selectedIndex === 0 ? 'sd-item-selected' : 'sd-item'}
        >
          <HomeRoundedIcon className="sd-icon" />
          <Typography className="sd-title">home</Typography>
        </div>

        <div
          onClick={() => handleClick(1)}
          className={selectedIndex === 1 ? 'sd-item-selected' : 'sd-item'}
        >
          <PersonRoundedIcon className="sd-icon" />
          <Typography className="sd-title">Profile</Typography>
        </div>

        <div
          onClick={() => handleClick(2)}
          className={selectedIndex === 2 ? 'sd-item-selected' : 'sd-item'}
        >
          <NotificationsRoundedIcon className="sd-icon" />
          <Typography className="sd-title">Notification</Typography>
        </div>

        <div
          onClick={() => handleClick(3)}
          className={selectedIndex === 3 ? 'sd-item-selected' : 'sd-item'}
        >
          <SearchRoundedIcon className="sd-icon"/>
          <Typography className="sd-title">Search</Typography>
        </div>

        <div
          onClick={() => handleClick(4)}
          className={selectedIndex === 4 ? 'sd-item-selected' : 'sd-item'}
        >
          <RecordVoiceOverRoundedIcon className="sd-icon"/>
          <Typography className="sd-title">Room</Typography>
        </div>

        <div
          onClick={() => handleClick(5)}
          className={selectedIndex === 5 ? 'sd-item-selected' : 'sd-item'}
        >
          <MailOutlineIcon className="sd-icon"/>
          <Typography className="sd-title">Message</Typography>
        </div>
      </div>
      <div className="sd-account" onClick={handleMenuClick}>
        <Avatar className="sd-avatar" />
        <Typography className="sd-user-email sd-title">username</Typography>
      </div>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}>
        <MenuItem onClick={handleLogout}>
          <ExitToAppIcon className="sd-logout-icon"/>
          <Typography>Logout</Typography>
        </MenuItem>
      </Menu>
    </div>
  );
};

export default SideDrawer;
