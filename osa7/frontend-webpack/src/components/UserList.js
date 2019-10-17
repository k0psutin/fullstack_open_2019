import React from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const Users = props => {
  const users = _.uniqBy(
    _.map(props.blogs, (val, key) => {
      return {
        id: val.user.id,
        name: val.user.name,
        count: props.blogs.filter(blog => blog.user.id === val.user.id).length,
      }
    }),
    'id',
  )

  const sortList = () => _.orderBy(users, ['count'], ['desc'])

  return (
    <div>
      <h2>Users</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              <b>blogs created</b>
            </th>
          </tr>
          {sortList().map(user => (
            <tr key={user.name}>
              <th>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </th>
              <th>{user.count}</th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

const mapStateToProps = state => ({
  blogs: state.blog,
})

export default connect(mapStateToProps)(Users)
