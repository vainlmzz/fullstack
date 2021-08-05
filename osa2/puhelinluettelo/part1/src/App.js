import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')

  const addNum = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName
    }
  
    setPersons(persons.concat(nameObject))
    setNewName('')
  }

  const handleNumChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addNum}>
        <input value={newName} 
        onChange={handleNumChange}
        />
        <button type="submit">save</button>
      </form> 
      <h2>Numbers</h2>
      <ul>
      {persons.map(person => <div key={person.name}>{person.name}</div>)}
      </ul>
     
    </div>
  )

}

export default App