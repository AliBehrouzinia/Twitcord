import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';
import {useSelector} from 'react-redux';
import {SearchBar} from '../SearchBar/SearchBar';
import Divider from '@material-ui/core/Divider';
import {UserSearchItem} from '../UserSearchItem/UserSearchItem';


export const Search = () => {
  const users = useSelector((state) => state).tweet.userSearchResult;
  const [tabSelected, setSelectedTab] = React.useState(0);

  const userResult = users.map(
      (user) => <div key={user.id}>
        <UserSearchItem
          name={user.first_name + ' ' + user.last_name}
          username={user.username}
          desc={user.desc}
          isPublic={user.is_public}/>
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
          <Tab label="users" />
          <Tab label="tweets" />
        </Tabs>
      </Paper>
      {tabSelected == 0 && userResult }
    </div>
  );
};
