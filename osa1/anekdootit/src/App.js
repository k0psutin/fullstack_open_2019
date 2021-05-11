import React, { useState } from 'react'

const Button = ({ onClicked, text }) => <button onClick={onClicked}>{text}</button>
const Count = ({ text }) => <p>has {text} votes</p>
const MostVotes = ({ text }) => <p>{text}</p>

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]

  const [selected, setSelected] = useState(0)
  const [count, setCount] = useState(0)
  const [mostVotesId, setMostVotesId] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))

  const Randomize = () => {
    const nextIndex = Math.floor(Math.random() * anecdotes.length)
    setCount(votes[nextIndex])
    setSelected(nextIndex)
  }

  const setVote = () => {
    const newVotes = [...votes]
    newVotes[selected] += 1
    setCount(newVotes[selected])
    setMostVotesId((newVotes[mostVotesId] < newVotes[selected]) ? selected : mostVotesId)
    setVotes(newVotes)
  }

  return (
    <div>
      <h2>Anecdote of the day</h2>
      {anecdotes[selected]}
      <Count text={count} />
      <p>
      <Button text='vote' onClicked={setVote} />
      <Button text='next anecdote' onClicked={Randomize} />
      </p>
      <h2>Anecdote with most votes</h2>
      <MostVotes text={anecdotes[mostVotesId]} />
    </div>
  )
}

export default App