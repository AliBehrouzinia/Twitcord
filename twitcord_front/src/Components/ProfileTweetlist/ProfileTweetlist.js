import React, { useEffect } from 'react';
import Tweets from '../Tweets/Tweets';
import Grid from '@material-ui/core/Grid';
import './ProfileTweetList.css';
import { useDispatch } from 'react-redux';
import Divider from '@material-ui/core/Divider';
import { useSelector } from 'react-redux';
import * as API from '../../Utils/API/index';
import * as Actions from '../../redux/Actions/index.js';
import * as Constants from '../../Utils/Constants.js';

const ProfileTweetlist = () => {
    const tweets = useSelector((state) => state).tweet.tweetInfo;
    const dispatch = useDispatch();
    const tweetlist = () => {
        API.tweetlist({ id: profileid })
            .then((response) => {
                const data = response.data;
                dispatch(Actions.setTweetListInfo(response.data));
            })
            .catch((error) => {
            });
    };
    return (
        <Grid container item className="tweetlist">
            <Grid xs={12} md={8}>
                {
                    tweets.map(
                        (tweet) => <div key={tweet.id}>
                            <Tweets
                                id={tweet.id}
                                name={tweet.first_name + ' ' + tweet.last_name}
                                username={tweet.username}
                                createDate={tweet.create_date}
                                content={tweet.content}
                                userId={tweet.user}
                                isPublic={tweet.is_public} />
                            <Divider />
                        </div>,
                    )
                }
            </Grid>

        </Grid>
    );
};


export default ProfileTweetlist;