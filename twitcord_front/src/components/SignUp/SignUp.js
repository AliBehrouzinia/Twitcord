import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
// import Link from '@material-ui/core/Link';
// import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import {Formik, Form, Field} from 'formik';
import './SignUp.css';
/* eslint-disable require-jsdoc */
const SignUp = () => {
  return (
    <div>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div>
          <Avatar>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
          Sign up
          </Typography>
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
              }
              if (!values.password) {
                errors.password = 'Required';
              }
              if (!values.confirmPassword) {
                errors.confirmPassword = 'Required';
              }
              if (
                values.email &&
                !values.email.match(
                    '/^[^\s@]+@[^\s@]+$/',
                )
              ) {
                errors.invalidEmail = 'Invalid email';
              }
              if (values.confirmPassword !== values.password) {
                errors.invalidSecPass = 'Invalid password';
              }
              return errors;
            }}
            onSubmit={(values, {setSubmitting}) => {
              setSubmitting(false);
              alert(JSON.stringify(values, null, 2));
              console.log('test');
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
                  helperText="Please Enter Email"
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
                    Submit
                </Button>
              </Form>
            )}
          </Formik>

          {/* <form className={classes.form} onSubmit={formik.handleSubmit}>
            <TextField
              type="text"
              value ={formik.values.username}
              onChange={formik.handleChange}
              variant="outlined"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              error={formik.touched.username && Boolean(formik.errors.username)}
              helperText={formik.touched.username ?
                formik.errors.username : ''}
            />
            <TextField
              type="email"
              value ={formik.values.email}
              onChange={formik.handleChange}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email ?
                formik.errors.email : ''}
            />
            <TextField
              type="password"
              value ={formik.values.password}
              onChange={formik.handleChange}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              id="password"
              autoComplete="current-password"
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password ?
                formik.errors.password : ''}
            />
            <TextField
              type="password"
              value ={formik.values.confirmPassword}
              onChange={formik.handleChange}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              id="confirmPassword"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
            Sign Up
            </Button>
            <Grid container className= {classes.grid}>
              <Grid item>
                <Link href='login' variant="body2">
                Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </form> */}
        </div>
      </Container>
    </div>
  );
};
export default SignUp;
