import React, {useState, useMemo} from 'react';
import {useHistory, NavLink} from 'react-router-dom';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Typography from '@material-ui/core/Typography';
import './SideDrawer.css';
import Avatar from '@material-ui/core/Avatar';
import Menu from '@material-ui/core/Menu';
import {useDispatch} from 'react-redux';
import MenuItem from '@material-ui/core/MenuItem';
import * as Constants from '../../../Utils/Constants.js';
import * as Actions from '../../../redux/Actions/index';
import logo from '../../../assets/twitcord.png';
import {useSelector} from 'react-redux';
import Tooltip from '@material-ui/core/Tooltip';
/* eslint-disable */

const SideDrawer = () => {
  const userGeneralInfo = useSelector((state) => state).tweet.userGeneralInfo;
  const history = useHistory();
  const navItems = [
    { title:'Home', route:'/homepage'},
    { title:'Profile', route:'/profile'},
    { title:'Notification', route:'/notification'},
    { title:'Search', route:'/search'},
    { title:'Room', route:'/room'},
    { title:'Message', route:'/message'}
  ]
  const dispatch = useDispatch();
  const windowHeight = window['innerHeight'];
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  let email;
  let profileImg;

  useMemo(
    () => {
        if (userGeneralInfo == null || userGeneralInfo.userID == null){
          history.push('/login')
        }
    },
    []
  );

  if (userGeneralInfo != null) {
    email = userGeneralInfo.userEmail;
    profileImg = userGeneralInfo.userProfile;
  }


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

  return (
    <div style={{height: windowHeight}} className="sd-root">
      <div className="sd-container">
        <img className="sd-logo" src={logo} />

        {navItems.map((item) => (
            <NavLink to={item.route} activeClassName='sd-item-selected' className='sd-item'>
              <HomeRoundedIcon className="sd-icon" />
              <Typography className="sd-title">{item.title}</Typography>
            </NavLink>
        ))}
        
      </div>

      <div className="sd-account" onClick={handleMenuClick}>
        <Avatar className="sd-avatar" src={profileImg}/>
        <Tooltip title={email} placement="top-start">
          <Typography className="sd-user-email sd-title">{email}</Typography>
        </Tooltip>
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
