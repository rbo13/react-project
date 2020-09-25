import React, { Fragment } from 'react'
import { FaChevronLeft } from 'react-icons/fa'
import { ToastContainer, toast } from 'react-toastify'
import { GlobalContext } from '../../context'
import '../../styles/Forms.scss'
import ErrorMessage from '../utils/ErrorMessage'

import { login } from '../../api/index'

export default function PasswordScreen() {
  const { username, setPasswordScreen } = React.useContext(GlobalContext)
  const [password, setPassword] = React.useState("")
  const [formError, setFormError] = React.useState(false)
  const [formErrorMessage, setFormErrorMessage] = React.useState("")

  function handleClick() {
    setPasswordScreen(false)
  }

  const handleLogin = async (event) => {
    if (event) {
      event.preventDefault()
    }

    if (password === "") {
      setFormErrorMessage("Password is required")
      setFormError(true)
    } else {
      setFormErrorMessage("")
      setFormError(false)
    }

    if (username === "") {
      setFormErrorMessage("Username cannot be empty")
      setFormError(true)
    } else {
      setFormErrorMessage("")
      setFormError(false)
    }

    const response = await login({
      username,
      password
    })
    const data = await response.json()
    if (!data.success) {
      setFormErrorMessage(data.message)
      setFormError(true)     
      return
    }

    notifySuccess(`✔ Welcome back, ${username}!`)
    return
  }

  const notifySuccess = (message) => toast.success(message, {
    position: 'top-center',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    draggable: false,
    pauseOnHover: false,
    progress: undefined,
  })

  return (
    <Fragment>
      <form
        onSubmit={handleLogin}
      >
        <div className="form__title">
          <div className="form__header">
            <div className="form__nav">
              <div
                onClick={handleClick}
              >
                <FaChevronLeft color={`#008bce`}/>
              </div>
            </div>
            <h3>
              Welcome
            </h3>
            <p>
              {username}
            </p>
          </div>
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            className={"input__password " + (formError ? "input__error": "")}
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(evt) => setPassword(evt.target.value)}
          />
          { formError ? <ErrorMessage message={formErrorMessage} /> : null }
        </div>
        <div className="btn__container">
          <button type="submit" className="signin">
            Signin
          </button>
        </div>
      </form>

      <ToastContainer />
    </Fragment>
  )
}
