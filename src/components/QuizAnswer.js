import React from 'react'

function QuizAnswer(props) {
    let styles
    if(props.isCorrect && props.isSelected) {
        styles = {backgroundColor: '#94D7A2'}
    } else if(props.isSelected && props.checkedAnswers && props.answer !== props.correctAnswer) {
        styles = {backgroundColor: '#F8BCBC'}
    } else if (props.isSelected) {
        styles =  {backgroundColor: '#D6DBF5'}
    }
    
    if(props.checkedAnswers && !props.isSelected && props.answer === props.correctAnswer) {
        styles = {backgroundColor: '#94D7A2'}
    }
    
    return (
        <span 
            className='quiz-answer'
            style={styles}
            onClick={props.selectAnswer}
        >
            {props.answer}
        </span>
    )
}

export default QuizAnswer