import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Arena.css';
import { generateQuestions, shuffleArray } from '../utils/questionGenerator';

const Arena = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { level, difficulty, subjectId, classId } = location.state || { level: { name: 'Basic Addition' }, difficulty: 'easy', subjectId: 'math', classId: '6' };

  const totalQuestions = 10;
  
  // State for questions and AI behavior
  const [questions, setQuestions] = useState([]);
  const [aiAnswers, setAiAnswers] = useState([]);

  // Generate on load
  useEffect(() => {
    const generated = generateQuestions(level.name, totalQuestions, subjectId);
    setQuestions(generated);

    let wrongCount = 5;
    if (difficulty === 'medium') wrongCount = 3;
    if (difficulty === 'hard') wrongCount = 1;

    let answers = [];
    for (let i = 0; i < totalQuestions; i++) {
      if (i < wrongCount) {
        answers.push(false);
      } else {
        answers.push(true);
      }
    }
    // simple shuffle will happen inside shuffleArray
    setAiAnswers(shuffleArray(answers));
  }, [level.name, difficulty, subjectId]);

  // Game State
  const [currentQ, setCurrentQ] = useState(0);
  const [userSelected, setUserSelected] = useState(null);
  const [aiSelected, setAiSelected] = useState(null);
  
  const [userScore, setUserScore] = useState(0);
  const [aiScore, setAiScore] = useState(0);
  
  const [phase, setPhase] = useState('waiting'); // waiting, ai-thinking, revealed

  if (questions.length === 0 || aiAnswers.length === 0) {
    return <div>Loading...</div>;
  }

  const question = questions[currentQ];

  const handleSelect = (idx) => {
    if (phase !== 'waiting') return;
    setUserSelected(idx);
    setPhase('ai-thinking');

    // Simulate AI thinking delay with basic timeout
    setTimeout(() => {
      const getsCorrect = aiAnswers[currentQ];
      let aiGuess = question.correct;
      
      if (!getsCorrect) {
        // Pick a random incorrect index
        const wrongIndices = [];
        for (let i = 0; i < 4; i++) {
          if (i !== question.correct) {
            wrongIndices.push(i);
          }
        }
        const randomIdx = Math.floor(Math.random() * wrongIndices.length);
        aiGuess = wrongIndices[randomIdx];
      }

      setAiSelected(aiGuess);
      setPhase('revealed');

      // Update Scores
      if (idx === question.correct) setUserScore(s => s + 1);
      if (getsCorrect) setAiScore(s => s + 1);

    }, 1000); 
  };

  const handleNext = () => {
    if (currentQ < totalQuestions - 1) {
      setCurrentQ(c => c + 1);
      setUserSelected(null);
      setAiSelected(null);
      setPhase('waiting');
    } else {
      // End game
      navigate('/results', { state: { score: userScore, total: totalQuestions, aiScore, mode: 'arena' } });
    }
  };

  const getUserOptionClass = (idx) => {
    if (phase !== 'revealed') {
      if (userSelected === idx) return 'user-selected';
      return '';
    }
    if (idx === question.correct) return 'correct';
    if (idx === userSelected) return 'incorrect';
    return '';
  };

  return (
    <div className="arena-battle-page animate-enter">
      
      {/* Scoreboard */}
      <div className="arena-scoreboard">
        <div className="score-panel player-panel">
          <div className="score-avatar">🧑‍🎓</div>
          <div className="score-info">
            <h4>You</h4>
            <div className="score-value">{userScore}</div>
          </div>
        </div>

        <div className="vs-badge">VS</div>

        <div className="score-panel ai-panel">
          <div className="score-info">
            <h4>AI ({difficulty.toUpperCase()})</h4>
            <div className="score-value">{aiScore}</div>
          </div>
          <div className="score-avatar">🤖</div>
        </div>
      </div>

      <div className="arena-progress">
        <span>Question {currentQ + 1} / {totalQuestions}</span>
        <div className="progress-bar thin">
          <div className="progress-fill" style={{ width: `${((currentQ) / totalQuestions) * 100}%` }}></div>
        </div>
      </div>

      {/* Question */}
      <div className="game-card card-dark arena-question-card">
        <h2>{question.text}</h2>
      </div>

      {/* Options */}
      <div className="arena-options-grid">
        {question.options.map((opt, idx) => (
          <button 
            key={idx}
            className={`arena-option-btn ${getUserOptionClass(idx)}`}
            onClick={() => handleSelect(idx)}
            disabled={phase !== 'waiting'}
          >
            {opt}
            
            {/* Show AI marker if revealed and it picked this */}
            {phase === 'revealed' && aiSelected === idx && (
              <span className="ai-marker animate-bounce">🤖</span>
            )}
          </button>
        ))}
      </div>

      {/* Status or Next Button */}
      <div className="arena-action-area">
        {phase === 'ai-thinking' && (
          <div className="ai-thinking-indicator">
            AI is thinking<span className="dots">...</span>
          </div>
        )}
        
        {phase === 'revealed' && (
          <div className="reveal-panel animate-enter">
            <div className={`reveal-msg ${userSelected === question.correct ? 'win-text' : 'loss-text'}`}>
              {userSelected === question.correct ? "You got it right! 🎉" : "Not quite! 😕"}
            </div>
            <div className="ai-reveal-msg">
              {aiAnswers[currentQ] ? "AI got it right." : "AI made a mistake!"}
            </div>
            <button className="btn btn-primary btn-lg arena-next-btn" onClick={handleNext}>
              {currentQ < totalQuestions - 1 ? 'NEXT QUESTION 👉' : 'SEE RESULTS 🏆'}
            </button>
          </div>
        )}
      </div>

    </div>
  );
};

export default Arena;
