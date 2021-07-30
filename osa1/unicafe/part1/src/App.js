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

const Display = (props) => {
  return (
    <div>{props.name} {props.lkm}</div>
  )
}



const Statistics = (props) => {
  return (
  <div>
  <Header name={"statistics"} />
  <Display name={"good"} lkm={props.good}/>
  <Display name={"neutral"} lkm={props.neutral}/>
  <Display name={"bad"} lkm={props.bad}/>
  <Display name={"all"} lkm={props.good + props.neutral + props.bad}/>
  <Display name={"average"} lkm={(props.good - props.bad) / (props.good+props.neutral+props.bad)}/>
  <Display name={"positive"} lkm={(props.good/ (props.good+props.neutral+props.bad)*100) + " %"}/>

  </div>
  )
}


const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  

  return (
    <div>
      <Header name={"give feedback"} />
      <button onClick={() => setGood(good + 1)}> 
        good
      </button>
      <button onClick={() => setNeutral(neutral + 1)}> 
        neutral
      </button>
      <button onClick={() => setBad(bad + 1)}> 
        bad
      </button>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
    )
  }
  
    export default App