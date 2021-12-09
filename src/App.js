import React, { useState } from 'react'
import Opening from './components/Opening'
import Quiz from './components/Quiz'

function App() {
    const [ isGameStarted, setIsGameStarted ] = useState(false)
    
    function initGame() {
        setIsGameStarted(true)
    }
    
    return (
        <main className='app'>
            {
                !isGameStarted ?
                <Opening initGame={initGame} /> :
                <div className='container'>
                    <Quiz />
                </div>
            }
        </main>
    )
}

export default App