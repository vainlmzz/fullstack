import React from 'react'


const Header = (props) => {
  return (
    <div>
      <h1>
        {props.name}
      </h1>
    </div>
  )
}


const Content = (props) => {
  return (
    <div>
      <Part name1={props.parts[0].name} exercises1={props.parts[0].exercises}/>
      <Part name2={props.parts[1].name} exercises2={props.parts[1].exercises}/>
      <Part name3={props.parts[2].name} exercises3={props.parts[2].exercises}/>
    </div>
  )
}    


const Total = (props) => {
  return (
    <div>
      <p>
        Number of exercises:  {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}
      </p>
    </div>
  )
}



const Part = (props) => {
  return (
    <div>
      <p>
        {props.name1} {props.exercises1}
      </p>
      <p>
        {props.name2} {props.exercises2}
      </p>
      <p>
        {props.name3} {props.exercises3}
      </p>
      
    </div>
  )
}


  
const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }


  return (
  <div>
    <Header name={course.name} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
  </div>
  )
}

  export default App