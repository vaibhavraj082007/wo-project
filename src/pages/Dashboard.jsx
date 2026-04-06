import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const [chestReady, setChestReady] = useState(false);
  const [chestOpening, setChestOpening] = useState(false);
  const [chestOpened, setChestOpened] = useState(false);
  const [countdownMinutes, setCountdownMinutes] = useState(12);

  // Simulate chest becoming ready
  useEffect(() => {
    const timer = setTimeout(() => setChestReady(true), 8000);
    return () => clearTimeout(timer);
  }, []);

  // Countdown timer tick
  useEffect(() => {
    if (chestReady || chestOpened) return;
    const interval = setInterval(() => {
      setCountdownMinutes(prev => (prev > 0 ? prev - 1 : 0));
    }, 60000);
    return () => clearInterval(interval);
  }, [chestReady, chestOpened]);

  const handleOpenChest = () => {
    if (!chestReady || chestOpened) return;
    setChestOpening(true);
    setTimeout(() => {
      setChestOpening(false);
      setChestOpened(true);
    }, 1200);
  };

  return (
    <div className="dashboard-hud">
      {/* ═══════════════ FIXED HUD TOP BAR ═══════════════ */}
      <div className="hud-top-bar">
        <div className="hud-bar-inner">
          {/* Left: Avatar */}
          <Link to="/profile" className="hud-avatar-link">
            <div className="hud-avatar-hex" style={{ '--league-color': '#f4c430' }}>
              <div className="hex-inner">👦</div>
              <div className="hex-level">12</div>
            </div>
          </Link>

          {/* Center: Resource Counters */}
          <div className="hud-resources">
            <div className="resource-pill">
              <span className="resource-icon">🪙</span>
              <span className="resource-val">1,250</span>
            </div>
            <div className="resource-pill">
              <span className="resource-icon">💎</span>
              <span className="resource-val">145</span>
            </div>
            <div className="resource-pill">
              <span className="resource-icon">⚡</span>
              <span className="resource-val">3,400</span>
            </div>
            <div className="resource-pill">
              <span className="resource-icon">🔥</span>
              <span className="resource-val">3</span>
            </div>
          </div>

          {/* Right: Settings & Notifications */}
          <div className="hud-actions">
            <button className="hud-icon-btn" title="Notifications">
              🔔
              <span className="notif-dot"></span>
            </button>
            <button className="hud-icon-btn" title="Settings">⚙️</button>
          </div>
        </div>

        {/* XP Progress Bar */}
        <div className="hud-xp-bar">
          <div className="hud-xp-fill" style={{ width: '65%' }}></div>
          <div className="hud-xp-shimmer"></div>
        </div>
      </div>

      {/* ═══════════════ MAIN DASHBOARD ═══════════════ */}
      <div className="hud-main-content">
        {/* Welcome & League */}
        <div className="hud-welcome-section">
          <div className="welcome-text">
            <h1>
              <span className="crown-emoji">👑</span>
              Welcome back, Scholar!
            </h1>
          </div>
          <div className="league-badge" style={{ '--badge-color': '#f4c430' }}>
            <span className="league-icon">🥇</span>
            <span className="league-name">Gold League</span>
            <div className="league-glow"></div>
          </div>
        </div>

        {/* ── Continue Quest Card ── */}
        <section className="hud-section">
          <h2 className="section-heading">⚔️ Continue Quest</h2>
          <div className="quest-card">
            <div className="quest-card-bg"></div>
            <div className="quest-card-content">
              <div className="quest-subject-icon">📐</div>
              <div className="quest-info">
                <h3 className="quest-subject">Mathematics</h3>
                <p className="quest-chapter">Chapter 4: Advanced Fractions</p>
                <div className="quest-progress-bar">
                  <div className="quest-progress-fill" style={{ width: '40%' }}></div>
                </div>
                <span className="quest-progress-text">40% Complete</span>
              </div>
              <Link to="/classes/6/arena-subjects" className="battle-btn-link">
                <button className="battle-btn">
                  <span className="battle-sword-left">⚔️</span>
                  <span className="battle-text">BATTLE</span>
                  <span className="battle-sword-right">⚔️</span>
                  <div className="battle-glow"></div>
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* ── Daily Missions ── */}
        <section className="hud-section">
          <h2 className="section-heading">🎯 Daily Missions</h2>
          <div className="missions-grid">
            
            <div className="mission-card">
              <div className="mission-card-icon">🎯</div>
              <div className="mission-card-info">
                <strong>Perfect Score</strong>
                <span>Get 10/10 in any quiz</span>
                <div className="mission-progress-bar">
                  <div className="mission-progress-fill" style={{ width: '0%' }}></div>
                </div>
              </div>
              <div className="mission-card-reward">
                <span className="reward-amount">🪙 50</span>
              </div>
            </div>

            <div className="mission-card completed">
              <div className="mission-card-icon">⚔️</div>
              <div className="mission-card-info">
                <strong>Play 3 Quizzes</strong>
                <span>Completed! ✅</span>
                <div className="mission-progress-bar">
                  <div className="mission-progress-fill" style={{ width: '100%' }}></div>
                </div>
              </div>
              <div className="mission-card-reward claimed">
                <span className="reward-amount">💎 10</span>
              </div>
            </div>

            <div className="mission-card">
              <div className="mission-card-icon">📖</div>
              <div className="mission-card-info">
                <strong>Read 2 Lessons</strong>
                <span>1 of 2 complete</span>
                <div className="mission-progress-bar">
                  <div className="mission-progress-fill" style={{ width: '50%' }}></div>
                </div>
              </div>
              <div className="mission-card-reward">
                <span className="reward-amount">🪙 30</span>
              </div>
            </div>

          </div>
        </section>

        {/* ── Reward Chest ── */}
        <section className="hud-section">
          <h2 className="section-heading">🎁 Reward Chest</h2>
          <div className={`chest-card ${chestReady ? 'ready' : ''} ${chestOpening ? 'opening' : ''} ${chestOpened ? 'opened' : ''}`}>
            {chestOpening && (
              <div className="chest-particles">
                <div className="chest-particle" style={{ '--angle': '0deg', '--delay': '0s' }} />
                <div className="chest-particle" style={{ '--angle': '30deg', '--delay': '0.05s' }} />
                <div className="chest-particle" style={{ '--angle': '60deg', '--delay': '0.1s' }} />
                <div className="chest-particle" style={{ '--angle': '90deg', '--delay': '0.15s' }} />
                <div className="chest-particle" style={{ '--angle': '120deg', '--delay': '0.2s' }} />
                <div className="chest-particle" style={{ '--angle': '150deg', '--delay': '0.25s' }} />
                <div className="chest-particle" style={{ '--angle': '180deg', '--delay': '0.3s' }} />
                <div className="chest-particle" style={{ '--angle': '210deg', '--delay': '0.35s' }} />
                <div className="chest-particle" style={{ '--angle': '240deg', '--delay': '0.4s' }} />
                <div className="chest-particle" style={{ '--angle': '270deg', '--delay': '0.45s' }} />
                <div className="chest-particle" style={{ '--angle': '300deg', '--delay': '0.5s' }} />
                <div className="chest-particle" style={{ '--angle': '330deg', '--delay': '0.55s' }} />
              </div>
            )}
            <div className="chest-emoji">{chestOpened ? '✨' : '🎁'}</div>
            {chestOpened ? (
              <div className="chest-loot">
                <p className="loot-title">Chest Opened!</p>
                <div className="loot-items">
                  <span className="loot-item">🪙 +100</span>
                  <span className="loot-item">💎 +5</span>
                  <span className="loot-item">⚡ +200</span>
                </div>
              </div>
            ) : chestReady ? (
              <div className="chest-ready-info">
                <p className="chest-ready-text">Chest Ready!</p>
                <button className="chest-open-btn" onClick={handleOpenChest}>
                  OPEN NOW
                </button>
              </div>
            ) : (
              <div className="chest-locked-info">
                <p className="chest-locked-text">🔒 Locked</p>
                <p className="chest-timer">Opens in: <strong>{countdownMinutes}m</strong></p>
                <p className="chest-hint">Complete 2 more quizzes to unlock</p>
              </div>
            )}
          </div>
        </section>

        {/* ── Arena Map Preview ── */}
        <section className="hud-section">
          <h2 className="section-heading">🗺️ Arena Map</h2>
          <Link to="/map" className="arena-preview-link">
            <div className="arena-preview-card">
              <div className="arena-preview-bg"></div>
              <div className="arena-preview-content">
                <div className="arena-progress-nodes">
                  <div className="a-node completed">✅</div>
                  <div className="a-node-line completed"></div>
                  <div className="a-node completed">✅</div>
                  <div className="a-node-line completed"></div>
                  <div className="a-node current">⚔️</div>
                  <div className="a-node-line"></div>
                  <div className="a-node locked">🔒</div>
                  <div className="a-node-line"></div>
                  <div className="a-node locked boss">👑</div>
                </div>
                <p className="arena-label">Level 3 of 5 — <strong>Class 5 Arena</strong></p>
              </div>
            </div>
          </Link>
        </section>

        {/* ── Quick Action Scroll Row ── */}
        <section className="hud-section">
          <h2 className="section-heading">⚡ Quick Actions</h2>
          <div className="quick-actions-scroll">
            <Link to="/classes" className="qa-card">
              <span className="qa-icon">📚</span>
              <span className="qa-label">Change Class</span>
            </Link>
            <Link to="/leaderboard" className="qa-card">
              <span className="qa-icon">🏆</span>
              <span className="qa-label">Leaderboard</span>
            </Link>
            <Link to="/profile" className="qa-card">
              <span className="qa-icon">👤</span>
              <span className="qa-label">Profile</span>
            </Link>
            <Link to="/parents" className="qa-card">
              <span className="qa-icon">👨‍👩‍👦</span>
              <span className="qa-label">Parents</span>
            </Link>
          </div>
        </section>

        {/* ═══════════════ BYJU'S-STYLE INFO SECTIONS ═══════════════ */}

        {/* ── Advantage Section ── */}
        <section className="info-section advantage-section">
          <h2 className="info-section-title">Get the EduQuest Advantage</h2>
          <div className="advantage-grid">
            
            <div className="advantage-card">
              <div className="advantage-img-wrapper">
                <img src="/feature-visual.png" alt="Conceptual clarity through visualisation" className="advantage-img" />
              </div>
              <h3>Conceptual clarity through visualisation</h3>
              <p>Interactive animations and visual explanations make complex topics simple and memorable.</p>
            </div>

            <div className="advantage-card">
              <div className="advantage-img-wrapper">
                <img src="/feature-personalised.png" alt="Personalised learning programs" className="advantage-img" />
              </div>
              <h3>Personalised learning programs</h3>
              <p>Adaptive quizzes and smart knowledge graphs tailor every lesson to your unique learning pace.</p>
            </div>

            <div className="advantage-card">
              <div className="advantage-img-wrapper">
                <img src="/feature-attention.png" alt="Unmatched individual attention" className="advantage-img" />
              </div>
              <h3>Unmatched individual attention</h3>
              <p>Detailed progress tracking and targeted feedback ensure no student is left behind.</p>
            </div>

          </div>
        </section>

        {/* ── About Us ── */}
        <section className="info-section about-section">
          <div className="about-card">
            <h2 className="about-title">About Us</h2>
            <p className="about-text">
              EduQuest is a gamified learning platform designed for students of Classes 6 to 8. 
              We believe that learning should be fun, engaging, and personalised. Our platform combines 
              the thrill of gaming with NCERT-aligned curriculum to transform how students learn, 
              practice, and master concepts.
            </p>
            <p className="about-text">
              With interactive quizzes, quest-based learning, and detailed progress tracking, 
              EduQuest makes every student feel like a champion. Join millions of students who are 
              already on their way to academic excellence through play.
            </p>
          </div>
        </section>

        {/* ── Why Choose Us ── */}
        <section className="info-section why-section">
          <h2 className="info-section-title">Why Choose EduQuest?</h2>
          <div className="why-grid">
            
            <div className="why-card">
              <span className="why-icon">🎮</span>
              <h3>Gamified Learning</h3>
              <p>Earn coins, gems, and XP as you learn. Level up through arenas and unlock achievements that keep you motivated.</p>
            </div>

            <div className="why-card">
              <span className="why-icon">📐</span>
              <h3>NCERT Aligned</h3>
              <p>Complete curriculum coverage for Classes 6-8 with chapter-wise notes, quizzes, and practice material.</p>
            </div>

            <div className="why-card">
              <span className="why-icon">📊</span>
              <h3>Progress Tracking</h3>
              <p>Detailed analytics for students and parents to track strengths, weaknesses, and improvement over time.</p>
            </div>

            <div className="why-card">
              <span className="why-icon">🏆</span>
              <h3>Competitive Spirit</h3>
              <p>Leaderboards, daily missions, and arena battles inspire healthy competition among peers.</p>
            </div>

          </div>
        </section>

        {/* ── Three Pillars ── */}
        <section className="info-section pillars-section">
          <h2 className="info-section-title">Our Three Pillars</h2>
          <div className="pillars-list">
            
            <div className="pillar-card">
              <div className="pillar-number">1</div>
              <div className="pillar-content">
                <h3 className="pillar-heading">Personalised Learning Journeys</h3>
                <p>Using knowledge graphs, the program adapts and creates personalised learning journeys for each student. It provides comprehensive coverage of concepts with animated explanations, fun quizzes, and flashcards. Based on progress, personal learning profiles are created which help analyse strengths and areas of improvement.</p>
              </div>
            </div>

            <div className="pillar-card">
              <div className="pillar-number">2</div>
              <div className="pillar-content">
                <h3 className="pillar-heading">Technology Enabled Learning</h3>
                <p>We leverage technology to merge best practices — interactive video lessons, engaging content, and smart quizzes — so that every child has access to the best learning experiences. Our platform uses data science to create personalised study plans designed for every student.</p>
              </div>
            </div>

            <div className="pillar-card">
              <div className="pillar-number">3</div>
              <div className="pillar-content">
                <h3 className="pillar-heading">Fun Through Gamification</h3>
                <p>Learning is reimagined as an adventure. Students earn rewards, battle through arenas, and climb leaderboards — turning every study session into an exciting quest. Each concept is tagged at different levels of difficulty to create a smooth learning curve that keeps students motivated.</p>
              </div>
            </div>

          </div>
        </section>

        {/* ── Students Love Us ── */}
        <section className="info-section love-section">
          <h2 className="info-section-title">Our Students and Parents Love Us</h2>
          <div className="stats-grid">
            
            <div className="stat-card">
              <span className="stat-number">50K+</span>
              <span className="stat-label">Active Students</span>
            </div>

            <div className="stat-card">
              <span className="stat-number">10L+</span>
              <span className="stat-label">Quizzes Completed</span>
            </div>

            <div className="stat-card">
              <span className="stat-number">4.8⭐</span>
              <span className="stat-label">Average Rating</span>
            </div>

            <div className="stat-card">
              <span className="stat-number">95%</span>
              <span className="stat-label">Parents Recommend</span>
            </div>

          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;

