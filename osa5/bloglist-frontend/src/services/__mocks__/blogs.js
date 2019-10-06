const blogs = [
  {
    title: 'React haltuun',
    author: 'Matti Luukkainen',
    url: 'googleta',
    likes: 3,
    user: {
      username: 'testi',
      name: 'testi testi',
      id: '5d977ed4c5c18f18cc567700'
    },
    id: '5d99bf56358e62065077fc2d'
  },
  {
    user: {
      username: 'kopsutin',
      name: 'jani koponen',
      id: '5d96ed00be761c472454d670'
    },
    author: 'Patrick Johansson',
    title: 'Jåå',
    url: 'http://årp.fi',
    likes: 41,
    id: '5d97023b0e11f74d1cd90a58'
  }
]

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  return Promise.resolve(blogs)
}

export default { getAll, setToken }
