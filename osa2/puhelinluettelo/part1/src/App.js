import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])

  const [ newName, setNewName ] = useState('')
  const [ newNum, setNewNum ] = useState('')
  const [ filter, setFilter] = useState('')

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


  
  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)
    
    
  }


  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumChange = (event) => {
    console.log(event.target.value)
    setNewNum(event.target.value)
  }


  const personsToShow = filter.length===0
    ? persons
    : persons.filter(function(person) {
      return person.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1
  })


  return (
    <div>
      <h1>Phonebook</h1>
      <div>filter with: <input value={filter} 
        onChange={handleFilterChange}
        /></div>
      <h2>add a new</h2>
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
        {personsToShow.map(person => 
            <div key={person.name}>{person.name} {person.number}</div>)}
      </ul>
      
     
    </div>
  )

}

/*
<ul>
  {persons.map(person => <div key={person.name}>{person.name} {person.number}</div>)}
</ul>

const personsToShow = showAll
    ? {persons.map(person => <div key={person.name}>{person.name} {person.number}</div>)}
    : notes.filter(note => note.important === true)


*/
export default App