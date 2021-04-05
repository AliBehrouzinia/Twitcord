import React, {useState} from 'react';
import classes from '../styles/SignUp.module.css';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
// import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
// import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
/* eslint-disable require-jsdoc */
function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [confirmpassword, setConfirmpassword] = useState('');
//  function handleSubmit() {
  
//     this.setState({ submitted: true });
//     const { username, password } = this.state;
//     if (username && password) {
//         props.login(username, password);
//     }
// }
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            type="username"
            placeholder = "username"
            value ={username}
            onChange={(e) => setUsername(e.target.value)}
            variant="outlined"
            required
            fullWidth
            id="username"
            label="username"
            name="username"
            autoComplete="username"
          />
          <TextField
            type="email"
            placeholder = "email"
            value ={email}
            onChange={(e) => setEmail(e.target.value)}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            type="password"
            placeholder = "password"
            value ={password}
            onChange={(e) => setPassword(e.target.value)}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            id="password"
            autoComplete="current-password"
          />
          <TextField
            type="confirmpassword"
            placeholder = "confirmpassword"
            value ={confirmpassword}
            onChange={(e) => setConfirmpassword(e.target.value)}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="confirmpassword"
            label="confirmpassword"
            id="confirmpassword"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="allowExtraEmails" color="primary" />}
            label="I want to receive updates via email."
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
  );
}
export default SignUp;
