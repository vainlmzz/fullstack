import React from 'react'

const Person = ( {person, poisto} ) => {

  

    return (
      <div>
        
        <div> {person.name} {person.number}</div>
        <button onClick={poisto}>poista</button>
        </div>
    )
}
      



export default Person