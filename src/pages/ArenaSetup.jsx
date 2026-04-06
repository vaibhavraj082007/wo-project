import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './ArenaSetup.css';

const ArenaSetup = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedDifficulty, setSelectedDifficulty] = useState(null);

  // We optionally expect level data passed from LearningMap
  const levelData = location.state?.level || { id: 1, name: 'Basic Addition' };

  const classId = location.state?.classId || '6';

  const handleStart = () => {
    if (!selectedDifficulty) return;
    navigate('/arena', {
      state: {
        level: levelData,
        difficulty: selectedDifficulty,
        subjectId: location.state?.subjectId || 'math',
        classId: classId
      }
    });
  };

  return (
    <div className="arena-setup-page animate-enter">
      <div className="setup-header">
        <h1>{levelData.name} Arena</h1>
        <p>Choose your difficulty vs the AI opponents!</p>
      </div>

      <div className="difficulty-grid">
        <div
          className={`game-card card-glass difficulty-card diff-green ${selectedDifficulty === 'easy' ? 'selected' : ''}`}
          onClick={() => setSelectedDifficulty('easy')}
        >
          <div className="diff-icon">😊</div>
          <h3 className="diff-title">Easy</h3>
          <p className="diff-desc">AI makes many mistakes. Perfect for practice!</p>
        </div>

        <div
          className={`game-card card-glass difficulty-card diff-yellow ${selectedDifficulty === 'medium' ? 'selected' : ''}`}
          onClick={() => setSelectedDifficulty('medium')}
        >
          <div className="diff-icon">😎</div>
          <h3 className="diff-title">Medium</h3>
          <p className="diff-desc">AI puts up a fair fight. Try your best!</p>
        </div>

        <div
          className={`game-card card-glass difficulty-card diff-red ${selectedDifficulty === 'hard' ? 'selected' : ''}`}
          onClick={() => setSelectedDifficulty('hard')}
        >
          <div className="diff-icon">😈</div>
          <h3 className="diff-title">Hard</h3>
          <p className="diff-desc">AI almost never misses. A true challenge!</p>
        </div>
      </div>

      <div className="setup-footer">
        <button 
          className="btn btn-primary btn-lg start-battle-btn"
          disabled={!selectedDifficulty}
          onClick={handleStart}
        >
          ENTER BATTLE ⚔️
        </button>
      </div>
    </div>
  );
};

export default ArenaSetup;
