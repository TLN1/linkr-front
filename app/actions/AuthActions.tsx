export const SET_AUTH_TOKEN = "SET_AUTH_TOKEN";
export const SET_USERNAME = "SET_USERNAME";
export const CLEAR_USER_INFO = "CLEAR_USER_INFO";
export const SET_WEBSOCKET = "SET_WEBSOCKET";

export const setUserToken = (token) => ({
  type: SET_AUTH_TOKEN,
  payload: token,
});

export const setUsername = (username) => ({
    type: SET_USERNAME,
    payload: username,
  });

export const clearUserInfo = () => ({
  type: CLEAR_USER_INFO,
});

export const setWebsocket = (websocket: WebSocket) => ({
  type: SET_WEBSOCKET,
  payload: websocket,
})
