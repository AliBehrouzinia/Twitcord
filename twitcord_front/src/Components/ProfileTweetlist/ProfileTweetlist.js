/* eslint-disable */
import React, { useEffect, useState } from 'react';
import Tweets from '../Tweets/Tweets';
import Grid from '@material-ui/core/Grid';
import './ProfileTweetlist.css';
import Divider from '@material-ui/core/Divider';
import * as API from '../../Utils/API/index';
import * as Constants from '../../Utils/Constants.js';


const ProfileTweetlist = () => {
  const [Tweets, setTweets] = useState([]);

  let profileId = -1;
  const userGeneralInfo = JSON.parse(
      localStorage.getItem(Constants.GENERAL_USER_INFO),
  );
  if (userGeneralInfo != null) {
    profileId = userGeneralInfo.pk;
  }
  useEffect(() => {
    API.tweetlist({id: profileId})
        .then((data) => {
          console.log(data);
          setTweets(data.data.results);
        })
        .catch((error) => {
          console.log(error);
        });
  });
  return (
    <div>
      <Grid container item className="tweetlist">
        <Grid xs={12} md={8}>
          {tweets.map((tweet) => {
            return (
              <div key={Tweet.id}>
                <Tweets
                  id={Tweet.id}
                  name={Tweet.first_name + ' ' + tweet.last_name}
                  username={Tweet.username}
                  createDate={Tweet.create_date}
                  content={Tweet.content}
                  isPublic={Tweet.is_public}
                />
                <Divider />
              </div>
            );
          })}
        </Grid>
      </Grid>
    </div>
  );
};


export default ProfileTweetlist;
