import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import PersonList from './components/PersonList'
import personService from './services/personService'
import Notification from './components/Notification'


const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ nameFilter, setNameFilter] = useState('')
  const [ error, setError ] = useState({ message: null, type: null})

  const setErrorMessage = (message, type) => {
    setError({ message: message, type: type })
    setTimeout(() => setError({ message: null , type: null }), 5000)
  }

  useEffect(() => {
    personService
      .getAll()
      .then(personList => {
        setPersons(personList)
      })
  }, [])

  const filteredList = persons.filter(person => person.name.toLowerCase().includes(nameFilter.toLowerCase()))
  
  return (
    <>
      <h2>Phonebook</h2>
      <Notification message={error.message} className={error.type}/>
      <Filter nameFilter={nameFilter} setNameFilter={setNameFilter}/>
      <PersonForm setErrorMessage={setErrorMessage} persons={persons} setPersons={setPersons}/>
      <PersonList setErrorMessage={setErrorMessage} persons={persons} setPersons={setPersons} filteredList={filteredList}/>
    </>
  )
}

export default App
