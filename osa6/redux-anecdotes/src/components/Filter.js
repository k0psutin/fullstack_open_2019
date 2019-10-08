import React from 'react'
import { filterList } from '../reducers/filterReducer'
import { connect } from 'react-redux'

const Filter = props => {
  const handleChange = event => {
    props.filterList(event.target.value)
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

const mapStateToProps = state => {
  return {
    anecdote: state.anecdote,
    filter: state.filter
  }
}

const ConnectedFilter = connect(mapStateToProps)(Filter)

export default connect(
  null,
  { filterList }
)(ConnectedFilter)
