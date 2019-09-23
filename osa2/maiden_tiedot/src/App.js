import React, { useEffect, useState } from 'react'
import axios from 'axios'

import Query from './components/Query'
import Country from './components/Country'

function App() {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
     .get('https://restcountries.eu/rest/v2/all')
     .then(response => {
       console.log(`promise fulfilled`)
       setCountries(response.data)
     })
    },[])

  const handleFilter = (event) => {
    console.log(`Searching ...`)
    console.log(event.target.value)
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
