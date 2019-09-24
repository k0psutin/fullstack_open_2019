import React from 'react'

const Entry = ({ name, number, id, handleRemoval }) => {
    return(
        <p>{name} {number} <button onClick={() => handleRemoval(id)}>delete</button></p>
    )
}

export default Entry