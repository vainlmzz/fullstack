import React from 'react'


const Form = ( {addNum, handleNameChange, handleNumChange, newName, newNum} ) => {
    return (
        <form onSubmit={addNum}>
        <div>name: <input value={newName} 
        onChange={handleNameChange}
        /></div>
        <div>number: <input value={newNum} 
        onChange={handleNumChange}
        /></div>
        <button type="submit">save</button>
      </form> 
    )
  }

export default Form