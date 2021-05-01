import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import Paper from '@material-ui/core/Paper';
import SearchIcon from '@material-ui/icons/Search';
import './SearchBar.css';

export const SearchBar = () => {
  return (
    <Paper
      component="form"
      className="root">
      <InputBase
        className="input-base"
        placeholder="Search"/>
      <IconButton
        className="search-icon"
        type="submit"
        aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper> );
};
