import React from 'react';
import {useHistory} from 'react-router-dom';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import NotificationsRoundedIcon from '@material-ui/icons/NotificationsRounded';
import SearchRoundedIcon from '@material-ui/icons/SearchRounded';
import PersonRoundedIcon from '@material-ui/icons/PersonRounded';
import RecordVoiceOverRoundedIcon from
  '@material-ui/icons/RecordVoiceOverRounded';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import Typography from '@material-ui/core/Typography';
import './SideDrawer.css';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import * as Actions from '../../../redux/Actions/index';


const SideDrawer = () => {
  const history = useHistory();
  const windowHeight = window['innerHeight'];
  const selectedIndex = useSelector((state) => state).tweet.drawerSelectedTab;
  const dispatch = useDispatch();

  const handleClick = (index) => {
    console.log(index);
    dispatch(
        Actions.setDrawerSelectedTab({
          selectedTab: index,
        }),
    );

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
    </div>
  );
};

export default SideDrawer;
