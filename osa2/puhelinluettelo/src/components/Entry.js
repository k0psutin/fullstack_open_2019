import React from 'react'

const Entry = (persons) => {
    return(
        <p>{persons.name} {persons.number}</p>
    )
}

export default Entry