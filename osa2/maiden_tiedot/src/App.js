import React, { useEffect, useState } from 'react'
import axios from 'axios'

import Query from './components/Query'
import Country from './components/Country'

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios
     .get('https://restcountries.eu/rest/v2/all')
     .then(response => {
       setCountries(response.data)
     })
    },[])

  const handleFilter = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
    <Query filter={filter} handleFilter={handleFilter}/>
    <Country filter={filter} countries={countries}/>
    </div>
  )
}
export default App