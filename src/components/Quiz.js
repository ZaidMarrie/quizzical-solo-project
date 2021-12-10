import React, { useState, useEffect } from 'react'
import { nanoid } from 'nanoid'
import QuizQuestion from './QuizQuestion'
import QuizAnswer from './QuizAnswer'

function Quiz() {
    const [ quiz, setQuiz ] = useState([])
    
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
                        return { id: nanoid(), answer: answer, isSelected: false }
                    })
                    
                    // Return a new object for each quiz
                    return {
                        question: quiz.question,
                        answers: allAnswers,
                        correctAnswer: quiz.correct_answer
                    }
                }))
            })
    }, [])
    
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
            <button className='btn answer-btn'>Check Answers</button>
        </div>
    )
}

export default Quiz