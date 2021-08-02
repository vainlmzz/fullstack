import React, { useState } from 'react'


const Header = (props) => {
  return (
    <div>
      <h1>
        {props.name}
      </h1>
    </div>
  )
}


const History = (props) => {
  if (props.good + props.neutral + props.bad === 0) {
    return (
      <div>
        <h1> Statistics</h1>
        
        No feedback given
      </div>
    )
  }
  return (
    <div>
      <Statistics good={props.good} neutral={props.neutral} bad={props.bad}/>
    </div>
  )
}

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)


const Statistics = (props) => {

  return(
    <div>
      <h1>Statistics</h1>
      
      <table>
        <thead>
          <tr>
            <td>good</td>
            <td><StatisticLine value ={props.good} /></td>
          </tr>
          <tr>
            <td>neutral</td>
            <td><StatisticLine value ={props.neutral} /></td>
          </tr>
          <tr>
            <td>bad</td>
            <td><StatisticLine value ={props.bad} /></td>  
          </tr>
          <tr>
            <td>all</td>
            <td><StatisticLine value ={props.good + props.neutral + props.bad} /></td>  
          </tr>
          <tr>
            <td>average</td>
            <td><StatisticLine value ={(props.good - props.bad) / (props.good+props.neutral+props.bad)}/></td>  
          </tr>
          <tr>
            <td>positive</td>
            <td><StatisticLine value ={(props.good/ (props.good+props.neutral+props.bad)*100) + " %"}/></td>  
          </tr>
          </thead>
      </table>
    </div>
  )
}

const StatisticLine = (props) => {
  return (
  <div>
  {props.value}
  </div>
  )
}


const App = () => {
  
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const setValueG = (value) => {
    return (
      setGood(value)
    )
  }

  const setValueN = (value) => {
    return (
      setNeutral(value)
    )
  }

  const setValueB = (value) => {
    return (
      setBad(value)
    )
    
  }

  return (
    <div>
      <Header name={"give feedback"} />
      <Button handleClick={() => setValueG(good+1)} text={"good"}/> 
      <Button handleClick={() => setValueN(neutral+1)} text={"neutral"}/>
      <Button handleClick={() => setValueB(bad+1)} text={"bad"}/>  
      <History good={good} neutral={neutral} bad={bad} />
    </div>
    )
  }
  
    
  export default App