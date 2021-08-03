import React, { useState } from 'react'



const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

function ranNum(min, max) {
  return Math.floor(min + Math.random()*(max + 1 - min))
}


function largest(arr) {
  var max = arr[0];
  var maxIndex = 0;

  for (var i = 1; i < Object.keys(arr).length; i++) {
      if (arr[i] > max) {
          maxIndex = i;
          max = arr[i];
      }
  }
  return maxIndex;
}



const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
    ]
  
  const [selected, setSelected] = useState(0)
  const [points, setVote] = useState([0,0,0,0,0,0,0])
  const [mostVotes, setMost] = useState(0)
  
  
  const setSel = (value) => {
    
    return (
      setSelected(value)
    )
  }

  const setVo = () => {
    const copy = {...points}
    copy[selected] += 1
    let most = largest(copy)
    return (
      setVote(copy),
      setMost(most)
      
    )
  }

  
  return (
    <div>
      <h1> Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p> has {points[selected]} votes</p>
      <Button handleClick={() => setVo()} text={"vote"}/> 
      <Button handleClick={() => setSel(ranNum(0,anecdotes.length-1))} text={"next anecdote"}/> 
      <h1> Anecdote with most votes</h1>
      <p>{anecdotes[mostVotes]}</p>
      <p> has {points[mostVotes]} votes</p> 
    </div>
  )
}

export default App