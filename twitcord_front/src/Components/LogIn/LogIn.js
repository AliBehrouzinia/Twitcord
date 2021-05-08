import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import {useStore} from 'react-redux';
import SnackbarAlert from '../Snackbar/Snackbar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import {TextField} from 'formik-material-ui';
import Link from '@material-ui/core/Link';
import Container from '@material-ui/core/Container';
import {Formik, Form, Field} from 'formik';
import * as API from '../../Utils/API/index';
import PropTypes from 'prop-types';
import * as Constants from '../../Utils/Constants.js';
import * as Actions from '../../redux/Actions/index.js';
import './LogIn.css';
/* eslint-disable require-jsdoc */
const LogIn = () => {
  const store = useStore();
  const isSnackbarOpen = useSelector((state) => state).tweet.isSnackbarOpen;
  const [snackbarAlertMessage, setSnackbarAlertMessage] = useState('');
  const [snackbarAlertSeverity, setSnackbarAlertSeverity] = useState('');
  const dispatch = useDispatch();


  function logInRequest(values) {
    dispatch(Actions.setLogInInfo(values));
    return new Promise(function(resolve, reject) {
      API.logIn(store.getState().tweet.logInInfo)
          .then((response) => {
            localStorage.setItem('token', response.data.key);
            setSnackbarAlertMessage(
                Constants.LOG_IN_SUCCESS_MESSAGE);
            setSnackbarAlertSeverity(
                Constants.SNACKBAR_SUCCESS_SEVERITY);
            dispatch(
                Actions.setSnackBarState({
                  isSnackbarOpen: true,
                }),
            );
            resolve(response);
            dispatch(
                Actions.setSideDrawerEnable({
                  enable: true,
                }),
            );
          })
          .catch((error) => {
            setSnackbarAlertMessage(
                Constants.LOG_IN_VERIFICATION_ERROR_MESSAGE);
            setSnackbarAlertSeverity(
                Constants.SNACKBAR_ERROR_SEVERITY);
            dispatch(
                Actions.setSnackBarState({
                  isSnackbarOpen: true,
                }),
            );
            reject(error);
          });
    });
  }

  async function handleSubmit(values) {
    await logInRequest(values);
    if (localStorage.getItem('token')) {
      API.userGeneralInfo({})
          .then((response) => {
            dispatch(Actions.setUserGeneralInfo(response.data));
            localStorage.setItem(
                Constants.GENERAL_USER_INFO, JSON.stringify(response.data),
            );
          }).catch((error) => {
            setSnackbarAlertMessage(
                Constants.GET_USER_INFO_FAILURE);
            setSnackbarAlertSeverity(
                Constants.SNACKBAR_ERROR_SEVERITY);
            dispatch(
                Actions.setSnackBarState({
                  isSnackbarOpen: true,
                }),
            );
          });
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      {isSnackbarOpen && (<SnackbarAlert
        alertMessage={snackbarAlertMessage}
        severity={snackbarAlertSeverity}/>)}
      <CssBaseline />
      <div>
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          validate={(values) => {
            const errors = {};
            if (!values.email) {
              errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.
                test(values.email)) {
              errors.email = 'Invalid email';
            }
            if (!values.password) {
              errors.password = 'Required';
            }
            return errors;
          }}
          onSubmit={(values, {setSubmitting}) => {
            setSubmitting(false);
            handleSubmit(values);
          }}
        >
          {({submitForm, isSubmitting, errors, touched}) => (
            <Form className="form">

              <Field
                component={TextField}
                className="text-field"
                label="Email Address"
                variant="outlined"
                name="email"
                type="email"
              />

              <Field
                component={TextField}
                className="text-field"
                label="Password"
                variant="outlined"
                name="password"
                type="password"
              />

              <Button
                variant="contained"
                className="text-field"
                color="primary"
                disabled={isSubmitting}
                onClick={submitForm}
              >
                    Log In
              </Button>
              <div className='log-in-redirection'>
                <Link href='signup' variant="body2">
                Do not have an account? Sign Up
                </Link>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </Container>
  );
};

LogIn.propTypes = {
  email: PropTypes.string,
  password: PropTypes.number,
};

export default LogIn;
