import React from 'react';
import Grid from '@material-ui/core/Grid';
import './HomePage.css';
import TweetBox from '../TweetBox/TweetBox';
import {Divider} from '@material-ui/core';


const HomePage = () => {
  return (
    <Grid container className="hp-container">
      <Grid item xs>
        <TweetBox/>
        <Divider/>
      </Grid>
    </Grid>
  );
};

export default HomePage;
