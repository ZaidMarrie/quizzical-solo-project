import React from 'react'

function Opening(props) {
    return (
        <div className='opening'>
            <h1 className='opening-title'>Quizzical</h1>
            <p className='opening-desc'>Some description if needed</p>
            <button className='start-btn btn' onClick={props.initGame}>
                Start quiz
            </button>
        </div>
    )
}

export default Opening