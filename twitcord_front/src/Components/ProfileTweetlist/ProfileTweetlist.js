/* eslint-disable */
import React, { useEffect, useState } from 'react';
import Tweets from '../Tweets/Tweets';
import Grid from '@material-ui/core/Grid';
import './ProfileTweetlist.css';
import Divider from '@material-ui/core/Divider';
import * as API from '../../Utils/API/index';
import * as Constants from '../../Utils/Constants.js';


const ProfileTweetlist = (props) => {
    const [tweets, setTweets] = useState([]);

    let profileId = -1;
    const userGeneralInfo = JSON.parse(
        localStorage.getItem(Constants.GENERAL_USER_INFO),
    );
    if (userGeneralInfo != null) {
        profileId = userGeneralInfo.pk;
    }
    useEffect(() => {

        console.log(tweets)

        API.tweetlist({ id: profileId })
            .then((data) => {
                console.log(data)
                setTweets(data.data.results)
            })
            .catch((error) => {
                console.log('failed to load data');
            });

    });


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
