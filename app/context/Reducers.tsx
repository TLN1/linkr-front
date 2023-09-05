import { combineReducers } from 'redux';
import authReducer from './UserReducer';

const rootReducer = combineReducers({
  auth: authReducer,
});

export default rootReducer;
