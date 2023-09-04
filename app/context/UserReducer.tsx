import { SET_AUTH_TOKEN, CLEAR_USER_INFO, SET_USERNAME } from "../actions/AuthActions";

const initialState = {
  username: null,
  authToken: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTH_TOKEN:
      return {
        ...state,
        authToken: action.payload,
      };
    case SET_USERNAME:
      return {
        ...state,
        username: action.payload,
      };
    case CLEAR_USER_INFO:
      return {
        ...state,
        authToken: null,
        username: null,
      };
    default:
      return state;
  }
};

export default authReducer;
