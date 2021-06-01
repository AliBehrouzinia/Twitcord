import React, {useState} from 'react';
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
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';


const TweetPage = () => {
  const params = useParams();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClickMoreBtn = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMoreBtn = () => {
    setAnchorEl(null);
  };

  const handleBack = () => {

  };

  console.log(params['id']);
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
          <Box display="flex" justifyContent="space-between">
            <Box display="flex">
              <Avatar alt={'username'} title={'username'}
                className="w-48 h-48"
                src="/static/images/avatar/1.jpg" />
              <Box display="flex" flexDirection="column" justifyContent="center"
                className="ml-2">
                <Box className="b-600">{'firsname lastname'}</Box>
                <Box className="text-gray mt-1">{'@username'}</Box>
              </Box>
            </Box>
            <IconButton onClick={handleClickMoreBtn}>
              <MoreVertIcon /></IconButton>
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
            {<>this is the content of the tweet
            this is content of the tweet
             this content of the tweet this content of the tweet
             this content of the tweet
             this content of the tweetthis content of the tweet </>}
          </Box>
          <Box className="mt-4 text-gray fs-14">{'2021 May 24 '}</Box>
          <Divider className="mt-3"/>
          <Box display="flex" className="py-3">
            <Box>{2} <Box component="span"
              className="text-gray">Retweets</Box></Box>
            <Box className="ml-5">{21} <Box component="span"
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
