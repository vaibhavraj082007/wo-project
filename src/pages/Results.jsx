import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { saveQuizScore } from '../utils/trackingStore';
import './Results.css';

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { score = 0, total = 10, aiScore = 0, mode = 'quiz', subjectId = 'math' } = location.state || {};
  let { passed = false } = location.state || {};

  // If arena mode, pass condition is user beating AI
  if (mode === 'arena') {
    passed = score > aiScore;
  }
  
  const [showRewards, setShowRewards] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    // Save the quiz score to tracking store (only once)
    if (!saved) {
      saveQuizScore(subjectId, score, total, mode);
      setSaved(true);
    }

    // Small delay before showing rewards for drama
    const timer = setTimeout(() => setShowRewards(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const percentage = Math.round((score / total) * 100);
  const coinsEarned = score * 10;
  const xpEarned = score * 25;
  const passingScore = 5;

  return (
    <div className={`results-page animate-enter ${passed ? 'victory' : 'defeat'}`}>
      <div className="results-header">
        <h1 className="result-title">{passed ? 'VICTORY!' : 'DEFEAT...'}</h1>
        <p className="result-subtitle">
          {mode === 'arena' 
            ? (passed ? `You outsmarted the AI by ${score} to ${aiScore}!` : `The AI beat you ${aiScore} to ${score}. Better luck next time!`)
            : (passed ? 'You conquered the level!' : `You need ${passingScore} correct to pass.`)}
        </p>
      </div>

      <div className="results-content">
        <div className="game-card card-white score-card">
          <div className="score-circle-container">
            <svg viewBox="0 0 100 100" className="score-circle">
              <circle className="circle-bg" cx="50" cy="50" r="45" />
              <circle 
                className="circle-progress" 
                cx="50" cy="50" r="45" 
                style={{ strokeDasharray: `${percentage * 2.83} 283` }}
              />
            </svg>
            <div className="score-text">
              <span className="score-number">{score}</span>
              <span className="score-total">/ {total}</span>
            </div>
          </div>
          
          <div className={`rewards-section ${showRewards ? 'show' : ''}`}>
            <h3>Rewards Earned</h3>
            <div className="rewards-container">
              <div className="reward-box">
                <span className="reward-icon">🪙</span>
                <span className="reward-val">+{coinsEarned}</span>
              </div>
              <div className="reward-box">
                <span className="reward-icon">⭐</span>
                <span className="reward-val">+{xpEarned} XP</span>
              </div>
              {score === 10 && (
                <div className="reward-box highlight">
                  <span className="reward-icon">💎</span>
                  <span className="reward-val">+5</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="results-actions">
          {!passed && (
            <button className="game-button btn-orange btn-lg action-btn" onClick={() => navigate('/quiz')}>
              RETRY BATTLE
            </button>
          )}
          {passed && (
            <button className="game-button btn-primary btn-lg action-btn" onClick={() => navigate('/map')}>
              NEXT LEVEL
            </button>
          )}
          <button className="game-button btn-white btn-lg action-btn" onClick={() => navigate('/dashboard')}>
             RETURN TO BASE
          </button>
        </div>
      </div>
    </div>
  );
};

export default Results;
