import './Profile.css';

const Profile = () => {
  return (
    <div className="profile-page animate-enter">
      <div className="profile-header">
        <div className="profile-avatar">
          <span className="avatar-emoji">👦</span>
          <div className="level-badge">Lv. 12</div>
        </div>
        <div className="profile-info">
          <h1>Alex M.</h1>
          <p className="profile-class">Class 5 • Growth Arena</p>
          <p className="profile-joined">Joined Sept 2023</p>
        </div>
      </div>

      <div className="stats-grid">
        <div className="game-card card-gold stat-box">
          <span className="stat-icon">🪙</span>
          <div className="stat-details">
            <strong>1,250</strong>
            <span>Total Gold</span>
          </div>
        </div>
        <div className="game-card card-blue stat-box">
          <span className="stat-icon">💎</span>
          <div className="stat-details">
            <strong>145</strong>
            <span>Total Gems</span>
          </div>
        </div>
        <div className="game-card card-purple stat-box">
          <span className="stat-icon">⭐</span>
          <div className="stat-details">
            <strong>12,400</strong>
            <span>Total XP</span>
          </div>
        </div>
        <div className="game-card card-white stat-box">
          <span className="stat-icon">🏆</span>
          <div className="stat-details">
            <strong>45</strong>
            <span>Quizzes Passed</span>
          </div>
        </div>
      </div>

      <div className="profile-section">
        <h2>Subject Mastery</h2>
        <div className="game-card card-white mastery-panel">
          <div className="mastery-item">
            <span className="mastery-icon">🧮</span>
            <div className="mastery-info">
              <div className="mastery-header">
                <strong>Mathematics</strong>
                <span>Level 4</span>
              </div>
              <div className="progress-bar thin"><div className="progress-fill" style={{width: '60%'}}></div></div>
            </div>
          </div>
          <div className="mastery-item">
            <span className="mastery-icon">🧬</span>
            <div className="mastery-info">
              <div className="mastery-header">
                <strong>Science</strong>
                <span>Level 6</span>
              </div>
              <div className="progress-bar thin"><div className="progress-fill" style={{width: '85%'}}></div></div>
            </div>
          </div>
          <div className="mastery-item">
            <span className="mastery-icon">📚</span>
            <div className="mastery-info">
              <div className="mastery-header">
                <strong>English</strong>
                <span>Level 2</span>
              </div>
              <div className="progress-bar thin"><div className="progress-fill" style={{width: '30%', backgroundColor: 'var(--color-secondary)'}}></div></div>
            </div>
          </div>
        </div>
      </div>

      <div className="profile-section">
        <h2>Badges Earned (12)</h2>
        <div className="game-card card-white badges-panel">
          <div className="badge-item">
            <div className="badge-icon">🔥</div>
            <span>7 Day Streak</span>
          </div>
          <div className="badge-item">
            <div className="badge-icon">🎯</div>
            <span>Sharpshooter</span>
          </div>
          <div className="badge-item">
            <div className="badge-icon">🎓</div>
            <span>Math Whiz</span>
          </div>
          <div className="badge-item locked">
            <div className="badge-icon">👑</div>
            <span>Master</span>
          </div>
        </div>
      </div>
      
      <div className="profile-actions">
        <button className="game-button btn-orange logout-btn">LOG OUT</button>
      </div>
    </div>
  );
};

export default Profile;
