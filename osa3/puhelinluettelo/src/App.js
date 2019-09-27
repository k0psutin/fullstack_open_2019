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

  const addNewPerson = (event) => {
    event.preventDefault()
    //console.log('Lisätään uusi nimi:', newName)
    const personObject = {
      name: newName,
      number: newNumber,
    }

    if(!persons.find(person => person.name === newName)) {
      //console.log('Luotu:', personObject)
      phonebook
       .create(personObject)
       .then(newPerson => {
         //console.log("addnewPerson .create(personObject)", newPerson)
         setPersons(persons.concat(newPerson))
         setNewName('')
         setNewNumber('')

         setStatusColor('done')
         setStatusMessage(`Added ${newName}`)
         setTimeout(() => {
           setStatusMessage(null)
         }, 5000)
       })

         
      
    } else {
      let replace = window.confirm(`${newName} is already added to phonebook.
      replace the old number with a new one?`)

      if(replace) {
        const person = persons.find(n => n.name === newName)
        const changedPerson = { ...person, number: newNumber}

        //console.log(`changedNumber:`, changedPerson)
        
        phonebook
          .update(changedPerson.id, changedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(n => n.id !== changedPerson.id ? n : returnedPerson))
          }).catch(error => {
             console.log(error)
             setStatusColor('error')
             setStatusMessage(`${newName} was already removed from server`)
             setTimeout(() => {
             setStatusMessage(null)
             }, 5000)
             setPersons(persons.filter(n => n.id !== changedPerson.id))
             
          })
          setStatusColor('done')
          setStatusMessage(`Changed ${newName} number to ${newNumber}`)
          setTimeout(() => {
            setStatusMessage(null)
          }, 5000)
          setNewName('')
          setNewNumber('')
      }
    }
  }

  const handleRemoval = (id) => {
    const personObject = persons.find(n => n.id === id)
    let rmv = window.confirm(`Remove ${personObject.name} ?`)
    if(rmv) {
      //console.log(`Pääsi tarkistuksesta`)
      phonebook
      .remove(id, personObject)
      .then(() => {
         //console.log(`Poistettu id: ${id}`)
         phonebook.getAll()
          .then(newPersons => {
             setPersons(newPersons.map(person => person.id !== id ? person: newPersons))
             //console.log(`Haettu uusi lista`, newPersons)
          })
          setStatusColor('done')
          setStatusMessage(`Succesfully removed ${personObject.name} from phonebook.`)
          setTimeout(() => {
          setStatusMessage(null)
             }, 5000)
      }).catch(error => {
        //console.log(`Handle removal error`)
        setStatusColor('error')
        setStatusMessage(`Information ${personObject.name} has already been removed from server`)
        setTimeout(() => {
          setStatusMessage(null)
        }, 5000)
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
