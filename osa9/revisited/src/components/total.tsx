import { CoursePart } from "../types"

import "./Components.css"

interface TotalProps {
    courseParts: CoursePart[]
}

const Total = ({ courseParts }: TotalProps) => {
    return (
        <>
        <p className="title">
            Number of exercises: {courseParts.reduce((acc, curr) => acc + curr.exerciseCount, 0)}
        </p>
        </>
    )
}

export default Total