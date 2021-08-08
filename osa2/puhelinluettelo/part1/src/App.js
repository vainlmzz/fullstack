import React, { useState, useEffect } from 'react'
import Person from './components/Person'
import Filter from './components/Filter'
import Form from './components/Form'
import Persons from './services/persons'




const App = () => {
  const [ persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNum, setNewNum ] = useState('')
  const [ filter, setFilter] = useState('')

  
  const koukku = () => {
    Persons
      .haeKaikki()
      .then(personS => {
        setPersons(personS)
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

      Persons
        .luoP(nameObject)
        .then(luotuP => {
            setPersons(persons.concat(luotuP))
            setNewName('')
            setNewNum('')
          })
    }  
  }

  const delNum = person => {
    
    const nameObject = person
    const id = person.id
    const newPersons = persons.filter(person => person.id !== id)
    if ( window.confirm(`Poistetaanko ${person.name} luettelosta`)) {
      Persons
      .poistaP(id, nameObject )
      .then( setPersons(newPersons)) 
    }  
  }

/*
  const toggleImportanceOf = id => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }
  
    noteService
    .update(id, changedNote)
      .then(returnedNote => {
      setNotes(notes.map(note => note.id !== id ? note : returnedNote))
    })
    .catch(error => {
      alert(
        `the note '${note.content}' was already deleted from server`
      )
      setNotes(notes.filter(n => n.id !== id))
    })    
  }
  
*/

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
      {personsToShow.map(person => <div key={person.name}><Person person={person} poisto={() => delNum(person)}/></div>)}
      
      </ul>
     
    </div>
  )

}


export default App