import React from 'react'
import User from '../components/User'
import UserList from '../components/UserList'
import { BrowserRouter as Router, Route } from 'react-router-dom'

const Users = () => {
  return (
    <div>
      <Router>
        <Route exact path="/users/" render={() => <UserList />} />
        <Route
          exact
          path="/users/:id"
          render={({ match }) => <User id={match.params.id} />}
        />
      </Router>
    </div>
  )
}

export default Users
