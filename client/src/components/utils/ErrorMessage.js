import React, { Fragment } from 'react'
import '../../styles/Forms.scss'

export default function ErrorMessage(props) {
  return (
    <Fragment>
      <div className="input__message">{props.message}</div>
    </Fragment>
  )
}
