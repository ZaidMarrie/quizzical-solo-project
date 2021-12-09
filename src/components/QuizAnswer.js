import React from 'react'

function QuizAnswer(props) {
    
    return (
        <span 
            className={props.isSelected ? 'quiz-answer selected' : 'quiz-answer'}
            onClick={props.selectAnswer}        
        >
            {props.answer}
        </span>
    )
}

export default QuizAnswer