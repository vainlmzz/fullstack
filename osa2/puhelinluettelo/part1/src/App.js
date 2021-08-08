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

    if (newNum.length===0 || newName.length === 0)   {
      window.alert(`täytä molemmat kentät`)
    }
    else if (persons.some(person => person.name === newName && person.number === newNum))   {
      window.alert(`Numero löytyy jo`)
      setNewName('')
      setNewNum('')
      return
    }
    else if (persons.some(person => person.name === newName && person.number !== newNum))  {
      const id = haeId(newName)
      
      
      if (window.confirm(`${newName} löytyy jo puhelinluettelosta, korvataanko vanha numero numerolla ${newNum}`)) {
        Persons
          .muokkaaP(id, nameObject)
          .then(muokattuP => {
              persons.splice(id-1,1, muokattuP)
              setPersons(persons)
              setNewName('')
              setNewNum('')
          })

      }
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


  function haeId(name) {
    return (
        persons.find(person => person.name === name).id
        
    )
  }

  const delNum = person => {
    
    const nameObject = person
    const id = person.id
    const newPersons = persons.filter(person => person.id !== id)
    if ( window.confirm(`Poistetaanko ${person.name} luettelosta`)) {
      Persons
      .poistaP(id, nameObject )
      .then(setPersons(newPersons)) 
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
      {personsToShow.map(person => <div key={person.name}><Person person={person} poisto={() => delNum(person)}/></div>)}
      
      </ul>
     
    </div>
  )

}


export default App