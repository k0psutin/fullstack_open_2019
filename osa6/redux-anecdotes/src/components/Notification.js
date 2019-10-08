import React from 'react'
import { getStatus } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

const Notification = props => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  const hide = () => {
    return <div></div>
  }
  const show = () => {
    return <div style={style}>{props.notification}</div>
  }

  return <div>{props.notification === '' ? hide() : show()}</div>
}

const mapStatesToProps = state => {
  return {
    notification: state.notification
  }
}

export default connect(
  mapStatesToProps,
  { getStatus }
)(Notification)
