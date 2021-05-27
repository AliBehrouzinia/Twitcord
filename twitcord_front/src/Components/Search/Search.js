/* eslint-disable max-len */
import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';
import {useSelector} from 'react-redux';
import {SearchBar} from '../SearchBar/SearchBar';
import Divider from '@material-ui/core/Divider';
import {UserSearchItem} from '../UserSearchItem/UserSearchItem';
import {TweetSearchItem} from '../TweetSearchItem/TweetSearchItem';
import * as Constants from '../../Utils/Constants.js';

const Search = () => {
  const users = useSelector((state) => state).tweet.userSearchResult;
  const tweets = useSelector((state) => state).tweet.tweetSearchResult;
  let profileId = -1;
  const userGeneralInfo = JSON.parse(localStorage.getItem(Constants.GENERAL_USER_INFO));
  if (userGeneralInfo != null) {
    profileId = userGeneralInfo.pk;
  }
  const [tabSelected, setSelectedTab] = React.useState(0);

  const getFollowStatus = (status) => {
    switch (status) {
      case 'not following':
        return Constants.STATUS_FOLLOW;
      case 'following':
        return Constants.STATUS_FOLLOWING;
      case 'pending':
        return Constants.STATUS_REQUESTED;
    }
  };

  const userResult = users.map(
      (user) => user.id !== profileId ? <div key={user.id}>
        <UserSearchItem
          name={user.first_name + ' ' + user.last_name}
          username={user.username}
          bio={user.bio}
          followState={user.status}
          isPublic={user.is_public}
          id={user.id}
          status= {getFollowStatus(user.status)}/>
        <Divider />
      </div> : <div></div>,
  );

  const tweetResult = tweets.map(
      (tweet) => <div key={tweet.id}>
        <TweetSearchItem
          id={tweet.id}
          name={tweet.first_name + ' ' + tweet.last_name}
          username={tweet.username}
          createDate={tweet.create_date}
          content={tweet.content}
          userId={tweet.user}
          profileImg={tweet.profile_img}
          isPublic={tweet.is_public}/>
        <Divider />
      </div>,
  );

  const handleChange = (event, selectedTab) => {
    setSelectedTab(selectedTab);
  };

  return (
    <div>
      <Paper square>
        <SearchBar/>
        <Tabs
          variant="fullWidth"
          value={tabSelected}
          indicatorColor="primary"
          onChange={handleChange}
          textColor="primary"
          aria-label="disabled tabs example"
        >
          <Tab id="tab-users" label="users" />
          <Tab id="tab-tweets" label="tweets" />
        </Tabs>
      </Paper>
      {tabSelected == 0 && userResult }
      {tabSelected == 1 && tweetResult }
    </div>
  );
};

export default Search;
