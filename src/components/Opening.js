import React from 'react'
import blobTop from './images/blobs1.png'
import blobBottom from './images/blob5.png'

function Opening(props) {
    return (
        <div className='opening'>
            <h1 className='opening-title'>Quizzical</h1>
            <p className='opening-desc'>Some description if needed</p>
            <button className='start-btn btn' onClick={props.initGame}>
                Start quiz
            </button>

            {/* Decorative Elements(blobs) */}
            <img src={blobTop} alt='' aria-hidden='true' className='opening-blob-top' />
            <img src={blobBottom} alt='' aria-hidden='true' className='opening-blob-bottom' />
        </div>
    )
}

export default Opening