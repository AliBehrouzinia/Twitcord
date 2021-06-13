import React, {useEffect, useState} from 'react';
import {TweetSearchItem} from '../TweetSearchItem/TweetSearchItem';
import Grid from '@material-ui/core/Grid';
import './TimeLine.css';
import Divider from '@material-ui/core/Divider';
import * as API from '../../Utils/API/index';
import * as Constants from '../../Utils/Constants.js';

const TimeLine = () => {
  const [tweetInfo, setTweetInfo] = useState(null);
  let profileId = -1;
  const userGeneralInfo = JSON.parse(
      localStorage.getItem(Constants.GENERAL_USER_INFO),
  );
  if (userGeneralInfo != null) {
    profileId = userGeneralInfo.pk;
  }
  useEffect(() => {
    console.log('aidoong');
    API.timeLine({id: profileId})
        .then((data) => {
          console.log(data);
          setTweetInfo(data.data.results);
          console.log('data', data.data.results);
        })
        .catch((error) => {
          console.log(error);
        });
    console.log('tweetInfo', tweetInfo);
  }, []);

  return (
    <Grid container item className="timeLine">
      {tweetInfo ===[] ?tweetInfo.map((tweet) => {
        return (
          <div key={tweet.id}>
            <TweetSearchItem
              id={tweet.id}
              name={tweet.first_name + ' ' + tweet.last_name}
              username={tweet.username}
              createDate={tweet.create_date}
              content={tweet.tweet.content}
              isPublic={tweet.is_public}
              is_liked={tweet.tweet_is_liked}
            />
            <Divider />
          </div>
        );
      }):null}
    </Grid>
  );
};


export default TimeLine;
