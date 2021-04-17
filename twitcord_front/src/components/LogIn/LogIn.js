import React from 'react';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import {TextField} from 'formik-material-ui';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import {Formik, Form, Field} from 'formik';
import * as API from '../../Utils/API/index';
import * as Constants from '../../Utils/Constants.js';
import * as Actions from '../../redux/Actions/index.js';
import './LogIn.css';
/* eslint-disable require-jsdoc */
const LogIn = () => {
  const info = useSelector((state) => state).tweet.signUpInfo;
  const dispatch = useDispatch();
  return (
    <Container component="main" maxWidth="xs">
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
            dispatch(Actions.setLogInInfo(values));
            API.logIn(info)
                .then((response) => {
                  if (response.detail ===
                      Constants.VERIFICATION_SENT_SUCCESS) {
                    // change this to snack bar
                    alert('success');
                  }
                })
                .catch((error) => {
                  alert('fail');
                });
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
              <Grid container>
                <Grid className='log-in-redirection'>
                  <Link href='SignUp' variant="body2">
                Do not have an account? Sign Up
                  </Link>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </div>
    </Container>
  );
};
export default LogIn;
