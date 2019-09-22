import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ onClicked, text }) => <button onClick={onClicked}>{text}</button>
const Count = ({ text }) => <p>has {text} votes</p>
const MostVotes = ({ text }) => <p>{text}</p>

let maxVote = 0

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [count, setCount] = useState(0)
  const [highest, setHighest] = useState(0)

  const anecdoteSize = props.anecdotes.length

  const checkHighest = () => {
    if(maxVote < props.votes[selected] == true) {
        maxVote = props.votes[selected]
        setHighest(selected)
    }
  }
  
  const Randomize = () => () => {
    setSelected(Math.floor(Math.random() * anecdoteSize))
    setCount(props.votes[selected])
    checkHighest()
  }

  const setVote = () => () => {
    props.votes[selected] += 1
    setCount(props.votes[selected])
    checkHighest()
  }

  return (
    <div>
      <h2>Anecdote of the day</h2>
      {props.anecdotes[selected]}
      <Count text={props.votes[selected]} />
      <p>
      <Button text='vote' onClicked={setVote()} />
      <Button text='next anecdote' onClicked={Randomize()} />
      </p>
      <h2>Anecdote with most votes</h2>
      <MostVotes text={props.anecdotes[highest]} />
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

let votes = Array(anecdotes.length).fill(0)

ReactDOM.render(
  <App anecdotes={anecdotes} votes={votes}/>,
  document.getElementById('root')
)