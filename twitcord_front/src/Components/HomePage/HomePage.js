import React from 'react';
import Grid from '@material-ui/core/Grid';
import  SideDrawer from '../HomePage/SideDrawer/SideDrawer.js';
import './HomePage.css'
import Typography from '@material-ui/core/Typography';
import TweetBox from '../TweetBox/TweetBox'

const HomePage = () => {

    return(
        <Grid container className="hp-container">
            <Grid item xs={3} className="hp-side-left">
                <SideDrawer />
            </Grid>
            <Grid item xs>
                                
            </Grid>
            <Grid item xs={12} md={3} className="hp-side-right">
                <Typography className="hp-suggestion">Suggestions</Typography>
            </Grid>
        </Grid>
    )
}

export default HomePage;