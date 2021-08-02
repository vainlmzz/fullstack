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
      <StatisticLine text="good" value ={props.good} />
      <StatisticLine text="neutral" value ={props.neutral} />
      <StatisticLine text="bad" value ={props.bad} />
      <StatisticLine text="average" value ={(props.good - props.bad) / (props.good+props.neutral+props.bad)} />
      <StatisticLine text="positive" value ={(props.good/ (props.good+props.neutral+props.bad)*100) + " %"} />
  
    </div>
  )
}

const StatisticLine = (props) => {
  return (
  <div>
  {props.text} {props.value}
  </div>
  )
}


const App = () => {
  // tallenna napit omaan tilaansa
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
  
    
  /*
  <Button handleClick={() => setValueG(good+1)} text={"good"} />
  <Button handleClick={() => setValueN(neutral+1)} text={"neutral"} />
  <Button handleClick={() => setValueB(bad+1)} text={"bad"} />
  */
  export default App