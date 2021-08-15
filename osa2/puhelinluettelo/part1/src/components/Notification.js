
import React from 'react'


const Notification = ({ message, name }) => {
    if (message === null) {
      return null
    }

    
    if (name === "error") {
      return (
        <div className="error">
          {message} 
        </div>
      )
    }
    
    else return (
      <div className="message">
        {message} {name}
      </div>
    )
  }

  export default Notification