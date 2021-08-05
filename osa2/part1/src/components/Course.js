import React from 'react'



const Header = ( {course} ) => {
    return (
      <div>
        <h2>
          {course.name}
        </h2>
      </div>
    )
  }
  
  const Course = ( {course} ) => {
    return (
      <div>
        <Header course={course}/>
        <Content course={course}/>
        <Total course={course}/>
      </div>
    )
  }
  
  
  const Total = ( {course} ) => {
    return (
      <div>
        <h4>
          Total of {course.parts.reduce(function(sum, parts) {
                        return sum + parts.exercises},
                      0)
                   } exercises
        </h4>
      </div>
    )
  }
  

  const Content = ( {course} ) => {
    return (
        <div>
          {course.parts.map(part => <ul key={part.id}><Part part={part}/></ul>)}
        </div>
    )
  }    
  
  
  const Part = ( {part} ) => {
    return (
      <div>
        {part.name} {part.exercises}
      </div>
    )
  }
  
  export default Course
  