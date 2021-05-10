/* eslint-disable */
import React, { useEffect, useState } from 'react';
import Tweets from '../Tweets/Tweets';
import Grid from '@material-ui/core/Grid';
import './ProfileTweetlist.css';
import { useDispatch } from 'react-redux';
import Divider from '@material-ui/core/Divider';
import { useSelector } from 'react-redux';
import * as API from '../../Utils/API/index';
import * as Actions from '../../redux/Actions/index.js';
import * as Constants from '../../Utils/Constants.js';
import axios from "axios";

const ProfileTweetlist = (props) => {
    // const tweets = useSelector((state) => state).tweet.tweetInfo;
    const [tweets, setTweets] = useState([]);
    // const dispatch = useDispatch();
    let profileId = -1;
    const userGeneralInfo = JSON.parse(
        localStorage.getItem(Constants.GENERAL_USER_INFO),
    );
    if (userGeneralInfo != null) {
        profileId = userGeneralInfo.pk;
    }
    useEffect(() => {
        tweetlist(profileId)
        // Run! Like go get some data from an API.
    });
    const tweetlist = (id) => {

        // API.tweetlist({ id: profileid })
        //     .then((response) => {
        //         const data = response.data;
        //         dispatch(Actions.setTweetListInfo(response.data));
        //     })
        //     .catch((error) => {
        //     });

        console.log(tweets)

        axios.get("http://127.0.0.1:8000" + `/tweets/${id}/`).then(data => {
            console.log(data)
            setTweets(data.data.results)
        }




        )
    };
    return (
        <div>
            <Grid container item className="tweetlist">
                <Grid xs={12} md={8}>
                    {
                        tweets.map(
                            (tweet) => {
                                return ((<div key={tweet.id}>
                                    <Tweets
                                        id={tweet.id}
                                        name={tweet.first_name + ' ' + tweet.last_name}
                                        username={tweet.username}
                                        createDate={tweet.create_date}
                                        content={tweet.content}
                                        isPublic={tweet.is_public} />
                                    <Divider />
                                </div>))
                            })

                    }
                </Grid>

            </Grid>
        </div>
    );
};


export default ProfileTweetlist;
