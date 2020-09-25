import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import ErrorMessage from './utils/ErrorMessage'
import '../styles/Forms.scss'

import { createAccount } from '../api/index'

export default function SignupForm() {
  const [firstname, setFirstname] = React.useState("")
  const [hasErrorFirstname, setHasErrorFirstname] = React.useState(false)
  const [firstnameErrorMsg, setFirstnameErrorMsg] = React.useState("")

  const [lastname, setLastname] = React.useState("")
  const [hasErrorLastname, setHasErrorLastname] = React.useState(false)
  const [lastnameErrorMsg, setLastnameErrorMsg] = React.useState("")

  const [username, setUsername] = React.useState("")
  const [hasErrorUsername, setHasErrorUsername] = React.useState(false)
  const [usernameErrorMsg, setUsernameErrorMsg] = React.useState("")

  const [reTypeUsername, setReTypeUsername] = React.useState("")
  const [hasErrorReTypeUsername, setHasErrorReTypeUsername] = React.useState(false)
  const [reTypeUsernameErrorMsg, setReTypeUsernameErrorMsg] = React.useState("")

  const [password, setPassword] = React.useState("")
  const [hasErrorPassword, setHasErrorPassword] = React.useState(false)
  const [passwordErrorMsg, setPasswordErrorMsg] = React.useState("")

  const [reTypePassword, setReTypePassword] = React.useState("")
  const [hasErrorReTypePassword, setHasErrorReTypePassword] = React.useState(false)
  const [reTypePasswordErrorMsg, setReTypePasswordErrorMsg] = React.useState("")

  const [isUsernameEquals, setIsUsernameEquals] = React.useState(true)
  const [isPasswordEquals, setIsPasswordEquals] = React.useState(true)

  const [usernameEqualMsg, setUsernameEqualMsg] = React.useState("")
  const [passwordEqualMsg, setPasswordEqualMsg] = React.useState("")

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const isFormValid = validateForm()

    if (!isFormValid) {
      return
    }

    const response = await createAccount({
      first_name: firstname,
      last_name: lastname,
      username: username,
      password: password
    })
    const data = await response.json()
    if (!data.success) {
      notify({
        type: 'error',
        message: data.message,
      })
      return
    }
    notify({
      type: 'success',
      message: data.message
    })
    setTimeout(() => {
      window.location.href = "/signin"
    }, 5500)
  }

  const notify = ({ type, message }) => toast[type](message, {
    position: 'top-center',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    draggable: false,
    pauseOnHover: false,
    progress: undefined,
  })

  const validateForm = () => {
    let valid = true

    if (firstname === "") {
      setHasErrorFirstname(true)
      setFirstnameErrorMsg("Please enter your first name")
      valid = false
    } else {
      setHasErrorFirstname(false)
      setFirstnameErrorMsg("")
    }

    if (lastname === "") {
      setHasErrorLastname(true)
      setLastnameErrorMsg("Please enter your last name")
      valid = false
    } else {
      setHasErrorLastname(false)
      setLastnameErrorMsg("")
    }

    if (username === "") {
      setHasErrorUsername(true)
      setUsernameErrorMsg("Please enter a valid username")
      valid = false
    } else {
      setHasErrorUsername(false)
      setUsernameErrorMsg("")
    }

    if (reTypeUsername === "") {
      setHasErrorReTypeUsername(true)
      setIsUsernameEquals(true)
      setReTypeUsernameErrorMsg("Please re-type your username")
      valid = false
    } else {
      setHasErrorReTypeUsername(false)
      setReTypeUsernameErrorMsg("")
    }

    if (reTypeUsername !== username) {
      setIsUsernameEquals(false)
      setUsernameEqualMsg("Please enter the same username")
      valid = false
    } else {
      setIsUsernameEquals(true)
      setUsernameEqualMsg("")
    }

    if (password === "") {
      setHasErrorPassword(true)
      setPasswordErrorMsg("Please enter a password")
      valid = false
    } else {
      setHasErrorPassword(false)
      setPasswordErrorMsg("")
    }

    if (reTypePassword === "") {
      setHasErrorReTypePassword(true)
      setIsPasswordEquals(true)
      setReTypePasswordErrorMsg("Please re-type your password")
      valid = false
    } else {
      setHasErrorReTypePassword(false)
      setReTypePasswordErrorMsg("")
    }

    if (reTypePassword !== password) {
      setIsPasswordEquals(false)
      setPasswordEqualMsg("Passwords dont match")
      valid = false
    } else {
      setIsPasswordEquals(true)
      setPasswordEqualMsg("")
    }

    return valid
  }

  return (
    <Fragment>
      <div>
        <form
          onSubmit={handleSubmit}
        >
          <div className="form__title">
            <h3> Create account </h3>
          </div>

          <div className="form-inline">
            <div>
              <label htmlFor="first_name">First name</label>
              <input
                className={(hasErrorFirstname ? "input__error": "")}
                type="text"
                name="first_name"
                id="first_name"
                value={firstname}
                onChange={(evt) => setFirstname(evt.target.value)}
              />
              { hasErrorFirstname ? <ErrorMessage message={firstnameErrorMsg} /> : null }
            </div>
            <div>
              <label htmlFor="last_name">Last name</label>
              <input
                className={(hasErrorLastname ? "input__error": "")}
                type="text"
                name="last_name"
                id="last_name"
                value={lastname}
                onChange={(evt) => setLastname(evt.target.value)}
              />
              { hasErrorLastname ? <ErrorMessage message={lastnameErrorMsg} /> : null }
            </div>
          </div>
          {/* End inline__group */}
          <div className="form__group">
            <label htmlFor="username">Username</label>
            <input
              className={(hasErrorUsername ? "input__error": "")}
              type="text"
              name="username"
              id="username"
              value={username}
              onChange={(evt) => setUsername(evt.target.value)}
            />
            { hasErrorUsername ? <ErrorMessage message={usernameErrorMsg} /> : null }
          </div>
          <div className="form__group">
            <label htmlFor="retype_username">Re-type username</label>
            <input
              className={(hasErrorReTypeUsername ||  !isUsernameEquals ? "input__error": "")}
              type="text"
              name="retype_username"
              id="retype_username"
              value={reTypeUsername}
              onChange={(evt) => setReTypeUsername(evt.target.value)}
            />
            { hasErrorReTypeUsername ? <ErrorMessage message={reTypeUsernameErrorMsg} /> : null }
            { !isUsernameEquals ? <ErrorMessage message={usernameEqualMsg} /> : null }
          </div>
          <div className="form__group">
            <label htmlFor="password">Password</label>
            <input
              className={(hasErrorPassword ? "input__error": "")}
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(evt) => setPassword(evt.target.value)}
            />
            { hasErrorPassword ? <ErrorMessage message={passwordErrorMsg} /> : null }
          </div>
          <div className="form__group">
            <label htmlFor="retype_password">Re-type password</label>
            <input
              className={(hasErrorReTypePassword ||  !isPasswordEquals ? "input__error": "")}
              type="password"
              name="retype_password"
              id="retype_password"
              value={reTypePassword}
              onChange={(evt) => setReTypePassword(evt.target.value)}
            />
            { hasErrorReTypePassword ? <ErrorMessage message={reTypePasswordErrorMsg} /> : null }
            { !isPasswordEquals ? <ErrorMessage message={passwordEqualMsg} /> : null }
          </div>
          <div className="btn__container">
            <button type="submit">
              Create account
            </button>
          </div>
        </form>
        <div className="info__container">
          <p>Already have an account?</p> {" "}
          <Link to={'/signin'}> Sign in</Link>
        </div>
      </div>
      <ToastContainer />
    </Fragment>
  )
}
