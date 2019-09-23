import React from 'react'

const PersonForm = ( {addNewPerson, newName, handleNewPerson, newNumber, handleNewNumber }) => {
    return(
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
    )
}

export default PersonForm