import React from 'react'


const Header = ( {course} ) => {
  return (
    <div>
      <h1>
        {course.name}
      </h1>
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



//Sovelluksen täytyy nyt toimia riippumatta kurssissa olevien osien määrästä. Eli varmista, että 
//sovellus toimii jos lisäät tai poistat kurssin osia.

//Varmista myös, että konsolissa ei näy mitään virheilmoituksia!



const Content = ( {course} ) => {
  return (
      <div>
        {course.parts.map(part => <ul key={part.id}><Part part={part}/></ul>)}
      </div>
  )
}    


// tässä vaan osan nimi ja teht.määrä
const Part = ( {part} ) => {
  return (
    <div>
      {part.name} {part.exercises}
    </div>
  )
}


  
const App = () => {
  const course = {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  
  return (
    <div>
      <Course course={course} />
    </div>
  )
}

  export default App