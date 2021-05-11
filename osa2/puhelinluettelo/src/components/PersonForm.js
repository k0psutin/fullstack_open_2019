import React, { useState } from 'react'
import personService from '../services/personService'



const PersonForm = ({ persons, setPersons, setErrorMessage }) => {
    const [ newName, setNewName ] = useState('')
    const [ newNumber, setNewNumber] = useState('')

    const handleNameChange = (event) => setNewName(event.target.value)
    const handleNumberChange = (event) => setNewNumber(event.target.value)

    const addName = (event) => {
        event.preventDefault()
    
        const nameExists = persons.find(person => person.name.toLowerCase() === newName.toLowerCase())
        const isValidName = newName.trim().length > 5
        const isValidNumber = newNumber.length > 5
    
        if (!isValidName || !isValidNumber) {
          const msg = !isValidName ? 'Name should be at least 6 chars long.' : 'Number should be at least 6 digits long.'
          setErrorMessage(msg, 'error')
          return null
        }

        let updateNumber = false

        if (nameExists) {
          updateNumber = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
          if (!updateNumber) {
            return null
          }
        }

        const newPerson = {
          name: newName,
          number: newNumber
        }
    
        if (updateNumber) {
          personService
            .update(nameExists.id, newPerson)
            .then(returnedPerson => {
              setPersons(persons.map(person => person.id !== nameExists.id ? person : returnedPerson))
              setNewName('')
              setNewNumber('')
              setErrorMessage(`${newName} updated successfully!`, 'done')
          })
        } else {
          personService
            .create(newPerson)
              .then(returnedPerson => {
              setPersons(persons.concat(returnedPerson))
              setNewName('')
              setNewNumber('')
              setErrorMessage(`${newName} added successfully!`, 'done')
          })
        }
      }

    return (
        <>
        <h2>Add a new number</h2>
        <form onSubmit={addName}>
          <div>
            name 
            <input value={newName} onChange={handleNameChange}/>
          </div>
          <div>
            number 
            <input value={newNumber} onChange={handleNumberChange}/>
          </div>
          <div>
            <button type="submit">add</button>
          </div>
        </form>
        </>
    )
}

export default PersonForm