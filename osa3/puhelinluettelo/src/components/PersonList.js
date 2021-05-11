import React from 'react'
import personService from '../services/personService'

import '../index.css'

const PersonList = ({ persons, filteredList, setPersons, setErrorMessage}) => {
    const handlePersonRemoval = (name, id) => {
        const isApproved = window.confirm(`Delete ${name}?`)
        if (!isApproved) {
            return
        }
       
        personService
          .remove(id)
            .then(() => {
                const filtPersons = persons.filter(person => person.id !== id)
                setPersons([...filtPersons])
                setErrorMessage(`${name} successfully removed.`, 'done')
        }).catch(() => {
            setErrorMessage(`${name} has already been removed from the server.`, 'error')
            const filtPersons = persons.filter(person => person.id !== id)
            setPersons([...filtPersons])
        })
    }
    return (
        <>
        <h2>Numbers</h2>
        <ul>
        { filteredList.map(person => 
            <li className="person" key={person.id}>{ person.name } { person.number } <button onClick={() => handlePersonRemoval(person.name, person.id)}>delete</button></li>
          )}
         </ul>
        </>
    )
}

export default PersonList