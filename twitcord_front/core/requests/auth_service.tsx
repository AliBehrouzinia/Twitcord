import axios from "axios";
import { alertActions } from '../redux/actions/alert';
export const userService = {
  login,
  logout,
  register,
};
const API_URL = "http://localhost:3000/";
function login(email, password , isLogedIn) {
  axios
  .post(
    "url",
    {
      email,password,
    },
    { headers: { "content-type": "application/json" } }
  )
  .then((res) => {
    if (res.status === 200) {
      sessionStorage.setItem("token", res.data.token);
      isLogedIn = 'true' ;
    }
    return res.data 
  })
  .catch((error) => {
    if (error.response) {
      this.setState({ isnotLoged: true });
    }
  });

  
}
function logout() {
  localStorage.removeItem('user');
}
function register(username , email, password , confirmpassword , isSignedUp) {
  if (
    confirmpassword !== "" &&
    confirmpassword === password
  ) {
  axios
  .post(
    "url",
    {
      password,
      username,
      email,
      
    },
    { headers: { "content-type": "application/json" } }
  )
  .then((res) => {
    if (res.status === 200) {
      sessionStorage.setItem("token", res.data.token);
      isSignedUp = true ;
    }
    return localStorage.getItem("token");
  })
  .catch((error) => {
    if (error.response) {
      isSignedUp = false ;
    }
  });
} else if (confirmpassword !== password) {
// alert("تکرار رمز ورود اشتباه است");
this.setState({
  password: "",
  confirmNewPassword: "",
  isConPassWrong: true,
});
}}

