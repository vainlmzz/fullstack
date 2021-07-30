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
      <Header name={"statistics"} />
      <Display name={"good"} lkm={good}/>
      <Display name={"neutral"} lkm={neutral}/>
      <Display name={"bad"} lkm={bad}/>
    </div>
    )
  }
  
    export default App