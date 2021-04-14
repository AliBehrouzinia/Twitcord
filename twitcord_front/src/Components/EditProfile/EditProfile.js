/* eslint-disable */

import React from "react";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import "./EditProfile.css";
import image from "../../assets/image.png";

const EditProfile = () => {
  return (
    <Grid container direction="column" className="root-container">
      <Grid item className="grid-item" xs={12} sm={10} md={8}>
            <img src={image} alt="img" className="profile_cover" />
          <Avatar className="avatar" />
      </Grid>

      <Grid container>
        <Grid item xs={1} sm={2} md={3} lg={4} />

        <Grid item xs={10} sm={8} md={6} lg={4}>
          <form autoComplete="off" className="form">
            <TextField
              className="text-field"
              label="User Name"
              disabled
              value="@alibehroozi"
              variant="outlined"
            />
            <TextField
              id="outlined-basic"
              className="text-field"
              label="Name"
              variant="outlined"
            />
            <TextField
              id="outlined-basic"
              className="text-field"
              label="BirthDay"
              variant="outlined"
            />
            <TextField
              id="outlined-basic"
              className="text-field"
              label="Website"
              variant="outlined"
            />
            <TextField
              id="outlined-basic"
              className="text-field"
              label="Bio"
              variant="outlined"
              multiline
              rows={4}
              rowsMax={8}
            />
          </form>
        </Grid>
        <Grid item xs={1} sm={2} md={3} lg={4} />
      </Grid>
    </Grid>
  );
};

export default EditProfile;
