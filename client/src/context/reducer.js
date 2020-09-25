export default (state, action) => {
  switch(action.type) {
    case "PASSWORD_SCREEN":
      return {
        ...state,
        showPasswordScreen: action.payload,
      };
    case "SET_USERNAME": {
     return {
       ...state,
       username: action.payload,
     };
    }
    case "USER_LOGIN": {
      return {
        ...state,
        user: {
          ...action.payload,
        },
      };
    }
    case "SET_AUTH_TOKEN": {
      return {
        ...state,
        authenticated: true,
        authToken: action.payload,
      };
    }
    default:
      return state;
  }
}