import { createStore } from 'redux';
import rootReducer from './Reducers';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setUserToken, setUsername, setWebsocket } from '../actions/AuthActions';

const store = createStore(rootReducer);

AsyncStorage.getItem('authToken').then((token) => {
  if (token) {
    store.dispatch(setUserToken(token));
  }
});

AsyncStorage.getItem('username').then((username) => {
  if (username) {
    store.dispatch(setUsername(username));

    const websocketUrl = `ws://0.0.0.0:8000/register/ws/${username}`;
    console.log(websocketUrl);
    const ws = new WebSocket(websocketUrl);
    ws.onopen = () => {
      console.log(`WebSocket connection opened for user ${username}`);
    };
    store.dispatch(setWebsocket(ws));
  }
});



export default store;
