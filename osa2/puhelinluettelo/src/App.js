import React, { useState } from 'react'
import Entry from './components/Entry'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')

  const rows = () => persons.map(person => <Entry key={person.name} person={person.name} />)

  const addNewPerson = (event) => {
  // '${newName} is already added to phonebook'
    
    event.preventDefault()

    console.log('Lisätään uusi nimi:', newName)
    const personObject = {
      name: newName,
    }

    if(!persons.some(person => person.name === newName)) {
      console.log('Luotu:', personObject)
      setPersons(persons.concat(personObject))
      setNewName('')
    } else {
      alert(`${newName} is already added to phonebook`)
    }
  }
  

  const handleNewPerson = (event) => {
    console.log('Syötetään uutta nimeä:', event.target.value)
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addNewPerson}>
        <div>
          name: <input value={newName} onChange={handleNewPerson}/>
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
