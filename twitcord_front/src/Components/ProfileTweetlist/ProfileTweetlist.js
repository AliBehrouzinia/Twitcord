import react,{useEffect} from 'react';
import React, { Component } from 'react';
import './ProfileTweetlist.css'
import * as Constants from '../../Utils/Constants.js';
import * as API from '../../Utils/API/index';
import * as Actions from '../../redux/Actions/index.js';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ChatBubbleTwoToneIcon from '@material-ui/icons/ChatBubbleTwoTone';

import Grid from '@material-ui/core/Grid';

const ProfileTweetlist = () => {
    
    const dispatch = useDispatch();
    const tweetInfo = useSelector((state) => state).tweet.tweetInfo;
  
    const monthNumberToLabelMap = {
        [1]: 'January',
        [2]: 'February',
        [3]: 'March',
        [4]: 'April',
        [5]: 'May',
        [6]: 'June',
        [7]: 'July',
        [8]: 'August',
        [9]: 'September',
        [10]: 'October',
        [11]: 'November',
        [12]: 'December',
      };

      useEffect(() => {
        API.tweetlist({id: 1})
            .then((response) => {
              console.log(response.data);
              dispatch(Actions.setTweetListInfo(response.data));
            })
        }, []);
        const date = new Date(tweetInfo.dateTwee);
        const year = date.getFullYear();
        const month = date.getMonth()+1;
        const dt = date.getDate();
    return (
        <Grid container className="tweetlist">
            <Grid item xs={12}>
                <card>
                    <CardHeader>
                        <text className="grid-username" > username
                     
                        {ProfileTweetlist.username}
                    </text>
                     <text className="grid-name" > name
                    
                        {ProfileTweetlist.name}
                    </text> 
                        <text className="grid-joined" > joined
           
                         { '    '+dt + '    ' + monthNumberToLabelMap[month]}
                    </text>


                    </CardHeader>

                    <CardContent>
                        <div className="text">
                            
                        </div>
                     
                    </CardContent>
                    <CardActions disableSpacing>
                        <Grid item  xs={1} sm={1}>
                        <IconButton aria-label="like">
                            <FavoriteIcon />
                        </IconButton>
                        <IconButton aria-label="share">
                            <ShareIcon />
                        </IconButton>
                        <IconButton aria-label="comment">
                            <ChatBubbleTwoToneIcon />
                        </IconButton>
                        <IconButton aria-label="share">
                            <ShareIcon />
                        </IconButton>
                        </Grid>
                    
                    </CardActions>


                </card>
            </Grid>
        </Grid>
    );
};
export default ProfileTweetlist;