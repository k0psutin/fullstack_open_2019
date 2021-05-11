import React from 'react'

const Header = (course) => {
    return (
        <div>
            <h1>{course.name}</h1>
        </div>
    )
}

const Content = (prop) => {
    return (
        <div>
        { prop.parts.map(({ name, exercises }) => <Part name={ name } exercises={ exercises }/> ) }
        </div>
    )
}

const Part = (props) => {
    return (
        <div>
        <p>
            {props.name} {props.exercises}
        </p>
        </div>
    )
}

const Total = (props) => {
    return (
        <div>
        <p>Number of exercises {
            props.parts.reduce((prev, current) => { return prev + current.exercises }, 0) 
        } 
        </p>
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

export default App
