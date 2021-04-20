import React, {useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import './EditProfile.css';
import image from '../../assets/image.png';
import {Formik, Form, Field} from 'formik';
import {Button} from '@material-ui/core';
import {TextField} from 'formik-material-ui';
import {DatePicker} from 'formik-material-ui-pickers';
import {MuiPickersUtilsProvider} from '@material-ui/pickers';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import DateFnsUtils from '@date-io/date-fns';
import * as API from '../../Utils/API/index';
import * as Actions from '../../redux/Actions/index';

const EditProfile = () => {
  const profileInfo = useSelector((state) => state).tweet.profileInfo;
  const dispatch = useDispatch();

  useEffect(() => {
    requestProfileInfo(dispatch);
  }, []);

  return (
    <Grid container direction="column">
      <Grid item className="grid-item" xs={12} sm={10} md={8}>
        <img src={image} alt="img" className="profile_cover" />
        <Avatar className="avatar" />
      </Grid>

      <Grid container>
        <Grid item xs={1} sm={2} md={3} lg={4} />

        <Grid item xs={10} sm={8} md={6} lg={4}>
          <Formik
            enableReinitialize
            initialValues={{
              username: profileInfo.username || '',
              firstName: profileInfo.firstName || '',
              lastName: profileInfo.lastName || '',
              website: profileInfo.website || '',
              bio: profileInfo.bio || '',
              birthday: Date.parse(profileInfo.birthday) || '',
            }}
            validate={(values) => {
              const errors = {};
              if (!values.firstName) {
                errors.firstName = 'Required';
              }

              if (!values.lastName) {
                errors.lastName = 'Required';
              }

              if (
                values.website &&
                !values.website.match(
                    '^(https?://)?(www\\.)?([-a-z0-9]{1,63}\\.)*?[a-z0-9]'+
                    '[-a-z0-9]{0,61}[a-z0-9]\\.[a-z]{2,6}(/[-\\w@\\+\\.~#'+
                    '\\?&/=%]*)?$',
                )
              ) {
                errors.website = 'Invalid Url';
              }

              return errors;
            }}
            onSubmit={(values, {setSubmitting}) => {
              setSubmitting(false);
              onSubmitClicked(dispatch, profileInfo, values);
            }}
          >
            {({submitForm, isSubmitting}) => (
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Form className="form">
                  <Field
                    component={TextField}
                    className="text-field"
                    label="User Name"
                    disabled
                    variant="outlined"
                    name="username"
                  />

                  <Field
                    component={TextField}
                    className="text-field"
                    label="First Name"
                    variant="outlined"
                    name="firstName"
                  />

                  <Field
                    component={TextField}
                    className="text-field"
                    label="Last Name"
                    variant="outlined"
                    name="lastName"
                  />

                  <Field
                    component={DatePicker}
                    className="text-field"
                    variant="outlined"
                    name="birthday"
                    label="Birth Day"
                    maxDate={new Date()}
                  />

                  <Field
                    component={TextField}
                    className="text-field"
                    label="Website"
                    variant="outlined"
                    name="website"
                  />

                  <Field
                    component={TextField}
                    className="text-field"
                    label="Bio"
                    variant="outlined"
                    name="bio"
                    multiline
                    rows={4}
                  />

                  <Button
                    variant="contained"
                    className="text-field"
                    color="primary"
                    disabled={isSubmitting}
                    onClick={submitForm}
                  >
                    Submit
                  </Button>
                </Form>
              </MuiPickersUtilsProvider>
            )}
          </Formik>
        </Grid>
        <Grid item xs={1} sm={2} md={3} lg={4} />
      </Grid>
    </Grid>
  );
};

const requestProfileInfo = (dispatch) => {
  API.getProfileInfo({id: 2})
      .then((response) => {
        handleProfileInfoResponse(dispatch, response.data);
      })
      .catch((error) => {
      });
};

const handleProfileInfoResponse = (dispatch, data) => {
  saveProfileInfo(dispatch, data);
};

const saveProfileInfo = (dispatch, data) => {
  console.log(data);
  dispatch(Actions.setProfileInfo({
    bio: data.bio,
    birthday: data.birth_date,
    firstName: data.first_name,
    lastName: data.last_name,
    website: data.website,
    username: data.username,
  }));
};

const onSubmitClicked = (dispatch, profileInfo, data) => {
  if (typeof(data.birthday) === 'number') {
    data.birthday = profileInfo.birthday;
  }

  const isDataChanged = checkDataChanged(profileInfo, data);

  if (isDataChanged) {
    const dataToSend = {
      bio: data.bio,
      birth_date: data.birthday,
      first_name: data.firstName,
      last_name: data.lastName,
      website: data.website,
      username: data.username,
    };

    API.updateProfileInfo(2, dataToSend)
        .then((response) => {
          saveProfileInfo(dispatch, response.data);
          console.log(response);
        }).catch((error) => {
          console.log(error);
        });
  } else {
    console.log('no changes');
  }
};

const checkDataChanged = (profileInfo, data) => {
  if (data.firstName !== profileInfo.firstName) {
    return true;
  }

  if (data.lastName !== profileInfo.lastName) {
    return true;
  }

  if (data.birthday !== profileInfo.birthday) {
    return true;
  }

  if (data.bio !== profileInfo.bio) {
    return true;
  }

  if (data.website !== profileInfo.website) {
    return true;
  }
  return false;
};

export default EditProfile;
