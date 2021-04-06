import rootReducer from './Reducers/RootReducer';
import {createStore} from 'redux';

const store = createStore(rootReducer);

export default store;
