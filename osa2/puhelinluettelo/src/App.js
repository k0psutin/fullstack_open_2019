import React, { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1234567' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')

  const addNewPerson = (event) => {
    
    event.preventDefault()

    console.log('Lisätään uusi nimi:', newName)
    const personObject = {
      name: newName,
      number: newNumber
    }

    if(!persons.some(person => person.name === newName)) {
      console.log('Luotu:', personObject)
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
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
