import React, {useEffect, useState} from 'react';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import './EditProfile.css';
import {Formik, Form, Field} from 'formik';
import {Button} from '@material-ui/core';
import {TextField, CheckboxWithLabel} from 'formik-material-ui';
import {DatePicker} from 'formik-material-ui-pickers';
import {MuiPickersUtilsProvider} from '@material-ui/pickers';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import DateFnsUtils from '@date-io/date-fns';
import * as API from '../../Utils/API/index';
import * as Actions from '../../redux/Actions/index';
import FormGroup from '@material-ui/core/FormGroup';
import * as Constants from '../../Utils/Constants.js';
import SnackbarAlert from '../Snackbar/Snackbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import AddAPhotoOutlinedIcon from '@material-ui/icons/AddAPhotoOutlined';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import minioClient from '../../Utils/Minio';

const EditProfile = () => {
  const [snackbarAlertMessage, setSnackbarAlertMessage] = useState('');
  const [snackbarAlertSeverity, setSnackbarAlertSeverity] = useState('');
  const isSnackbarOpen = useSelector((state) => state).tweet.isSnackbarOpen;
  const profileInfo = useSelector((state) => state).tweet.profileInfo;
  let photoInput;
  let coverInput;
  let coverPath = null;
  let photoPath = null;

  let profileId = -1;
  const userGeneralInfo = JSON.parse(
      localStorage.getItem(Constants.GENERAL_USER_INFO),
  );
  if (userGeneralInfo != null) {
    profileId = userGeneralInfo.pk;
  }
  const dispatch = useDispatch();

  const requestProfileInfo = (
      dispatch,
      setSnackbarAlertMessage,
      setSnackbarAlertSeverity,
  ) => {
    API.getProfileInfo({id: profileId})
        .then((response) => {
          handleProfileInfoResponse(dispatch, response.data);
        })
        .catch((error) => {
          showSnackbar(
              Constants.EDIT_PROFILE_FETCH_PROFILE_ERROR_MESSAGE,
              Constants.SNACKBAR_ERROR_SEVERITY,
              dispatch,
              setSnackbarAlertMessage,
              setSnackbarAlertSeverity,
          );
        });
  };

  const showSnackbar = (
      message,
      severity,
      dispatch,
      setSnackbarAlertMessage,
      setSnackbarAlertSeverity,
  ) => {
    setSnackbarAlertMessage(
        message);
    setSnackbarAlertSeverity(
        severity);
    dispatch(
        Actions.setSnackBarState({
          isSnackbarOpen: true,
        }),
    );
  };

  const handleProfileInfoResponse = (dispatch, data) => {
    saveProfileInfo(dispatch, data);
  };

  const saveProfileInfo = (dispatch, data) => {
    dispatch(Actions.setProfileInfo({
      bio: data.bio,
      birthday: data.birth_date,
      firstName: data.first_name,
      lastName: data.last_name,
      website: data.website,
      username: data.username,
      isPublic: data.is_public,
      has_header_img: false,
      has_profile_img: false,
      profile_img: data.profile_img,
      header_img: data.header_img,
      profile_img_upload_details: data.profile_img_upload_details,
      header_img_upload_details: data.header_img_upload_details,
    }));
  };

  const onSubmitClicked = (
      dispatch,
      profileInfo,
      data,
      setSnackbarAlertMessage,
      setSnackbarAlertSeverity,
  ) => {
    if (typeof(data.birthday) === 'number') {
      data.birthday = profileInfo.birthday;
    }

    let hasCover = profileInfo.has_header_img;
    let hasPhoto = profileInfo.has_profile_img;

    const isDataChanged = checkDataChanged(profileInfo, data);

    if (coverPath !== null) {
      uploadPhoto(true);
      hasCover = true;
    }

    if (photoPath !== null) {
      uploadPhoto(false);
      hasPhoto = true;
    }

    console.log(hasCover + ' ' + hasPhoto);

    if (isDataChanged) {
      const dataToSend = {
        bio: data.bio,
        birth_date: data.birthday,
        first_name: data.firstName,
        last_name: data.lastName,
        website: data.website,
        username: data.username,
        is_public: data.isPublic,
        has_header_img: hasCover,
        has_profile_img: hasPhoto,
      };

      console.log(dataToSend);

      API.updateProfileInfo(profileId, dataToSend)
          .then((response) => {
            saveProfileInfo(dispatch, response.data);
            showSnackbar(
                Constants.EDIT_PROFILE_UPDATE_PROFILE_SUCCESS_MESSAGE,
                Constants.SNACKBAR_SUCCESS_SEVERITY,
                dispatch,
                setSnackbarAlertMessage,
                setSnackbarAlertSeverity,
            );
          }).catch((error) => {
            showSnackbar(
                Constants.EDIT_PROFILE_UPDATE_PROFILE_ERROR_MESSAGE,
                Constants.SNACKBAR_ERROR_SEVERITY,
                dispatch,
                setSnackbarAlertMessage,
                setSnackbarAlertSeverity,
            );
          });
    } else {
      showSnackbar(
          Constants.EDIT_PROFILE_UPDATE_PROFILE_NO_CHANGE_MESSAGE,
          Constants.SNACKBAR_ERROR_SEVERITY,
          dispatch,
          setSnackbarAlertMessage,
          setSnackbarAlertSeverity,
      );
    }
  };

  const checkDataChanged = (profileInfo, data) => {
    if (data.username !== profileInfo.username) {
      return true;
    }

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

    if (data.isPublic !== profileInfo.isPublic) {
      return true;
    }

    if (coverPath !== null) {
      return true;
    }

    if (photoPath !== null) {
      return true;
    }

    return false;
  };


  const handleUploadProfilePhotoClick = () => {
    photoInput.click();
  };

  const handleUploadProfileCoverClick = () => {
    coverInput.click();
  };

  const setProfilePhotoDetails = (path)=>{
    photoPath = path;
  };

  const setCoverDetails = (path)=>{
    coverPath = path;
  };

  const uploadPhoto = (isCover) => {
    let path;
    let bucketName;
    let objectName;

    if (isCover) {
      path = coverPath;
      bucketName = profileInfo.header_img_upload_details.bucket_name;
      objectName = profileInfo.header_img_upload_details.object_name;
    } else {
      path = photoPath;
      bucketName = profileInfo.profile_img_upload_details.bucket_name;
      objectName = profileInfo.profile_img_upload_details.object_name;
    }

    console.log(path);
    console.log(typeof(path));

    getBase64(path)
        .then((result) => {
          console.log(result);
          minioClient.putObject(
              bucketName,
              objectName,
              result,
              function(err, etag) {
                if (err) return console.log(err);
                console.log(etag);
              });
        })
        .catch((err) => {
          console.log(err);
        });
  };

  const getBase64 = (file) => {
    return new Promise((resolve) => {
      let fileInfo;
      let baseURL = '';
      // Make new FileReader
      const reader = new FileReader();

      // Convert the file to base64 text
      reader.readAsArrayBuffer(file);

      // on reader load somthing...
      reader.onload = () => {
        // Make a fileInfo Object
        baseURL = reader.result;
        resolve(baseURL);
      };
      console.log(fileInfo);
    });
  };

  useEffect(() => {
    requestProfileInfo(
        dispatch,
        setSnackbarAlertMessage,
        setSnackbarAlertSeverity,
    );
  }, []);

  return (
    <Grid container direction="column">
      <Grid item className="ep-grid-item" xs>
        <img src={profileInfo.header_img} className="ep-profile_cover" />
        <Avatar src={profileInfo.profile_img} className="ep-avatar" />
        <Avatar
          onClick={handleUploadProfilePhotoClick}
          className="ep-edit-photo-icon">
          <AddAPhotoOutlinedIcon />
        </Avatar>
        <AddAPhotoIcon
          onClick={handleUploadProfileCoverClick}
          className="ep-edit-cover-icon"/>
        { profileInfo.has_header_img &&
        <HighlightOffIcon className="ep-clear-cover-icon"/>
        }
        { profileInfo.has_profile_img && <Avatar
          className="ep-clear-photo-icon">
          <HighlightOffIcon />
        </Avatar> }
        <input
          type="file"
          id="file"
          accept=".jpg"
          onChange={(e) =>
            setProfilePhotoDetails(e.target.files[0])}
          ref={(ref) => photoInput = ref}
          style={{display: 'none'}}/>
        <input
          type="file"
          id="file"
          accept="image/*"
          onChange={(e) => setCoverDetails(e.target.files[0])}
          ref={(ref) => coverInput = ref}
          style={{display: 'none'}}/>
      </Grid>

      <Grid container>
        <Grid item xs>
          <div>
            {isSnackbarOpen && (<SnackbarAlert
              alertMessage={snackbarAlertMessage}
              severity={snackbarAlertSeverity}/>)}
            <CssBaseline />
            <Formik
              enableReinitialize
              initialValues={{
                username: profileInfo.username || '',
                firstName: profileInfo.firstName || '',
                lastName: profileInfo.lastName || '',
                website: profileInfo.website || '',
                bio: profileInfo.bio || '',
                birthday: Date.parse(profileInfo.birthday) || '',
                isPublic: !profileInfo.isPublic,
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
                onSubmitClicked(
                    dispatch,
                    profileInfo,
                    {...values, isPublic: !values.isPublic},
                    setSnackbarAlertMessage,
                    setSnackbarAlertSeverity,
                );
              }}
            >
              {({submitForm, isSubmitting}) => (
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <Form className="ep-form">
                    <Field
                      id="username"
                      component={TextField}
                      className="ep-text-field"
                      label="Username"
                      variant="outlined"
                      name="username"
                    />

                    <Field
                      component={TextField}
                      className="ep-text-field"
                      label="First Name"
                      variant="outlined"
                      name="firstName"
                    />

                    <Field
                      component={TextField}
                      className="ep-text-field"
                      label="Last Name"
                      variant="outlined"
                      name="lastName"
                    />

                    <Field
                      component={DatePicker}
                      className="ep-text-field"
                      variant="outlined"
                      name="birthday"
                      label="Birth Day"
                      maxDate={new Date()}
                    />

                    <Field
                      component={TextField}
                      className="ep-text-field"
                      label="Website"
                      variant="outlined"
                      name="website"
                    />

                    <Field
                      component={TextField}
                      className="ep-text-field"
                      label="Bio"
                      variant="outlined"
                      name="bio"
                      multiline
                      rows={4}
                    />
                    <FormGroup className="ep-check-box">
                      <Field
                        component={CheckboxWithLabel}
                        type="checkbox"
                        color="primary"
                        Label={{label: 'Private Account'}}
                        name="isPublic"
                      />
                    </FormGroup>
                    <Button
                      variant="contained"
                      className="ep-text-field"
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
          </div>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default EditProfile;
