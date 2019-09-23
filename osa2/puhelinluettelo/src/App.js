import React, { useState } from 'react'
import Entry from './components/Entry'

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
  const [ match, setMatch ] = useState(false)

  const numbersToShow = match
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  const rows = () => numbersToShow.map(person => <Entry key={person.name} name={person.name} number={person.number} />)

  const addNewPerson = (event) => {
  // '${newName} is already added to phonebook'
    
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
      <div>
        filter shown with <input value={filter}  onChange={handleFilter}/>
      </div>
      <h2>add a new</h2>
      <form onSubmit={addNewPerson}>
        <div>
          name: <input value={newName} onChange={handleNewPerson}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNewNumber}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {rows()}
    </div>
  )

}

export default App
