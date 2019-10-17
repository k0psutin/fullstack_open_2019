import React from 'react'
import { connect } from 'react-redux'

const Notification = props => {
  if (props.notification.message === '') {
    return null
  }

  return (
    <div className={props.notification.code}>{props.notification.message}</div>
  )
}

const mapStateToProps = state => ({
  notification: state.notification
})

export default connect(mapStateToProps)(Notification)
