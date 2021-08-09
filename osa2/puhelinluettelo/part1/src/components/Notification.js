
import React from 'react'


const Notification = ({ message, name }) => {
    if (message === null) {
      return null
    }

    
    if (message === "on poistettu jo palvelimelta") {
      return (
        <div className="error">
          {name} {message} 
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