import React from 'react'

const Header = ({ name }) => <div><h1>{name}</h1></div>

const Course = ({ course }) => course.map(course => 
        <div key={Object.keys(course.parts)}>			
        <Header name={course.name}/>
        <Content parts={course.parts}/>
        <Total parts={course.parts}/>	
        </div>			
    )					


const Content = ({ parts }) => parts.map((parts) =>
        <dl key={parts.id}>
        <Part part={parts.name} number={parts.exercises}/>
        </dl>
)

const Part = ({ part, number }) => <dt>{part} {number}</dt>

const Total = ({ parts }) => {
    const total = parts.reduce((s, p) => s + p.exercises, 0)
    return (
        <div>
        <p><b>total of {total} exercises </b></p>
        </div>
    )
}

export default Course

