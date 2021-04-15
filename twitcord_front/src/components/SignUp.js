import React from 'react';
import classes from '../styles/SignUp.module.css';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import {useFormik} from 'formik';
import * as yup from 'yup';
/* eslint-disable require-jsdoc */
const SignUp = () => {
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  // const [username, setUsername] = useState('');
  // const [confirmPassword, setConfirmpassword] = useState('');

  const validationSchema = yup.object({
    username: yup
        .string('Enter your username')
        .required('Username is required'),

    email: yup
        .string('Enter your email')
        .email('Enter a valid email')
        .required('Email is required'),
    password: yup
        .string()
        .min(8, 'Password should be of minimum 8 characters length')
        .required('Password is required'),
    // confirmPassword: yup.string()
  });
  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: validationSchema,
    validateOnChange: true,
    onSubmit: (values) => {
      // do sth
      console.log(values);
    },
  });
  return (
    <div>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
          Sign up
          </Typography>
          <form className={classes.form} onSubmit={formik.handleSubmit}>
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
          </form>
        </div>
      </Container>
    </div>
  );
};
export default SignUp;
