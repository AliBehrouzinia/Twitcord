import React, {useEffect} from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';
import {SearchBar} from '../SearchBar/SearchBar';
import * as API from '../../Utils/API/index';


export const Search = () => {
  const [tabSelected, setSelectedTab] = React.useState(0);

  const handleChange = (event, selectedTab) => {
    setSelectedTab(selectedTab);
  };

  useEffect(() => {
    API.searchUsers({}, {query: 'a', page: 1})
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
        });
  });

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
};
