import { userService } from '../../requests/auth_service';
import { alertActions } from './alert';
export const userActions = {
    login,
    logout,
    register,
};

function login( email, password ,isLogedIn) {
    return dispatch => {
        dispatch(request());

        userService.login(email, password , isLogedIn )
           
    };

    function request() { return 'request' }
    function success() { return 'success' }
    function failure() { return  'error' }
}

function logout() {
    userService.logout();
    return  'LOGOUT' ;
}

function register(username , email, password , confirmpassword , isSignedUp) {
    return dispatch => {
        dispatch(request());

        userService.register(username , email, password , confirmpassword , isSignedUp)
            
    };

    function request() { return 'request' }
    function success() { return 'success' }
    function failure() { return  'error' }
}
