import { createStore } from 'redux';
import rootReducer from './Reducers';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setUserToken, setUsername } from '../actions/AuthActions';

const store = createStore(rootReducer);

AsyncStorage.getItem('authToken').then((token) => {
  if (token) {
    store.dispatch(setUserToken(token));
  }
});

AsyncStorage.getItem('username').then((username) => {
    if (username) {
      store.dispatch(setUsername(username));
    }
  });

export default store;
