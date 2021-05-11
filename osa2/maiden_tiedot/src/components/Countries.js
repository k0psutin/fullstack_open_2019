import React from 'react'
import Country from './Country'

  
const Filtered = ({ filteredData, setFilter }) => filteredData.map(country => <div key={country.name}>{country.name} <button onClick={() => setFilter(country.name)} >show</button></div>)

const Countries = ({ filteredData, setFilter }) => {
    if (filteredData.length > 10) {
      return <div>Too many matches, specify another filter</div>
    }
  
    const isOne = filteredData.length === 1

    return (
      <>
          { isOne ? <Country country = {filteredData[0]} /> : <Filtered filteredData={filteredData} setFilter={setFilter}/>}
      </>
    )
  }

export default Countries