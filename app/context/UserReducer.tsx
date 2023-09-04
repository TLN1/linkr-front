export const userReducer = (prevState, action) => {
  switch (action.type) {
    case "RESTORE_TOKEN":
      return {
        ...prevState,
        userToken: action.token,
        username: action.username,
        isLoading: false,
      };
    case "SIGN_IN":
      return {
        ...prevState,
        isSignout: false,
        userToken: action.token,
        username: action.username,
      };
    case "SIGN_OUT":
      return {
        ...prevState,
        isSignout: true,
        userToken: null,
        username: null,
      };
    default:
      return {
        isLoading: true,
        isSignout: false,
        userToken: null,
        username: null,
      };
  }
};

export default userReducer;
