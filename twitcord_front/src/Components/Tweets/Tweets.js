/* eslint-disable */
import React, { Component } from 'react';
import './Tweets.css';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import ChatBubbleOutlineOutlinedIcon from '@material-ui/icons/ChatBubbleOutlineOutlined';
import CachedOutlinedIcon from '@material-ui/icons/CachedOutlined';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { Icon } from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip';

const monthNumberToLabelMap = {
    [1]: 'January',
    [2]: 'February',
    [3]: 'March',
    [4]: 'April',
    [5]: 'May',
    [6]: 'June',
    [7]: 'July',
    [8]: 'August',
    [9]: 'September',
    [10]: 'October',
    [11]: 'November',
    [12]: 'December',
};

export const Tweets = (props) => {

    const dispatch = useDispatch();
    const tweetInfo = useSelector((state) => state).tweet.tweetInfo;


    const dhm = (t) => {
        const cd = 24 * 60 * 60 * 1000;
        const ch = 60 * 60 * 1000;
        let d = Math.floor(t / cd);
        let h = Math.floor((t - d * cd) / ch);
        let m = Math.round((t - d * cd - h * ch) / 60000);
        const pad = function (n) {
            return n < 10 ? 0 + n : n;
        };
        if (m === 60) {
            h++;
            m = 0;
        }
        if (h === 24) {
            d++;
            h = 0;
        }
        return [d, pad(h), pad(m)];
    };

    const extractTime = (dateString) => {
        let showingDate = 'now';

        const date = new Date(dateString);
        const currentDate = new Date();
        const dateInMillies = date.getTime();
        const currentDateInMillies = currentDate.getTime();
        const diffInMillies = currentDateInMillies - dateInMillies;

        const dhmResult = dhm(diffInMillies);
        const diffDays = dhmResult[0];
        const diffHours = dhmResult[1];
        const diffMins = dhmResult[2];

        if (diffHours < 1 && diffDays < 1 && diffMins > 0) {
            showingDate = diffMins + ' m';
        }

        if (diffDays < 1 && diffHours > 0) {
            showingDate = diffHours + ' h';
        }

        if (date.getDate() < currentDate.getDate()) {
            showingDate = date.getFullYear() +
                ' ' + (monthNumberToLabelMap[date.getMonth() + 1]) +
                ' ' + date.getDate();
        }

        return showingDate;
    };





    // useEffect(() => {
    //     API.tweetlist({ id: 1 })
    //         .then((response) => {
    //             console.log(response.data);
    //             dispatch(Actions.setTweetListInfo(response.data));
    //         })
    // }, []);

    return (
        <Grid container
            direction="row"
            spacing={6}
            className="container"
            justify="space-between">
            <Grid item xs={6} sm={4} md={5}>
                <div className="avatar-container">
                    <Avatar className="avatar" alt="avatar" />
                    <div className="username-container">
                        <div className="name-container">
                            <Tooltip title={props.name} placement="top-start">
                                <Typography className="name" >{props.name}</Typography>
                            </Tooltip>
                            {!props.isPublic && <Icon className="lock-icon">lock</Icon>}
                            <Typography className="date">
                                <div className="dot" />
                                {extractTime(props.createDate)}
                            </Typography>
                        </div>
                        <Tooltip title={'@' + props.username} placement="top-start">
                            <Typography className="username">@{props.username}
                            </Typography>
                        </Tooltip>
                    </div>
                </div>
            </Grid>

            <Grid xs={12} item className="item-desc">
                <Typography className="desc">{props.content}</Typography>
            </Grid>

            <Grid xs={12} container item className="icon-bottom-bar">
                <Grid item>
                    <IconButton className="like" aria-label="like">
                        <FavoriteBorderOutlinedIcon />
                    </IconButton>
                </Grid>

                <Grid item>
                    <IconButton>
                        <CachedOutlinedIcon />
                    </IconButton>
                </Grid>

                <Grid item>
                    <IconButton>
                        <ChatBubbleOutlineOutlinedIcon />
                    </IconButton>
                </Grid>
            </Grid>
        </Grid>

    );
};

Tweets.propTypes = {
    name: PropTypes.string,
    username: PropTypes.string,
    content: PropTypes.string,
    isPublic: PropTypes.bool,
    createDate: PropTypes.string,
};

export default Tweets;