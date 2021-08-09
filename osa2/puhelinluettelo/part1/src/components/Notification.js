
import React from 'react'


const Notification = ({ message, name }) => {
    if (message === null) {
      return null
    }
  
    return (
      <div className="message">
        {message} {name}
      </div>
    )
  }

  export default Notification