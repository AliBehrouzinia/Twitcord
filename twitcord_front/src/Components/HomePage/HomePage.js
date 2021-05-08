import React from 'react';
import Grid from '@material-ui/core/Grid';
import SideDrawer from '../HomePage/SideDrawer/SideDrawer.js';
import './HomePage.css';
import Typography from '@material-ui/core/Typography';
import TweetBox from '../TweetBox/TweetBox';
import {Divider} from '@material-ui/core';

const HomePage = () => {
  return (
    <Grid container className="hp-container">
      <Grid item xs={4} className="hp-side-left">
        <SideDrawer />
      </Grid>
      <Grid item xs>
        <TweetBox/>
        <Divider/>
      </Grid>
      <Grid item xs={12} md={4} className="hp-side-right">
        <Typography className="hp-suggestion">Suggestions</Typography>
      </Grid>
    </Grid>
  );
};

export default HomePage;
