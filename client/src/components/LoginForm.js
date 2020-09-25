import React, { Fragment } from 'react'
import '../styles/Forms.scss'
import PasswordScreen from './screens/PasswordScreen'
import LoginScreen from './screens/LoginScreen'
import { GlobalContext } from '../context'

export default function LoginForm() {
  const { passwordScreen } = React.useContext(GlobalContext)

  return (
    <Fragment>
      <div className="form__container">
        { passwordScreen ? <PasswordScreen /> : <LoginScreen /> }
      </div>
    </Fragment>
  )
}
