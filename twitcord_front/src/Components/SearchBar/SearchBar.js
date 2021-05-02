import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import './SearchBar.css';
import * as API from '../../Utils/API/index';


export const SearchBar = () => {
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      searchUser(event.target.value);
    }
  };

  const searchUser = (query, page=1) => {
    API.searchUsers({}, {query: query, page: page})
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
        });
  };

  return (
    <div
      component="form"
      className="root">
      <InputBase
        onKeyDown={handleKeyDown}
        className="input-base"
        placeholder="Search"/>
      <IconButton
        className="search-icon"
        type="submit"
        onClick={(event) => {
          searchUser(event.target.value);
        }}
        aria-label="search">
        <SearchIcon />
      </IconButton>
    </div> );
};
