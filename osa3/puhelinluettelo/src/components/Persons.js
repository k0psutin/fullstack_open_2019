import React, { useState }  from 'react'
import Entry from './Entry'

const Persons = ( {filter, persons, handleRemoval} ) => {
   /*
    console.log(filter)
    console.log(persons)
    console.log(handleRemoval)
    */

    const [ match ] = useState(false)

    const numbersToShow = match
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

    const rows = () => numbersToShow.map(person => <Entry handleRemoval={handleRemoval} key={person.id} id={person.id} name={person.name} number={person.number} />)
    return(
        <div>
            {rows()}
        </div>
    )
}

export default Persons