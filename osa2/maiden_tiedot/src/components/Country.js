import React from 'react'
import Weather from './Weather'

const Country = ({ country }) => {
    const alt = `Flag of ${country.name}`

    return (
      <>
      <h1>{country.name}</h1>
      <div>
        capital {country.capital}
      </div>
      <div>
        population {country.population}
      </div>
      <h2>
        languages
      </h2> 
      <ul>
        { country.languages.map(lang => <li key={lang.name}>{lang.name}</li>)}
      </ul>
      <img className='picture' alt={alt} src={country.flag} />
      <Weather country={country} />
      </>
    )
  }

  export default Country