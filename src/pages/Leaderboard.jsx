import { useState } from 'react';
import './Leaderboard.css';

const leaderboardData = [
  { rank: 1, name: 'Alex M.', xp: 2500, avatar: '👦', class: 'Class 5', isUser: true },
  { rank: 2, name: 'Sarah T.', xp: 2350, avatar: '👧', class: 'Class 5', isUser: false },
  { rank: 3, name: 'Rohan P.', xp: 2100, avatar: '🧑', class: 'Class 5', isUser: false },
  { rank: 4, name: 'Emily R.', xp: 1950, avatar: '👱‍♀️', class: 'Class 5', isUser: false },
  { rank: 5, name: 'David L.', xp: 1800, avatar: '👱', class: 'Class 5', isUser: false },
];

const Leaderboard = () => {
  const [activeTab, setActiveTab] = useState('weekly');

  return (
    <div className="leaderboard-page animate-enter">
      <h1 className="game-title">Hall of Fame</h1>
      
      <div className="leaderboard-tabs">
        <button 
          className={`tab-btn ${activeTab === 'weekly' ? 'active' : ''}`}
          onClick={() => setActiveTab('weekly')}
        >Weekly</button>
        <button 
          className={`tab-btn ${activeTab === 'class' ? 'active' : ''}`}
          onClick={() => setActiveTab('class')}
        >Class 5</button>
        <button 
          className={`tab-btn ${activeTab === 'friends' ? 'active' : ''}`}
          onClick={() => setActiveTab('friends')}
        >Friends</button>
      </div>

      <div className="game-card card-white leaderboard-card">
        <div className="leaderboard-list">
          {leaderboardData.map((user) => (
            <div key={user.rank} className={`leaderboard-item ${user.isUser ? 'highlight-user' : ''}`}>
              <div className="rank-col">
                {user.rank === 1 ? '🥇' : user.rank === 2 ? '🥈' : user.rank === 3 ? '🥉' : `#${user.rank}`}
              </div>
              <div className="avatar-col">{user.avatar}</div>
              <div className="name-col">
                <strong>{user.name}</strong>
                <span className="user-class">{user.class}</span>
              </div>
              <div className="xp-col">
                <strong>{user.xp}</strong> XP
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
