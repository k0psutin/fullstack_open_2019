import React from 'react'

const Entry = ({ name, number, id, handleRemoval }) => {
    return(
            <p key={id}>{name} {number} <button onClick={() => handleRemoval(id)}>delete</button></p>
    )
}

export default Entry