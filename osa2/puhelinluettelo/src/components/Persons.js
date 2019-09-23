import React, { useState }  from 'react'
import Entry from './Entry'

const Persons = ( {filter, persons} ) => {

    console.log(filter)
    console.log(persons)

    const [ match ] = useState(false)

    const numbersToShow = match
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

    const rows = () => numbersToShow.map(person => <Entry key={person.name} name={person.name} number={person.number} />)

    return(
        <div>
            {rows()}
        </div>
    )
}

export default Persons