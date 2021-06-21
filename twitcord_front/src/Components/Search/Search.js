import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';
import {useSelector} from 'react-redux';
import {SearchBar} from '../SearchBar/SearchBar';
import Divider from '@material-ui/core/Divider';
import {UserSearchItem} from '../UserSearchItem/UserSearchItem';
import {TweetItem} from '../TweetItem/TweetItem';
import {Link} from 'react-router-dom';


const Search = () => {
  const users = useSelector((state) => state).tweet.userSearchResult;
  const tweets = useSelector((state) => state).tweet.tweetSearchResult;

  const [tabSelected, setSelectedTab] = React.useState(0);

  const userResult = users.map(
      (user) => <div key={user.id}>
        <Link to={'/profile/'+user.id}>
          <UserSearchItem
            name={user.first_name + ' ' + user.last_name}
            username={user.username}
            bio={user.bio}
            profileImg={user.profile_img}
            followState={user.status}
            isPublic={user.is_public}/>
        </Link>
        <Divider />
      </div>,
  );

  const tweetResult = tweets.map(
      (tweet) => <div key={tweet.id}>
        <TweetItem
          tweet={tweet}/>
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
