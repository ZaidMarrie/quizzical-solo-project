function QuizQuestion({ question }) {
	return (
		<h2 
			className="quiz__question" 
			dangerouslySetInnerHTML={{ __html: question }}
		>
		</h2>
	);
}

export default QuizQuestion;
