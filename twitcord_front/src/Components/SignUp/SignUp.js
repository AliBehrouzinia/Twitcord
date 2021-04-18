import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import * as Actions from '../../redux/Actions/index.js';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import {TextField} from 'formik-material-ui';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import {Formik, Form, Field} from 'formik';
import PropTypes from 'prop-types';
import * as API from '../../Utils/API/index';
import SnackbarAlert from '../Snackbar/Snackbar';
import * as Constants from '../../Utils/Constants.js';
import './SignUp.css';
// import { ActionTypes } from '../../redux/Actions/actionTypes';
/* eslint-disable require-jsdoc */
const SignUp = () => {
  const info = useSelector((state) => state).tweet.signUpInfo;
  const isSnackbarOpen = useSelector((state) => state).tweet.isSnackbarOpen;
  const [snackbarAlertMessage, setSnackbarAlertMessage] = useState('');
  const [snackbarAlertSeverity, setSnackbarAlertSeverity] = useState('');
  const dispatch = useDispatch();
  return (
    <div>
      <Container component="main" maxWidth="xs">
        {isSnackbarOpen && (<SnackbarAlert
          alertMessage={snackbarAlertMessage}
          severity={snackbarAlertSeverity}/>)}
        <CssBaseline />
        <div>
          <Formik
            initialValues={{
              username: '',
              email: '',
              password: '',
              confirmPassword: '',
            }}
            validate={(values) => {
              const errors = {};
              if (!values.username) {
                errors.username = 'Required';
              }
              if (!values.email) {
                errors.email = 'Required';
              } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.
                  test(values.email)) {
                errors.email = 'Invalid email';
              }
              if (!values.password) {
                errors.password = 'Required';
              } else if (values.password.length < 8) {
                errors.password = 'Password must contain at least 8 characters';
              }
              if (!values.confirmPassword) {
                errors.confirmPassword = 'Required';
              } else if (values.confirmPassword !== values.password) {
                errors.confirmPassword = 'Invalid password';
              }
              return errors;
            }}
            onSubmit={(values, {setSubmitting}) => {
              setSubmitting(false);
              dispatch(Actions.setSignUpInfo(values));
              API.signUp(info)
                  .then((response) => {
                    setSnackbarAlertMessage(
                        Constants.SIGN_UP_VERIFICATION_SUCCESS_MESSAGE);
                    setSnackbarAlertSeverity(
                        Constants.SNACKBAR_SUCCESS_SEVERITY);
                    dispatch(
                        Actions.setSnackBarState({
                          isSnackbarOpen: true,
                        }),
                    );
                  })
                  .catch((error) => {
                    setSnackbarAlertMessage(
                        Constants.SIGN_UP_EMAIL_ERROR_MESSAGE);
                    setSnackbarAlertSeverity(
                        Constants.SNACKBAR_ERROR_SEVERITY);
                    dispatch(
                        Actions.setSnackBarState({
                          isSnackbarOpen: true,
                        }),
                    );
                  });
            }}
          >
            {({submitForm, isSubmitting, errors, touched}) => (
              <Form className="form">
                <Field
                  component={TextField}
                  className="text-field"
                  label="Username"
                  variant="outlined"
                  name="username"
                />

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

                <Field
                  component={TextField}
                  className="text-field"
                  label="Confirm Password"
                  variant="outlined"
                  name="confirmPassword"
                  type="password"
                />

                <Button
                  variant="contained"
                  className="text-field"
                  color="primary"
                  disabled={isSubmitting}
                  onClick={submitForm}
                >
                    Sign Up
                </Button>
                <Grid container>
                  <Grid className='log-in-redirection'>
                    <Link href='login' variant="body2">
                Already have an account? Sign in
                    </Link>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </div>
      </Container>
    </div>
  );
};

SignUp.propTypes = {
  username: PropTypes.string,
  email: PropTypes.string,
  password1: PropTypes.number,
  password2: PropTypes.number,
};

export default SignUp;
