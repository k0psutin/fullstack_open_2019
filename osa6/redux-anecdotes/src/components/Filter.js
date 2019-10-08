import React from 'react'
import { filterList } from '../reducers/filterReducer'

const Filter = ({ store }) => {
  const handleChange = event => {
    store.dispatch(filterList(event.target.value))
  }
  const style = {
    marginBottom: 10
  }
  return (
    <div style={style}>
      filter
      <input onChange={handleChange} name='filter'></input>
    </div>
  )
}

export default Filter
