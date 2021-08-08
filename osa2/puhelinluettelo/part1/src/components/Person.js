import React from 'react'

const Person = ( {person, poisto} ) => {

  

    return (
      <div>
        
        <div> {person.name} {person.number}</div>
        <button onClick={poisto}>poista</button>
        </div>
    )
}
      


  /*

  const delNum = (event) => {
  event.preventDefault()
  
  if ( window.confirm(`Poistetaanko ${event.target.value} luettelosta`)) {
    console.log('poisto tässä')    
  }  
}



  <div>{person.name} {person.number}  </div>

  Persons
        .poistaP(nameObject)
  */


export default Person