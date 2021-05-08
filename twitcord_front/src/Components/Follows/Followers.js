import "./Follow.css";
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import * as API from '../../Utils/API/index';
import * as Constants from '../../Utils/Constants.js';

/* eslint-disable require-jsdoc */
const Followers = () => {
  var profileId = -1;
	const userGeneralInfo = JSON.parse(localStorage.getItem(Constants.GENERAL_USER_INFO));
	if (userGeneralInfo != null) {
		profileId = userGeneralInfo.pk;
	}
	const [FollowList, setFollowList] = React.useState([{}]);

	useEffect(() => {
		API.followerslist({ id: profileId })
			.then((response) => {
				setFollowList (response.data);
				console.log(FollowList);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	return (
		<List className="root">
			{FollowList.map((postdetail, index) => {
				return (
          <div key={index} >
					<ListItem alignItems="flex-start" >
						<ListItemAvatar>
              
							<Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
						</ListItemAvatar>
						<ListItemText
							primary={postdetail.username}             
							secondary={
								<React.Fragment>
									<Typography component="span" variant="body2" className="inline" color="textPrimary" >
										{postdetail.first_name+postdetail.last_name}
									</Typography>
									{" — " + postdetail.type + '\n' + postdetail.email}
								</React.Fragment>
							}
						/>
					</ListItem>
          <Divider variant="inset" component="li" />
          </div>
				);
			})}
		</List>
	);
};
export default Followers;