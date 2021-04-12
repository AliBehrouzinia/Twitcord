import {ActionTypes} from '../actions/actionTypes';
import {reduxTypes} from '../reducers/reduxTypes';
import produce from 'immer';

export const state: reduxTypes = {
    email: null,
    username: null,
    password: null,
    token: null,
}
const reducer = produce((state: reduxTypes, { type, payload }) => {
    switch (type){
        case ActionTypes.SIGN_UP_REQUEST:
            return;
        case ActionTypes.SIGN_UP_REQUEST_SUCCESS:
                return;
        case ActionTypes.SIGN_UP_REQUEST_FAILURE:
            return;
        case ActionTypes.LOG_IN_REQUEST:
            return;
        case ActionTypes.LOG_IN_REQUESR_SUCCESS:
            return;
        case ActionTypes.SIGN_UP_REQUEST_FAILURE:
            return;
        default:
            return state;
    }
}, state);
export default reducer;
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    




,state);