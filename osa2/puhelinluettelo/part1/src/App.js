import React, { useState, useEffect } from 'react'
import Person from './components/Person'
import Filter from './components/Filter'
import Form from './components/Form'

import axios from 'axios'



const App = () => {
  const [ persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNum, setNewNum ] = useState('')
  const [ filter, setFilter] = useState('')

  
  const koukku = () => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }
  useEffect(koukku, [])

  
  const addNum = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNum
    }
    if (persons.some(person => person.name === newName || newName.length === 0) )  {
      window.alert(`${newName} löytyy jo puhelinluettelosta tai nimikenttä on tyhjä`)
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
      
      <Filter filter={filter} handleFilterChange={handleFilterChange}/>
      
      <h2>add a new</h2>
      <Form addNum={addNum} handleNameChange={handleNameChange} handleNumChange={handleNumChange} newName={newName} newNum={newNum}/>
      
      <h2>Numbers</h2>
      <ul>
      {personsToShow.map(person => <div key={person.name}><Person person={person}/></div>)}

      </ul>
     
    </div>
  )

}


export default App