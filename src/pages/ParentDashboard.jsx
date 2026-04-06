import './ParentDashboard.css';

const ParentDashboard = () => {
  return (
    <div className="parent-dashboard animate-enter">
      <div className="parent-header">
        <h1>Parent Portal</h1>
        <p>Monitor Alex's Learning Journey</p>
      </div>

      <div className="parent-overview">
        <div className="game-card card-white overview-card">
          <div className="overview-stat">
            <span className="stat-value">5</span>
            <span className="stat-label">Days Streak</span>
          </div>
          <div className="overview-stat">
            <span className="stat-value">12</span>
            <span className="stat-label">Quizzes Passed</span>
          </div>
          <div className="overview-stat">
            <span className="stat-value">2h 15m</span>
            <span className="stat-label">Learning Time (This Week)</span>
          </div>
        </div>
      </div>

      <div className="parent-grid">
        <div className="game-card card-white parent-panel">
          <h3>Recent Activity</h3>
          <ul className="activity-list">
            <li>
              <span className="activity-icon">✅</span>
              <div className="activity-details">
                <strong>Class 5 Math: Fractions</strong>
                <span>Scored 8/10 • Today</span>
              </div>
            </li>
            <li>
              <span className="activity-icon">✅</span>
              <div className="activity-details">
                <strong>Class 5 Science: Plants</strong>
                <span>Scored 10/10 • Yesterday</span>
              </div>
            </li>
            <li>
              <span className="activity-icon">❌</span>
              <div className="activity-details">
                <strong>Class 5 English: Nouns</strong>
                <span>Scored 4/10 • 2 Days Ago</span>
              </div>
            </li>
          </ul>
        </div>

        <div className="game-card card-white parent-panel">
          <h3>Subject Performance</h3>
          <div className="performance-item">
            <div className="perf-header">
              <strong>Mathematics</strong>
              <span className="perf-strong">Strong</span>
            </div>
            <div className="perf-bar-bg"><div className="perf-bar-fill" style={{width: '85%', backgroundColor: 'var(--color-primary)'}}></div></div>
          </div>
          <div className="performance-item">
            <div className="perf-header">
              <strong>Science</strong>
              <span className="perf-strong">Strong</span>
            </div>
            <div className="perf-bar-bg"><div className="perf-bar-fill" style={{width: '90%', backgroundColor: 'var(--color-primary)'}}></div></div>
          </div>
          <div className="performance-item">
            <div className="perf-header">
              <strong>English</strong>
              <span className="perf-weak">Needs Focus</span>
            </div>
            <div className="perf-bar-bg"><div className="perf-bar-fill" style={{width: '40%', backgroundColor: 'var(--color-secondary)'}}></div></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParentDashboard;
