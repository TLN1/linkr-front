import { combineReducers } from 'redux';
import authReducer from './UserReducer';
import presetReducer from './PresetReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  preset: presetReducer
});

export default rootReducer;
