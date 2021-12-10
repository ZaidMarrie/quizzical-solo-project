import React, { useState, useEffect } from 'react'
import { nanoid } from 'nanoid'
import QuizQuestion from './QuizQuestion'
import QuizAnswer from './QuizAnswer'
import blobTop from './images/blob-quiz-top.png'
import blobBottom from './images/blob-quiz-bottom.png'

function Quiz() {
    const [ quiz, setQuiz ] = useState([])
    const [ checkedAnswers, setCheckedAnswers ] = useState(false)
    const [ score, setScore ] = useState(0)
    const [ isStartOver, setIsStartingOver ] = useState(false)
    
    // This function rearranges an array
    function shuffleArr(array) {
        for(let i = array.length - 1; i > 0; i--) {
            let randomIndex = Math.floor(Math.random() * (i + 1))
            let temp = array[i]
            array[i] = array[randomIndex]
            array[randomIndex] = temp
        }
        return array
    }
    
    function selectAnswer(id) {
        setQuiz(prevQuiz => prevQuiz.map(item => {
            // Change isSelected value for answer matching id
            const updatedAnswers = item.answers.map(answer => {
                if (answer.id === id) {
                    return { ...answer, isSelected: !answer.isSelected }
                } else {
                    return answer
                }
            })
            
            // Return updated state
            return { ...item, answers: updatedAnswers }
        }))        
    }
    
    function checkAnswers() {
        setCheckedAnswers(true)
        
        // map over each quiz item
        setQuiz(prevQuiz => prevQuiz.map(quizItem => {
            const checkedUserAnswers = quizItem.answers.map(answer => {
                if (answer.isSelected && answer.answer === quizItem.correctAnswer) {
                    setScore(prevScore => prevScore + 1) // Increment score
                    return { ...answer, isCorrect: true }
                } else {
                    return answer
                }
            })
            
            return { ...quizItem, answers: checkedUserAnswers }
        }))
    }
    
    function startNewGame() {
        setIsStartingOver(true)
    }
    
    useEffect(function() {
        fetch('https://opentdb.com/api.php?amount=5&type=multiple')
            .then(res => res.json())
            .then(data => {
                setQuiz(prevQuiz => data.results.map(quiz => {
                    // Get all quiz answers
                    const answerArr = [...quiz.incorrect_answers, quiz.correct_answer]
                    const sortedAnswers = shuffleArr(answerArr)
                    
                    // Assign an id prop and isSelected prop to each answer
                    const allAnswers = sortedAnswers.map(answer => {
                        return { id: nanoid(), answer: answer, isSelected: false, isCorrect: false }
                    })
                    
                    // Return a new object for each quiz
                    return {
                        question: quiz.question,
                        answers: allAnswers,
                        correctAnswer: quiz.correct_answer,
                    }
                }))
                
                // Reset all state
                setScore(0)
                setCheckedAnswers(false)
            })
    }, [isStartOver])
    
    // Map over quiz in state to create list
    const quizElements = quiz.map(quizItem => {
        return (
            <div className='quiz-item' key={nanoid()}>
                <QuizQuestion question={quizItem.question} />
                <div className='quiz-answers'>
                    {quizItem.answers.map(quizAnswer => {
                        return (
                            <QuizAnswer 
                                key={quizAnswer.id}
                                answer={quizAnswer.answer}
                                isSelected={quizAnswer.isSelected}
                                isCorrect={quizAnswer.isCorrect}
                                checkedAnswers={checkedAnswers}
                                correctAnswer={quizItem.correctAnswer}
                                selectAnswer={() => selectAnswer(quizAnswer.id)}
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
            {checkedAnswers && (
                <div className='score-container'>
                    <span>You scored {score}/5 correct answers</span>
                    <button className='btn answer-btn' onClick={startNewGame} >
                        Play again
                    </button>
                </div>)
            }
            
            {
                !checkedAnswers && 
                <button className='btn answer-btn mt-1' onClick={checkAnswers} >Check Answers</button>
            }

            {/* Decorative Elements(blobs) */}
            <img src={blobTop} alt='' aria-hidden='true' className='quiz-blob-top' />
            <img src={blobBottom} alt='' aria-hidden='true' className='quiz-blob-bottom' />
        </div>
    )
}

export default Quiz