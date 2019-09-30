import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import phonebook from './services/phonebook'
import './index.css'

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')
  const [ statusMessage, setStatusMessage ] = useState(null)
  const [ statusColor, setStatusColor ] = useState('done')

  useEffect(() => {
    phonebook
      .getAll()
      .then(initialPersons => {
         setPersons(initialPersons)
      })
  }, [])

  const handleStatus = ( color, message ) => {
    setStatusColor(color)
    setStatusMessage(message)
    setTimeout(() => {
      setStatusMessage(null)
    }, 5000)
}

  const addNewPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
    }

    if(!persons.find(person => person.name === newName)) {
      phonebook
       .create(personObject)
       .then(newPerson => {
         setPersons(persons.concat(newPerson))
         setNewName('')
         setNewNumber('')

         handleStatus('done', `Added ${newName}`)
       })
        .catch(error => {
          handleStatus('error', `${error.response.data.error}`)
        })

         
      
    } else {
      let replace = window.confirm(`${newName} is already added to phonebook.
      replace the old number with a new one?`)

      if(replace) {
        const person = persons.find(n => n.name === newName)
        const changedPerson = { ...person, number: newNumber}

        phonebook
          .update(changedPerson.id, changedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(n => n.id !== changedPerson.id ? n : returnedPerson))
          }).catch(() => {
             handleStatus(`error`, `${newName} was already removed from server`)
             setPersons(persons.filter(n => n.id !== changedPerson.id))
          })
          handleStatus('done',`Changed ${newName} number to ${newNumber}`)
          setNewName('')
          setNewNumber('')
      }
    }
  }

  const handleRemoval = (id) => {
    const personObject = persons.find(n => n.id === id)
    let rmv = window.confirm(`Remove ${personObject.name} ?`)
    if(rmv) {
      phonebook
      .remove(id, personObject)
      .then(() => {
         phonebook.getAll()
          .then(newPersons => {
             setPersons(newPersons.map(person => person.id !== id ? person: newPersons))
          })
          handleStatus('done', `Succesfully removed ${personObject.name} from phonebook.`)
      }).catch(() => {
        handleStatus('error', `Information ${personObject.name} has already been removed from server`)
        setPersons(persons.filter(n => n.id !== persons.id))
      })
    }    
  }

  const handleNewPerson = (event) => {
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilter = (event) => {
    setFilter(event.target.value)
  }

  const Status = ({ message }) => {
    if (message === null) {
      return null
    }

    return(
      <div className={statusColor}>
        {message}
      </div>
    )
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Status message={statusMessage} />
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
        handleRemoval={handleRemoval}
      />
    </div>
  )

}

export default App
