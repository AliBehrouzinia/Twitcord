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
import {ReplyModal} from '../ReplyModal/ReplyModal';
import {TweetSearchItem} from '../TweetSearchItem/TweetSearchItem';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const TweetPage = () => {
  const params = useParams();
  const [anchorEl, setAnchorEl] = useState(null);
  const [tweet, setTweet] = useState({});
  const [open, setOpen] = useState(false);
  const [snackOpen, setSnackOpen] = useState(false);

  const openReplyModal = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(()=>{
    API.getTweet(params.id).then((res)=> {
      setTweet({...res.data, name: res.data.first_name +
         ' ' + res.data.last_name});
    }).catch((error)=>{
      setSnackOpen(true);
    });
  }, []);

  const handleClickMoreBtn = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMoreBtn = () => {
    setAnchorEl(null);
  };

  const handleBack = () => {
    window.history.back();
  };

  return (
    <div>
      <Snackbar
        open={snackOpen}
        onClose={()=>setSnackOpen(false)}
        autoHideDuration={3000}
      >
        <MuiAlert elevation={6} variant="filled"
          onClose={()=> setSnackOpen(false)} severity="error">
        Problem loading the tweet page
        </MuiAlert>
      </Snackbar>
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
              <Avatar alt={tweet.username}
                title={tweet.username}
                className="w-48 h-48"
                src="/static/images/avatar/1.jpg" />
              <Box display="flex" flexDirection="column" justifyContent="center"
                className="ml-2">
                <Box className="b-600">
                  {tweet.name}
                </Box>
                <Box className="text-gray mt-1">
                  {'@' + tweet.username}</Box>
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
            {tweet.content}
          </Box>
          <Box className="mt-4 text-gray fs-14">
            {helper.extractTime(tweet.create_date)}</Box>
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
          <IconButton onClick={openReplyModal}>
            <ChatBubbleOutlineIcon />
          </IconButton>
          <IconButton>
            <CachedIcon />
          </IconButton>
        </Box>
        <Divider />
      </Box>
      {tweet.children?.map((child) => (
        <Box key={child.id}>
          <TweetSearchItem
            id={child.id}
            name={child.first_name + ' ' + child.last_name}
            username={child.username}
            createDate={child.create_date}
            content={child.content}
            userId={child.user}
            profileImg={child.profile_img}
            isPublic={child.is_public}/>
          <Divider />
        </Box>
      ))}
      <ReplyModal tweet={tweet} open={open} onClose={handleClose} />
    </div>
  );
};

export default TweetPage;
