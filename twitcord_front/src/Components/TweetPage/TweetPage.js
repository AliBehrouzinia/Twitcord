import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import Box from '@material-ui/core/Box';
import Tooltip from '@material-ui/core/Tooltip';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import IconButton from '@material-ui/core/IconButton';
import {Divider} from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import CachedIcon from '@material-ui/icons/Cached';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import * as API from '../../Utils/API/index';
import * as helper from '../../Utils/helper';
import './TweetPage.css';

const TweetPage = () => {
  const params = useParams();
  const [anchorEl, setAnchorEl] = useState(null);
  const [tweet, setTweet] = useState([]);

  useEffect(()=>{
    API.getTweet(params.id).then((res)=> {
      setTweet(res.data);
    }).catch((error)=>{
      console.log(error);
    });
  }, []);

  const handleClickMoreBtn = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMoreBtn = () => {
    setAnchorEl(null);
  };

  const handleBack = () => {

  };

  return (
    <div>
      <Box>
        <Tooltip title="back" className="m-2">
          <IconButton onClick={handleBack} aria-label="close">
            <ArrowBackIcon />
          </IconButton>
        </Tooltip>
        <Box component="span" className="b-900 ml-2">Tweet</Box>
        <Divider />
        <Box className="px-3 pt-3">
          <Box display="flex" justifyContent="space-between"
            alignItems="center">
            <Box display="flex">
              <Avatar alt={tweet.tweet_user_username}
                title={tweet.tweet_user_username}
                className="w-48 h-48"
                src="/static/images/avatar/1.jpg" />
              <Box display="flex" flexDirection="column" justifyContent="center"
                className="ml-2">
                <Box className="b-600">
                  {tweet.tweet_user_firstname + ' ' + tweet.tweet_user_lastname}
                </Box>
                <Box className="text-gray mt-1">
                  {'@' + tweet.tweet_user_username}</Box>
              </Box>
            </Box>
            <Box className="mr--6">
              <IconButton size="small" onClick={handleClickMoreBtn}>
                <MoreHorizIcon /></IconButton>
            </Box>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleCloseMoreBtn}
            >
              <MenuItem onClick={handleCloseMoreBtn}>Profile</MenuItem>
              <MenuItem onClick={handleCloseMoreBtn}>Block User</MenuItem>
              <MenuItem onClick={handleCloseMoreBtn}>Report</MenuItem>
            </Menu>
          </Box>
          <Box className="mt-3">
            {tweet.tweet_content}
          </Box>
          <Box className="mt-4 text-gray fs-14">
            {helper.extractTime(tweet.tweet_create_date)}</Box>
          <Divider className="mt-3"/>
          <Box display="flex" className="py-3">
            <Box>{0} <Box component="span"
              className="text-gray">Retweets</Box></Box>
            <Box className="ml-5">{0} <Box component="span"
              className="text-gray">likes</Box></Box>
          </Box>
        </Box>
        <Box className="px-3"><Divider /></Box>
        <Box display="flex" justifyContent="space-around" className="px-3 py-1">
          <IconButton>
            <FavoriteBorderIcon />
          </IconButton>
          <IconButton>
            <ChatBubbleOutlineIcon />
          </IconButton>
          <IconButton>
            <CachedIcon />
          </IconButton>
        </Box>
        <Divider />
      </Box>

    </div>
  );
};

export default TweetPage;
