import React, { Fragment } from 'react'
import { Link } from 'react-router-dom';
// import { ToastContainer, toast } from 'react-toastify'
import { GlobalContext } from '../../context'
import '../../styles/Forms.scss'
import 'react-toastify/dist/ReactToastify.min.css'
import ErrorMessage from '../utils/ErrorMessage'

import { checkUsername } from '../../api/index'

export default function LoginScreen() {
  const { setPasswordScreen, addUsername } = React.useContext(GlobalContext)
  const [username, setUsername] = React.useState("")
  const [errorMessage, setErrorMessage] = React.useState("")
  const [validUsername, setValidUsername] = React.useState(true)
  const [formSubmitted, setFormSubmitted] = React.useState(false)
  const SHOW_PASSWORD_SCREEN = true

  const handleFormSubmit = async (evt) => {
    evt.preventDefault()
    setFormSubmitted(true)

    if (username === "") {
      setValidUsername(false)
      setErrorMessage("Please add your username.")
      return
    }
    // call API here to check if username is valid.
    const response = await checkUsername(username)
    const data = await response.json()
    if (!data.success) {
      setFormSubmitted(false)
      setValidUsername(false)
      setErrorMessage(data.message)
      return
    }

    // notifySuccess('✔ Success')
    setTimeout(() => {
      setPasswordScreen(SHOW_PASSWORD_SCREEN)
      setFormSubmitted(false)
    }, 2000)
  }

  // const notifySuccess = (message) => toast.success(message, {
  //   position: 'top-center',
  //   autoClose: 3000,
  //   hideProgressBar: false,
  //   closeOnClick: true,
  //   draggable: false,
  //   pauseOnHover: false,
  //   progress: undefined,
  // })

  const handleChange = (evt) => {
    const usrname = evt.target.value
    setUsername(usrname)
    addUsername(usrname)
  }

  return (
    <Fragment>
      <form
        onSubmit={handleFormSubmit}
      >
        <div className="form__title">
          <h3>Signin</h3>
        </div>
        <div>
          <label htmlFor="username">Username</label>
          <input
            className={ "input__text " + (!validUsername ? "input__error": "") }
            type="text"
            name="username"
            id="username"
            value={username}
            onChange={handleChange}
          />
          { !validUsername ? <ErrorMessage message={errorMessage} /> : null }
        </div>
        <div className="btn__container">
          <button type="submit">
            { formSubmitted ? "Verifying" : "Next" }
          </button>
        </div>
      </form>
      <div className="info__container">
        <p>New to Autodesk?</p> {" "}
        <Link to={'/signup'}> Create Account</Link>
      </div>
      {/* <ToastContainer /> */}
    </Fragment>
  )
}
