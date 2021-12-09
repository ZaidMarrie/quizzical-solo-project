import React, { useState, useEffect } from 'react'
import { nanoid } from 'nanoid'
import QuizQuestion from './QuizQuestion'
import QuizAnswer from './QuizAnswer'

function Quiz() {
    const [ quiz, setQuiz ] = useState([])
    const [ isSelected, setIsSelected ] = useState(false)
    
    function selectAnswer() {
        setIsSelected(prevSelection => !prevSelection)
    }
    
    useEffect(function() {
        fetch('https://opentdb.com/api.php?amount=5&type=multiple')
            .then(res => res.json())
            .then(data => {
                const quizData = data.results
                setQuiz(quizData)
            })
            
    }, [])
    
    const quizElements = quiz.map((item, index) => {
        // Get all answers for each question
        const allAnswers = item.incorrect_answers.map(answer => answer)
        allAnswers.push(item.correct_answer)
        // Rearrange the answers array
        const sortedAnswers = allAnswers.sort()
        
        return (
            <div className='quiz-item' key={nanoid()}>
                <QuizQuestion question={item.question} />
                <div className='quiz-answers'>
                    {sortedAnswers.map(answer => {
                        return (
                            <QuizAnswer 
                                answer={answer} 
                                key={nanoid()}
                                selectAnswer={selectAnswer}
                                isSelected={isSelected}
                            />
                        )
                    })}
                </div>
            </div>
        )
    })
    
    // This is my render return
    return (
        <div className='quiz'>
            <div className='quiz-container'>
                {quizElements}
            </div>
            <button className='btn answer-btn'>Check Answers</button>
        </div>
    )
}

export default Quiz