import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/persons'

const query = (queryObject) => {
    return queryObject.then(response => {
        return response.data
    })
}

const getAll = () => { 
    return query(axios.get(baseUrl))
}

const create = newObject => { 
    return query(axios.post(baseUrl, newObject))
}

const update = (id, newObject) => {
    return query(axios.put(`${baseUrl}/${id}`, newObject))
}

const remove = (id) => {
    return query(axios.delete(`${baseUrl}/${id}`))
}

// eslint-disable-next-line import/no-anonymous-default-export
export default  { getAll, create, update, remove }