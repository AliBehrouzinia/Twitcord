import React, {useEffect} from 'react';
import Tweets from '../Tweets/Tweets';
import Grid from '@material-ui/core/Grid';
import './ProfileTweetlist.css';
import Divider from '@material-ui/core/Divider';
import * as API from '../../Utils/API/index';
import * as Constants from '../../Utils/Constants.js';
import {useDispatch} from 'react-redux';
import {useSelector} from 'react-redux';
import * as Actions from '../../redux/Actions/index.js';

const ProfileTweetlist = () => {
  const tweetInfo = useSelector((state) => state).tweet.tweetInfo;
  const dispatch = useDispatch();
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
          const d = data.data;
          console.log(data.data.results);
          dispatch(Actions.setTweetListInfo({
            tweetInfo: d.results,
          }));
          console.log(tweetInfo);
        })
        .catch((error) => {
          console.log(error);
        });
  }, []);

  return (
    <Grid container item className="tweetlist">
      {tweetInfo.map((tweet) => {
        return (
          <div key={tweet.id}>
            <Tweets
              id={tweet.id}
              name={tweet.first_name + ' ' + tweet.last_name}
              username={tweet.username}
              createDate={tweet.create_date}
              content={tweet.content}
              isPublic={tweet.is_public}
            />
            <Divider />
          </div>
        );
      })}
    </Grid>
  );
};


export default ProfileTweetlist;
