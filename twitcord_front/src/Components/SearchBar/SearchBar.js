import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import './SearchBar.css';
import * as API from '../../Utils/API/index';
import {useDispatch} from 'react-redux';
import * as Actions from '../../redux/Actions/index.js';


export const SearchBar = () => {
  let userInput = '';
  const dispatch = useDispatch();

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      searchUser(userInput);
    }
  };

  const searchUser = (query, page=1) => {
    API.searchUsers({}, {query: query, page: page})
        .then((response) => {
          const data = response.data;
          dispatch(Actions.setUserSearchResults({
            users: data.results,
          }));
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
        onChange={(e)=>{
          userInput = e.target.value;
        }}
        className="input-base"
        placeholder="Search"/>
      <IconButton
        className="search-icon"
        type="submit"
        onClick={(event) => {
          searchUser(userInput);
        }}
        aria-label="search">
        <SearchIcon />
      </IconButton>
    </div> );
};
