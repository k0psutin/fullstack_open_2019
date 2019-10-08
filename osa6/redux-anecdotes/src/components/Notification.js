import React from 'react'

const Notification = props => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  const notification = props.store.getState().notification
  const hide = () => <div></div>
  const show = () => <div style={style}>{notification}</div>

  return <div>{notification === '' ? hide() : show()}</div>
}

export default Notification
