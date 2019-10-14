import axios from 'axios'

const getAll = id => {
  console.log(id)
  const request = axios.get(`/api/blogs/${id}/comments/`)
  return request.then(response => response.data)
}

const create = async (id, comment) => {
  console.log(id)
  const response = await axios.post(`/api/blogs/${id}/comments/`, comment)
  return response.data
}

export default { getAll, create }
