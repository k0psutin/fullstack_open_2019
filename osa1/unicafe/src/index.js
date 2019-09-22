import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({name, handleClick}) => {
    return (
        <button onClick={handleClick}>
            {name}
        </button>
    )
}

const Statistic = ({text, value}) => {
    return (
            <tr>
            <td>{text}</td>
            <td>{value}</td>
            </tr>
    )
}


const Statistics = ({good, neutral, bad}) => {
    let allVotes = good + neutral + bad
    let voteAvg = (good - bad) / allVotes
    let positiveVotes = 100 * (good / allVotes)

    if(allVotes === 0) {
        return (
            <div>
                <p>No feedback given</p>
            </div>
        )
    }

    return (
    <div>
      <h2>statistics</h2>
      <table>
      <Statistic text='good' value={good} />
      <Statistic text='neutral' value={neutral} />
      <Statistic text='bad' value={bad} />
      <Statistic text='all' value={allVotes} />
      <Statistic text='average' value={voteAvg} />
      <Statistic text='positive' value={positiveVotes} />
      </table>
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
      <h1>give feedback</h1>
      <Button name='good' handleClick={() => setGood(good + 1)} />
      <Button name='neutral' handleClick={() => setNeutral(neutral + 1)} />
      <Button name='bad' handleClick={() => setBad(bad + 1)} />
      <Statistics good={good} bad={bad} neutral={neutral}/>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)