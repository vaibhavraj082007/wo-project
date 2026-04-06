import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './SplashScreen.css';

const SplashScreen = () => {
  const [phase, setPhase] = useState('idle'); // 'idle' or 'loading'
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    let timer;
    if (phase === 'loading') {
      // Simple loop to increase progress
      timer = setInterval(() => {
        setProgress((oldProgress) => {
          if (oldProgress >= 100) {
            clearInterval(timer);
            // Wait slightly so user sees 100% then go to next screen
            setTimeout(() => navigate('/role-selection'), 400); 
            return 100;
          }
          return oldProgress + 2; 
        });
      }, 100); 
    }
    return () => clearInterval(timer);
  }, [phase, navigate]);

  const handleStart = () => {
    if (phase !== 'idle') return;
    setPhase('loading');

    // Play sound effect simply
    const audio = new Audio('/clash-royale-startup.mp3');
    audio.play().catch(err => console.log("Audio could not play: ", err));
  };

  return (
    <div className="splash-screen">
      <div className="splash-bg"></div>
      <div className="splash-overlay"></div>

      {phase === 'idle' ? (
        <div className="splash-content splash-fade-in">
          <div className="hero-text-group">
            <h1 className="splash-logo">EduQuest</h1>
            <p className="splash-subtitle">Arena of Knowledge</p>
          </div>
          <button className="enter-arena-btn" onClick={handleStart}>
            <span className="btn-text">Enter Arena</span>
            <span className="btn-shine"></span>
          </button>
        </div>
      ) : (
        <div className="loading-screen splash-fade-in">
          <div className="loading-emblem">⚔️</div>
          <h1 className="loading-title">Entering Arena...</h1>
          <p className="loading-subtitle">Loading your learning world</p>

          <div className="loading-progress-wrapper">
            <div className="loading-progress-bar">
              <div className="loading-progress-fill" style={{ width: `${progress}%` }}></div>
              <div className="loading-progress-shimmer"></div>
            </div>
            <span className="loading-percentage">{progress}%</span>
          </div>

          <div className="loading-tips">
            {progress < 30 && <span>🎓 Tip: Practice daily for best results!</span>}
            {progress >= 30 && progress < 60 && <span>⚡ Tip: Complete quizzes to earn XP!</span>}
            {progress >= 60 && progress < 90 && <span>🏆 Tip: Climb the leaderboard by streaking!</span>}
            {progress >= 90 && <span>🚀 Almost there...</span>}
          </div>
        </div>
      )}
    </div>
  );
};

export default SplashScreen;
