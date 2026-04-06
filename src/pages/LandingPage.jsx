import { Link } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-page animate-enter">
      <div className="hero-section">
        <div className="hero-badge">🌟 Class 1 - 10</div>
        <h1 className="hero-title">Step into the Arena of Knowledge!</h1>
        <p className="hero-subtitle">Conquer your studies, earn epic rewards, and climb the leaderboards in the ultimate learning adventure.</p>
        
        <div className="hero-actions">
          <Link to="/signup">
            <button className="game-button btn-orange btn-lg pulse-animation">START LEARNING FREE</button>
          </Link>
          <Link to="/login">
            <button className="game-button btn-white btn-lg">LOGIN TO PLAY</button>
          </Link>
        </div>
      </div>

      <div className="features-section">
        <h2 className="section-title">Why Parents & Students Love EduQuest</h2>
        <div className="features-grid">
          <div className="game-card card-blue">
            <div className="feature-icon">🎮</div>
            <h3>Gamified Learning</h3>
            <p>Earn XP, gold, and gems for every correct answer. Transform learning from a chore into a game!</p>
          </div>
          <div className="game-card card-gold">
            <div className="feature-icon">🏆</div>
            <h3>Epic Daily Challenges</h3>
            <p>Take on daily quests to keep your streak alive and unlock rare badges.</p>
          </div>
          <div className="game-card card-purple">
            <div className="feature-icon">🛡️</div>
            <h3>Master Your Arsenal</h3>
            <p>Conquer subjects from Maths to Science. Unlock the Master Arena as you grow.</p>
          </div>
          <div className="game-card card-orange">
            <div className="feature-icon">👨‍👩‍👦</div>
            <h3>Parent Portal</h3>
            <p>Parents can easily track progress, find weak spots, and celebrate victories directly from their dashboard.</p>
          </div>
        </div>
      </div>
      
      <div className="rewards-preview">
        <h2 className="section-title">Unlock Epic Rewards!</h2>
        <div className="rewards-grid">
          <div className="reward-item">
            <span className="reward-icon">🪙</span>
            <span>Gold Coins</span>
          </div>
          <div className="reward-item">
            <span className="reward-icon">💎</span>
            <span>Gems</span>
          </div>
          <div className="reward-item">
            <span className="reward-icon">🎁</span>
            <span>Chests</span>
          </div>
          <div className="reward-item">
            <span className="reward-icon">🛡️</span>
            <span>Badges</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
