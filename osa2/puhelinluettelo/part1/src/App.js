import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas',
      number: '050 000' },
    { name: 'Pekka Kuusi',
      number: '050 111' }, 
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNum, setNewNum ] = useState('')

  const addNum = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNum
    }
     

    if (persons.some(person => person.name === newName || newName.length === 0) )  {
      window.alert(`${newName} löytyy jo puhelinluettelosta tai numerolla ei ole nimeä`)
    }
    else {
      setPersons(persons.concat(nameObject))
      setNewName('')
      setNewNum('')
    }
    
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumChange = (event) => {
    console.log(event.target.value)
    setNewNum(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addNum}>
        <div>name: <input value={newName} 
        onChange={handleNameChange}
        /></div>
        <div>number: <input value={newNum} 
        onChange={handleNumChange}
        /></div>
        <button type="submit">save</button>
      </form> 
      <h2>Numbers</h2>
      <ul>
      {persons.map(person => <div key={person.name}>{person.name} {person.number}</div>)}
      </ul>
     
    </div>
  )

}

export default App