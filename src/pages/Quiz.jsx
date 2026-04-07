import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Quiz.css';

const QUIZ_QUESTIONS = [
  { id: 1, text: "What is 5 x 6?", options: ["25", "30", "35", "40"], correct: 1, explanation: "Multiplication is repeated addition. 5 added 6 times is 30." },
  { id: 2, text: "Which fraction is the largest?", options: ["1/2", "1/4", "3/4", "1/3"], correct: 2, explanation: "3/4 represents 75% of a whole, which is larger than the others." },
  { id: 3, text: "What is 100 - 45?", options: ["55", "65", "45", "75"], correct: 0, explanation: "Subtracting 40 leaves 60, then subtracting 5 leaves 55." },
  { id: 4, text: "How many sides does a hexagon have?", options: ["5", "6", "7", "8"], correct: 1, explanation: "The prefix 'hexa-' means six." },
  { id: 5, text: "What is the next number: 2, 4, 8, 16, ...?", options: ["24", "30", "32", "64"], correct: 2, explanation: "Each number is multiplied by 2. 16 x 2 = 32." },
  { id: 6, text: "What is 72 divided by 8?", options: ["7", "8", "9", "10"], correct: 2, explanation: "Since 8 x 9 = 72, 72 divided by 8 is 9." },
  { id: 7, text: "Which is an even number?", options: ["21", "35", "42", "59"], correct: 2, explanation: "Numbers ending in 0, 2, 4, 6, or 8 are even." },
  { id: 8, text: "What is 10 x 10?", options: ["100", "1000", "20", "110"], correct: 0, explanation: "Adding a zero to 10 gives 100." },
  { id: 9, text: "What is 1/2 + 1/2?", options: ["1/4", "2/4", "1", "2"], correct: 2, explanation: "Two halves make a whole (1)." },
  { id: 10, text: "What is the perimeter of a 4x4 square?", options: ["8", "12", "16", "20"], correct: 2, explanation: "Perimeter = 4 sides x length. 4 x 4 = 16." }
];

const Quiz = () => {
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes timer
  const navigate = useNavigate();

  const question = QUIZ_QUESTIONS[currentQ];

  // Timer countdown
  useEffect(() => {
    let timer;
    if (timeLeft > 0 && !isAnswered) {
      timer = setInterval(() => {
        setTimeLeft(currentTime => currentTime - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [timeLeft, isAnswered]);

  const handleSelect = (index) => {
    if (isAnswered) return;
    
    setSelected(index);
    setIsAnswered(true);
    
    if (index === question.correct) {
      setScore(currentScore => currentScore + 1);
    }
  };

  const handleNext = () => {
    const isLastQuestion = currentQ === QUIZ_QUESTIONS.length - 1;
    
    if (!isLastQuestion) {
      setCurrentQ(c => c + 1);
      setSelected(null);
      setIsAnswered(false);
    } else {
      const hasPassed = score >= 5;
      navigate('/results', { state: { score, total: QUIZ_QUESTIONS.length, passed: hasPassed, subjectId: 'math' } });
    }
  };

  const getOptionClass = (index) => {
    if (!isAnswered) {
      return selected === index ? 'selected' : '';
    }
    if (index === question.correct) return 'correct';
    if (index === selected) return 'incorrect';
    return '';
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const paddedSeconds = remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;
    return `${minutes}:${paddedSeconds}`;
  };

  return (
    <div className="quiz-page animate-enter">
      <div className="quiz-header">
        <div className="quiz-progress-info">
          <span className="question-count">Question {currentQ + 1} of {QUIZ_QUESTIONS.length}</span>
          <span className="quiz-timer">⏱️ {formatTime(timeLeft)}</span>
        </div>
        <div className="progress-bar thin">
          <div className="progress-fill" style={{ width: `${((currentQ) / QUIZ_QUESTIONS.length) * 100}%` }}></div>
        </div>
      </div>

      <div className="game-card card-white question-card text-center">
        <h2>{question.text}</h2>
      </div>

      <div className="options-grid">
        {question.options.map((opt, idx) => (
          <button 
            key={idx}
            className={`option-btn ${getOptionClass(idx)}`}
            onClick={() => handleSelect(idx)}
            disabled={isAnswered}
          >
            {opt}
          </button>
        ))}
      </div>

      {isAnswered && (
        <div className={`feedback-panel animate-enter ${selected === question.correct ? 'feedback-correct' : 'feedback-incorrect'}`}>
          <div className="feedback-icon">{selected === question.correct ? '✅' : '❌'}</div>
          <div className="feedback-text">
            <h3>{selected === question.correct ? 'Awesome!' : 'Not Quite!'}</h3>
            <p>{question.explanation}</p>
          </div>
        </div>
      )}

      {isAnswered && (
        <div className="quiz-footer">
          <button className="btn btn-primary btn-lg next-btn" onClick={handleNext}>
            {currentQ < QUIZ_QUESTIONS.length - 1 ? 'CONTINUE' : 'FINISH'}
          </button>
        </div>
      )}
    </div>
  );
};

export default Quiz;
