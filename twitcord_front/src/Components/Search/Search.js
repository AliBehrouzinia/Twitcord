import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';
import {SearchBar} from '../SearchBar/SearchBar';


export const Search = () => {
  const [tabSelected, setSelectedTab] = React.useState(0);

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
    </div>
  );

  /* const searchUser = (query, page) => {
    API.searchUsers({}, {query: query, page: page})
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
        });
  };*/
};
