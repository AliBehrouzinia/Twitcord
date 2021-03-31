import React, {useState} from 'react';
import classes from './styles/Login.css';
/* eslint-disable require-jsdoc */
function Login() {
  const [username, setUserame] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className ={classes.login}>
      <form className ="login_form">
        <h1>login here</h1>
        <form className ="login_form">
          <input
            type="username"
            placeholder = "username"
            value={username}
            onChange={(e) => setUserame(e.target.value)}/>
        </form>
        <form className ="login_form">
          <input
            type="email"
            placeholder = "email"
            value ={email}
            onChange={(e) => setEmail(e.target.value)}/>
        </form>
        <form className ="login_form">
          <input
            type="password"
            placeholder = "password"
            value ={password}
            onChange={(e) => setPassword(e.target.value)}/>
        </form>
      </form>
    </div>
  );
}
export default Login;
