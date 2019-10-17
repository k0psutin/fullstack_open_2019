import axios from 'axios'

const baseUrl = `${BACKEND_URL}`

const getAll = id => {
  const request = axios.get(`${baseUrl}api/blogs/${id}/comments/`)
  return request.then(response => response.data)
}

const create = async (id, comment) => {
  const response = await axios.post(
    `${baseUrl}api/blogs/${id}/comments/`,
    comment
  )
  return response.data
}

export default { getAll, create }
