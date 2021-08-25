import { CoursePart } from "../types"

import "./Components.css"

interface ContentProps {
    courseParts: CoursePart[]
}

const typeChecking = (courseParts: CoursePart[]) => courseParts.map(course => {
    switch (course.type) {
        case "normal":
            return (
                <>
                <p>
                <span className="title">{course.name} {course.exerciseCount}</span>
                <br></br>
                <span className="description">{course.description}</span>
                <br></br>
                </p>
                </>
            )
        case "groupProject":
            return (
                <>
                <p>
                <span className="title">{course.name} {course.exerciseCount}</span>
                <br></br>
                projects exercises {course.groupProjectCount}
                </p>
                </>
            )
        case "submission":
            return (
                <>
                <p>
                <span className="title">{course.name} {course.exerciseCount}</span>
                <br></br>
                <span className="description">{course.description}</span>
                <br></br>
                submit to {course.exerciseSubmissionLink}
                </p>
                </>
            )
        default:
            return null
    }
})

const Content = ({ courseParts }: ContentProps) => <> {typeChecking(courseParts)} </>

export default Content