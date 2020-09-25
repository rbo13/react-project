import React from 'react'
import AppReducer from './reducer'

const initialState = {
  authenticated: false,
  showPasswordScreen: false,
  username: '',
  user: {},
  authToken: ''
}

export const GlobalContext = React.createContext(initialState);
export const AppProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(AppReducer, initialState)

  function setPasswordScreen(value = false) {
    dispatch({
      type: "PASSWORD_SCREEN",
      payload: value
    })
  }

  function addUsername(username) {
    dispatch({
      type: "SET_USERNAME", 
      payload: username,
    })
  }

  function userLogin(user) {
    dispatch({
      type: "USER_LOGIN",
      payload: user,
    })
  }

  function authToken(token) {
    dispatch({
      type: "SET_AUTH_TOKEN",
      payload: token,
    })
  }

  return (
    <GlobalContext.Provider
      value={{
        user: state.user,
        passwordScreen: state.showPasswordScreen,
        username: state.username,
        setPasswordScreen,
        addUsername,
        userLogin,
        authToken,
      }}
    >
      { children }
    </GlobalContext.Provider>
  )
}