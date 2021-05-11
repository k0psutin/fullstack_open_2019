import React, { useEffect, useState } from 'react'
import axios from 'axios'

import Countries from './components/Countries'

import './style.css'

const App = () => {
  const [ countryData, setCountryData ] = useState([])
  const [ filter, setFilter ] = useState('')

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_COUNTRY_API)
      .then(response => {
        setCountryData(response.data)
      })
  }, [])

  const filteredData = countryData.filter(country => country.name.toLowerCase().includes(filter.toLowerCase()))
  const handleFilterChange = (event) => setFilter(event.target.value)

  return (
    <>
    find countries
    <input value={filter} onChange={handleFilterChange} />
    <Countries filter={filter} filteredData={filteredData} setFilter={setFilter}/>
    </>
  )
}
export default App