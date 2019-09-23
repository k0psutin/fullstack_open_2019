import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import phonebook from './services/phonebook'

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')

  useEffect(() => {
    console.log('effect')
    phonebook
      .getAll()
      .then(initialPersons => {
         setPersons(initialPersons)
      })
  }, [])


  const addNewPerson = (event) => {
    event.preventDefault()
    console.log('Lisätään uusi nimi:', newName)
    const personObject = {
      name: newName,
      number: newNumber
    }

    if(!persons.some(person => person.name === newName)) {
      console.log('Luotu:', personObject)
      phonebook
       .create(personObject)
       .then(returnedPerson => {
         setPersons(persons.concat(returnedPerson))
         setNewName('')
         setNewNumber('')
       })
      
    } else {
      alert(`${newName} is already added to phonebook`)
    }
  }

  const handleNewPerson = (event) => {
    console.log('Syötetään uutta nimeä:', event.target.value)
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilter = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter 
        filter={filter} 
        handleFilter={handleFilter}
        />
      <h2>add a new</h2>
      <PersonForm 
        addNewPerson={addNewPerson}
        newName={newName} 
        handleNewNumber={handleNewNumber}
        newNumber={newNumber}
        handleNewPerson={handleNewPerson}
        />
      <h2>Numbers</h2>
      <Persons 
        persons={persons}
        filter={filter}
      />
    </div>
  )

}

export default App
