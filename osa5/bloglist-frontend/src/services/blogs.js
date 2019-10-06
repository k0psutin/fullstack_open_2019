import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token }
  }
  try {
    const response = await axios.post(baseUrl, newObject, config)
    return response.data
  } catch (exception) {}
}

const remove = async id => {
  const config = {
    headers: { Authorization: token }
  }
  const reponse = await axios.delete(`${baseUrl}/${id}`, config)
  return reponse.data
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const get = async (id, newObject) => {
  const response = axios.get(`${baseUrl}/${id}`, newObject)
  return response.data
}

const update = async (id, newObject) => {
  const response = axios.put(`${baseUrl}/${id}`, newObject)
  return response.data
}

export default { getAll, setToken, create, update, get, remove }
