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
              alert(JSON.stringify(values, null, 2));
            }}
          >
            {({submitForm, isSubmitting}) => (
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Form className="form">
                  <Field
                    component={TextField}
                    className="text-field"
                    label="User Name"
                    value={profileInfo.username || ''}
                    disabled
                    variant="outlined"
                    name="username"
                  />

                  <Field
                    component={TextField}
                    className="text-field"
                    label="First Name"
                    variant="outlined"
                    value={profileInfo.firstName || '1'}
                    name="firstName"
                  />

                  <Field
                    component={TextField}
                    className="text-field"
                    label="Last Name"
                    variant="outlined"
                    value={profileInfo.lastName || ''}
                    name="lastName"
                  />

                  <Field
                    component={DatePicker}
                    className="text-field"
                    variant="outlined"
                    name="birthday"
                    label="Birth Day"
                    value={profileInfo.birthday || ''}
                    maxDate={new Date()}
                  />

                  <Field
                    component={TextField}
                    className="text-field"
                    label="Website"
                    variant="outlined"
                    value={profileInfo.website || ''}
                    name="website"
                  />

                  <Field
                    component={TextField}
                    className="text-field"
                    label="Bio"
                    variant="outlined"
                    name="bio"
                    value={profileInfo.bio || ''}
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
  console.log(data);
  dispatch(Actions.setProfileInfo(data));
};

export default EditProfile;
