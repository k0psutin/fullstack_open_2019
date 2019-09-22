import React from 'react'
import ReactDOM from 'react-dom'

const Header = (course) => {
    return (
        <div>
            <h1>{course.name}</h1>
        </div>
    )
}

const Content = (parts) => {
    console.log('Osa: ' + parts.parts[0].name)
    console.log('Harjoitukset: ' + parts.parts[0].exercises)
    
    return (
        <div>
        <Part part={parts.parts[0].name} number={parts.parts[0].exercises}/>
        <Part part={parts.parts[1].name} number={parts.parts[1].exercises}/>
        <Part part={parts.parts[2].name} number={parts.parts[2].exercises}/>
        </div>
    )
}

const Part = (exercises) => {
    console.log(exercises)
    return (
        <div>
        <p>
            {exercises.part} {exercises.number}
        </p>
        </div>
    )
}

const Total = (parts) => {
    console.log(parts)
    return (
        <div>
        <p>Number of exercises {parts.parts[0].exercises + parts.parts[1].exercises + parts.parts[2].exercises} </p>
        </div>
    )
}

const App = () => {
    const course = {
    name: 'Half Stack application development',
    parts: [
    {
        name: 'Fundamendals of React',
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
            <Header name={course.name}/>
            <Content parts={course.parts}/>
            <Total parts={course.parts}/>
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))