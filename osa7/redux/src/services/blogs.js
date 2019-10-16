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
  const request = await axios.request(baseUrl, config)
  console.log(request)
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const remove = async id => {
  const config = {
    headers: { Authorization: token }
  }

  console.log(config)
  const reponse = await axios.delete(`${baseUrl}/${id}`, config)
  return reponse.data
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const get = async (id, newObject) => {
  const response = await axios.get(`${baseUrl}/${id}`, newObject)
  return response.data
}

const update = async newObject => {
  console.log(newObject)
  const response = await axios.put(`${baseUrl}/${newObject.id}`, newObject)
  console.log(response.data)
  return response.data
}

export default { getAll, setToken, create, update, get, remove }
