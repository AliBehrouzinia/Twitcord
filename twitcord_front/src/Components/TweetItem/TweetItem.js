import React, {useState} from 'react';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import {Icon} from '@material-ui/core';
import PropTypes from 'prop-types';
import Tooltip from '@material-ui/core/Tooltip';
import './TweetItem.css';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import CachedIcon from '@material-ui/icons/Cached';
import IconButton from '@material-ui/core/IconButton';
import {ReplyModal} from '../ReplyModal/ReplyModal';
import * as helper from '../../Utils/helper';
import {useHistory} from 'react-router-dom';
import Box from '@material-ui/core/Box';
import {Link} from 'react-router-dom';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import * as API from '../../Utils/API/index';


export const TweetItem = (props) => {
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [retweetCount, setRetweetCount] = useState(props.tweet?.retweet_count);
  const [isRetweeted, setIsRetweeted] = useState(props.tweet?.is_retweeted);
  const [retweetedId, setRetweetedId] = useState(props.tweet?.retweeted_id);

  const retweet = () => {
    API.createRetweet(props.tweet?.id, {'content': null}).then((res) => {
      setIsRetweeted(true);
      setRetweetCount(retweetCount+1);
      setRetweetedId(res.data.id);
    }).catch((error) => {
      console.log(error);
    });
  };

  const undoRetweet = () => {
    API.deleteTweet(retweetedId).then((res) => {
      setIsRetweeted(false);
      setRetweetCount(retweetCount-1);
    }).catch((error) => {
      console.log(error);
    });
  };

  const handleClickRetweetBtn = (event) => {
    setAnchorEl(event.currentTarget);
    setIsClosing(true);
  };

  const handleCloseRetweetBtn = () => {
    setAnchorEl(null);
  };

  const openReplyModal = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setIsClosing(true);
    setOpen(false);
  };

  const tweetClicked = (event) => {
    const links = document.getElementsByTagName('a');
    const buttons = document.getElementsByTagName('button');
    for (let i=0; i<links.length; i++) {
      if (links[i].contains(event.target)) {
        return;
      }
    }
    for (let i=0; i<buttons.length; i++) {
      if (buttons[i].contains(event.target)) {
        return;
      }
    }
    if (open) {
      return;
    }
    if (isClosing) {
      setIsClosing(false);
      return;
    }
    history.push('/tweet/'+props.tweet?.id);
  };

  return (
    <div className="tsi-hover pointer" onClick={tweetClicked}>
      <Grid container
        direction="row"
        spacing={6}
        className="m-0 w-100"
        justify="space-between">
        {props.tweet?.content !=null &&
        <Grid item xs={12} sm={9} md={10}>
          <div className="tsi-avatar-container">
            <Link to={'/profile/' + props.tweet?.user?.id}>
              <Avatar className="tsi-avatar" alt="avatar"/>
            </Link>
            <div className="tsi-username-container">
              <div className="tsi-name-container">
                <Link className="lh-0" to={'/profile/' + props.tweet?.user?.id}>
                  <Tooltip
                    title={props.tweet?.user?.first_name +
                       ' ' + props.tweet?.user?.last_name}
                    placement="top-start">
                    <Typography className="tsi-name" >
                      {props.tweet?.user?.first_name +
                       ' ' + props.tweet?.user?.last_name}</Typography>
                  </Tooltip>
                </Link>
                {!props.tweet?.user?.is_public &&
                 <Icon className="tsi-lock-icon">lock</Icon>}
                <Typography className="tsi-date">
                  <div className="tsi-dot"/>
                  {helper.extractTime(props.tweet?.create_date)}
                </Typography>
              </div>
              <Link to={'/profile/' + props.tweet?.user?.id}>
                <Tooltip title={'@'+props.tweet?.user?.username}
                  placement="top-start">
                  <Typography
                    className="tsi-username">@{props.tweet?.user?.username}
                  </Typography>
                </Tooltip>
              </Link>
            </div>
          </div>
        </Grid>}
        <Grid xs={12} item className="tsi-item-desc">
          <Typography className="tsi-desc">{props.tweet?.content}
            {props.tweet?.retweet_from && (
              <Box className={props.tweet?.content !=null ?
                'border-1 br-5 p-2 mt-3 retweet-hover':
                'mt-3'}>
                <Box display="flex">
                  <Link to={'/profile/' + props.tweet?.retweet_from?.user?.id}>
                    <Avatar className="tsi-avatar" alt="avatar"/>
                  </Link>
                  <Box display="flex" flexDirection="column" className="ml-2">
                    <Box display="flex" alignItems="center">
                      <Link className="lh-0" to={'/profile/' +
                      props.tweet?.retweet_from?.user?.id}>
                        <Tooltip
                          title={props.tweet?.retweet_from?.user?.first_name +
                            ' ' + props.tweet?.retweet_from?.user?.last_name}
                          placement="top-start">
                          <Typography className="tsi-name" >
                            {props.tweet?.retweet_from?.user?.first_name +
                            ' ' +
                              props.tweet?.retweet_from?.user?.last_name}
                          </Typography>
                        </Tooltip>
                      </Link>
                      <Typography className="tsi-date">
                        <div className="tsi-dot"/>
                        {helper.extractTime(
                            props.tweet?.retweet_from?.create_date)}
                      </Typography>
                    </Box>
                    <Link to={'/profile/' +
                     props.tweet?.retweet_from?.user?.id}>
                      <Tooltip title={
                        '@'+props.tweet?.retweet_from?.user?.username}
                      placement="top-start">
                        <Typography
                          className="tsi-username">
                            @{props.tweet?.retweet_from?.user?.username}
                        </Typography>
                      </Tooltip>
                    </Link>
                  </Box>
                </Box>
                <Box className="pl-avatar mt-2">
                  {props.tweet?.retweet_from?.content}
                </Box>
                <Box display="flex"
                  justifyContent="space-around"
                  className="px-3 py-1 mt-2 fs-12">
                  <div>
                    <IconButton className="mr-1">
                      {props.tweet?.retweet_from?.is_liked && <FavoriteIcon
                        color="secondary"/>}
                      {!props.tweet?.retweet_from?.is_liked &&
                      <FavoriteBorderIcon />}
                    </IconButton>
                    {props.tweet?.retweet_from?.like_count}
                  </div>
                  <div>
                    <IconButton className="mr-1" onClick={openReplyModal}>
                      <ChatBubbleOutlineIcon />
                    </IconButton>
                    {props.tweet?.retweet_from?.reply_count}
                  </div>
                  <div>
                    <IconButton
                      className="mr-1" onClick={handleClickRetweetBtn}>
                      {isRetweeted && <CachedIcon color="primary"/>}
                      {!isRetweeted && <CachedIcon/>}
                    </IconButton>
                    <Menu
                      id="retweet-menu"
                      anchorEl={anchorEl}
                      keepMounted
                      open={Boolean(anchorEl)}
                      onClose={handleCloseRetweetBtn}
                    >
                      {!isRetweeted &&
                       <MenuItem onClick={() => {
                         handleCloseRetweetBtn();
                         retweet();
                       }}>Retweet</MenuItem>}
                      {isRetweeted &&
                       <MenuItem onClick={() => {
                         handleCloseRetweetBtn();
                         undoRetweet();
                       }}>Undo Retweet</MenuItem>}
                      <MenuItem onClick={() => {
                        handleCloseRetweetBtn();
                        openReplyModal();
                      }}>Quote Retweet</MenuItem>
                    </Menu>
                    {retweetCount}
                  </div>
                </Box>
              </Box>
            )}
          </Typography>
        </Grid>

      </Grid>
      <Box display="flex"
        justifyContent="space-around" className="px-3 py-1 mt-2 fs-12">
        <div>
          <IconButton className="mr-1">
            {props.tweet?.is_liked && <FavoriteIcon color="secondary"/>}
            {!props.tweet?.is_liked && <FavoriteBorderIcon />}
          </IconButton>
          {props.tweet?.like_count}
        </div>
        <div>
          <IconButton className="mr-1" onClick={openReplyModal}>
            <ChatBubbleOutlineIcon />
          </IconButton>
          {props.tweet?.reply_count}
        </div>
        <div>
          <IconButton className="mr-1" onClick={handleClickRetweetBtn}>
            {isRetweeted && <CachedIcon color="primary"/>}
            {!isRetweeted && <CachedIcon/>}
          </IconButton>
          <Menu
            id="retweet-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleCloseRetweetBtn}
          >
            {!isRetweeted &&
             <MenuItem onClick={() => {
               handleCloseRetweetBtn();
               retweet();
             }}>Retweet</MenuItem>}
            {isRetweeted &&
             <MenuItem onClick={() => {
               handleCloseRetweetBtn();
               undoRetweet();
             }}>Undo Retweet</MenuItem>}
            <MenuItem onClick={() => {
              handleCloseRetweetBtn();
              openReplyModal();
            }}>Quote Retweet</MenuItem>
          </Menu>
          {retweetCount}
        </div>
      </Box>
      <ReplyModal tweet={props.tweet} open={open} onClose={handleClose} />
    </div>
  );
};

TweetItem.propTypes = {
  tweet: PropTypes.object,
};
