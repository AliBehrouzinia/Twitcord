import rootReducer from './Reducers/RootReducer.js';
import {createStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';

const store = createStore(rootReducer, composeWithDevTools());

export default store;
