import React from 'react'

const Filter = (props) => {
    
    const handleFilterChange = (event) => props.setNameFilter(event.target.value)

    return (
        <>
        <div>
        filter shown with
        <input value={props.nameFilter} onChange={handleFilterChange} />
        </div>
        </>
    )
}

export default Filter