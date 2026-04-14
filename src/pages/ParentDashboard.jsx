import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getStudyBreakdown, getTotalStudyTime, getSubjectStudyDetails, getArenaPerformance } from '../utils/trackingStore';
import './ParentDashboard.css';

// ─── SVG Pie Chart Component ───
const PieChart = ({ data, size = 220 }) => {
  const total = data.reduce((sum, d) => sum + d.minutes, 0);
  const cx = size / 2;
  const cy = size / 2;
  const radius = size / 2 - 10;

  // If no data yet, show empty state
  if (total === 0) {
    return (
      <div className="pie-chart-container">
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="pie-chart-svg">
          <circle cx={cx} cy={cy} r={radius} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="30" />
          <circle cx={cx} cy={cy} r={radius * 0.45} fill="var(--bg-card, #1a1a2e)" stroke="rgba(255,255,255,0.05)" strokeWidth="2" />
          <text x={cx} y={cy - 4} textAnchor="middle" fill="var(--text-secondary, #999)" fontSize="13" fontWeight="700">
            No Data Yet
          </text>
          <text x={cx} y={cy + 14} textAnchor="middle" fill="var(--text-muted, #666)" fontSize="10">
            Start studying!
          </text>
        </svg>
        <div className="pie-legend">
          {data.map((s, i) => (
            <div key={i} className="legend-item">
              <span className="legend-dot" style={{ backgroundColor: s.color }}></span>
              <span className="legend-label">{s.label}</span>
              <span className="legend-value">0%</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  let cumulativeAngle = -90;

  const slices = data.filter(item => item.minutes > 0).map((item) => {
    const angle = (item.minutes / total) * 360;
    const startAngle = cumulativeAngle;
    const endAngle = cumulativeAngle + angle;
    cumulativeAngle = endAngle;

    const startRad = (startAngle * Math.PI) / 180;
    const endRad = (endAngle * Math.PI) / 180;

    const x1 = cx + radius * Math.cos(startRad);
    const y1 = cy + radius * Math.sin(startRad);
    const x2 = cx + radius * Math.cos(endRad);
    const y2 = cy + radius * Math.sin(endRad);
    const largeArc = angle > 180 ? 1 : 0;

    const pathData = `M ${cx} ${cy} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z`;

    return { ...item, pathData, percentage: ((item.minutes / total) * 100).toFixed(1) };
  });

  const totalHours = Math.floor(total / 60);
  const totalMins = total % 60;

  return (
    <div className="pie-chart-container">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="pie-chart-svg">
        {slices.map((s, i) => (
          <path key={i} d={s.pathData} fill={s.color} stroke="rgba(0,0,0,0.3)" strokeWidth="2" className="pie-slice" style={{ '--delay': `${i * 0.1}s` }} />
        ))}
        <circle cx={cx} cy={cy} r={radius * 0.45} fill="var(--bg-card, #1a1a2e)" stroke="rgba(255,255,255,0.05)" strokeWidth="2" />
        <text x={cx} y={cy - 8} textAnchor="middle" fill="var(--text-primary, #fff)" fontSize="18" fontWeight="800">
          {totalHours}h {totalMins}m
        </text>
        <text x={cx} y={cy + 12} textAnchor="middle" fill="var(--text-secondary, #999)" fontSize="11" fontWeight="600">
          TOTAL TIME
        </text>
      </svg>
      <div className="pie-legend">
        {data.map((s, i) => (
          <div key={i} className="legend-item">
            <span className="legend-dot" style={{ backgroundColor: s.color }}></span>
            <span className="legend-label">{s.label}</span>
            <span className="legend-value">{total > 0 ? ((s.minutes / total) * 100).toFixed(1) : '0'}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── Score Bar Chart ───
const ScoreBar = ({ scores, maxPossible = 10 }) => {
  if (scores.length === 0) {
    return <p style={{ color: 'var(--text-secondary)', fontStyle: 'italic' }}>No quiz data yet — start playing!</p>;
  }
  return (
    <div className="score-bars">
      {scores.map((s, i) => (
        <div key={i} className="score-bar-col">
          <div className="score-bar-track">
            <div
              className="score-bar-fill"
              style={{
                height: `${(s / maxPossible) * 100}%`,
                backgroundColor: s >= 7 ? '#00B894' : s >= 5 ? '#FDCB6E' : '#E17055',
              }}
            ></div>
          </div>
          <span className="score-bar-label">{s}</span>
        </div>
      ))}
    </div>
  );
};

// ─── Main Component ───
const ParentDashboard = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('study');
  const [selectedSubject, setSelectedSubject] = useState(null);

  // Live data from tracking store
  const [studyBreakdown, setStudyBreakdown] = useState([]);
  const [totalStudyTime, setTotalStudyTime] = useState('0h 0m');
  const [subjectStudy, setSubjectStudy] = useState([]);
  const [arenaPerformance, setArenaPerformance] = useState(null);
  const [studentProfile, setStudentProfile] = useState({ name: 'Vaibhav Tripathi', school: 'Delhi Public School', phone: '8591645328' });

  // Load data on login and periodically refresh
  useEffect(() => {
    if (!isLoggedIn) return;

    const loadData = () => {
      setStudyBreakdown(getStudyBreakdown());
      setTotalStudyTime(getTotalStudyTime());
      setSubjectStudy(getSubjectStudyDetails());
      setArenaPerformance(getArenaPerformance());
      
      const activeUser = localStorage.getItem('eduquest_active_user') || 'guest';
      const profileRaw = localStorage.getItem(`eduquest_student_profile_${activeUser}`) || localStorage.getItem('eduquest_student_profile');
      if (profileRaw) {
        setStudentProfile(JSON.parse(profileRaw));
      }
    };

    loadData();
    // Refresh every 3 seconds for live updates
    const interval = setInterval(loadData, 3000);
    return () => clearInterval(interval);
  }, [isLoggedIn]);

  const handleParentLogin = (e) => {
    e.preventDefault();
    setError('');
    if (email.toLowerCase() === 'vaibhavtripathi589@gmail.com' && password === '123') {
      setIsLoggedIn(true);
    } else {
      setError('Invalid credentials. Please check your email and password.');
    }
  };

  // ─── LOGIN SCREEN ───
  if (!isLoggedIn) {
    return (
      <div className="parent-login-page animate-enter">
        <div className="parent-login-card">
          <div className="parent-login-header">
            <span className="parent-login-icon">👨‍👩‍👦</span>
            <h1>Parent Portal</h1>
            <p>Sign in to monitor your child's progress</p>
          </div>

          {error && <div className="parent-login-error">{error}</div>}

          <form onSubmit={handleParentLogin} className="parent-login-form">
            <div className="parent-form-group">
              <label>Email Address</label>
              <input
                type="text"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="parent-form-group">
              <label>Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="parent-login-btn">
              🔐 LOG IN
            </button>
          </form>

          <div className="parent-login-footer">
            <p>Use your registered parent credentials</p>
          </div>
        </div>
      </div>
    );
  }

  const arena = arenaPerformance || { totalQuizzes: 0, overallMax: 0, overallMin: 0, overallAvg: 0, subjects: [] };
  const activeSubjectData = selectedSubject !== null && arena.subjects[selectedSubject] ? arena.subjects[selectedSubject] : null;

  // ─── LOGGED IN DASHBOARD ───
  return (
    <div className="parent-dashboard animate-enter">
      {/* ═══ HEADER ═══ */}
      <div className="pd-header">
        <div className="pd-header-left">
          <div className="pd-student-avatar">👦</div>
          <div className="pd-student-info">
            <h1>{studentProfile.name}</h1>
            <p>Class 7 • {studentProfile.school}</p>
            <p className="pd-phone">📱 {studentProfile.phone}</p>
          </div>
        </div>
        <div className="pd-header-right">
          <div className="pd-stat-pill">
            <span className="pd-stat-icon">⏱️</span>
            <span className="pd-stat-val">{totalStudyTime}</span>
          </div>
          <div className="pd-stat-pill">
            <span className="pd-stat-icon">⚔️</span>
            <span className="pd-stat-val">{arena.totalQuizzes} Quizzes</span>
          </div>
          <button className="pd-logout-btn" onClick={() => { setIsLoggedIn(false); navigate('/login'); }}>
            Logout
          </button>
        </div>
      </div>

      {/* ═══ TAB NAVIGATION ═══ */}
      <div className="pd-tabs">
        <button
          className={`pd-tab ${activeTab === 'study' ? 'active' : ''}`}
          onClick={() => setActiveTab('study')}
        >
          <span className="tab-icon">📚</span>
          <span className="tab-label">Study Time</span>
        </button>
        <button
          className={`pd-tab ${activeTab === 'arena' ? 'active' : ''}`}
          onClick={() => setActiveTab('arena')}
        >
          <span className="tab-icon">⚔️</span>
          <span className="tab-label">Arena Time</span>
        </button>
      </div>

      {/* ═══ STUDY TIME TAB ═══ */}
      {activeTab === 'study' && (
        <div className="pd-tab-content animate-enter">
          <h2 className="pd-section-title">📊 Study Time Overview</h2>
          <p className="pd-section-desc">Real-time tracking of your child's learning activities</p>

          <div className="pd-study-grid">
            {/* Pie Chart */}
            <div className="pd-chart-card">
              <h3>Time Distribution</h3>
              <PieChart data={studyBreakdown} size={220} />
            </div>

            {/* Study Stats */}
            <div className="pd-study-stats-card">
              <h3>Activity Breakdown</h3>
              <div className="pd-quick-stats">
                {studyBreakdown.map((item, i) => (
                  <div key={i} className="pd-quick-stat">
                    <span className="qs-icon" style={{ fontSize: '1.3rem' }}>
                      {['📄', '📝', '🎓', '🔁'][i]}
                    </span>
                    <div className="qs-info">
                      <strong>{item.minutes > 0 ? `${item.minutes}m` : '0m'}</strong>
                      <span>{item.label}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Subject-wise Study Breakdown */}
          <h2 className="pd-section-title" style={{ marginTop: '2rem' }}>📖 Subject-wise Study Details</h2>
          <div className="pd-subject-study-grid">
            {subjectStudy.map((sub, i) => (
              <div key={i} className="pd-subject-study-card">
                <div className="sscard-header">
                  <span className="sscard-icon">{sub.icon}</span>
                  <h4>{sub.subject}</h4>
                </div>
                <div className="sscard-body">
                  <div className="sscard-row">
                    <span>📄 PDF Time</span>
                    <strong>{sub.pdfTime}</strong>
                  </div>
                  <div className="sscard-row">
                    <span>📝 Notes Time</span>
                    <strong>{sub.notesTime}</strong>
                  </div>
                  <div className="sscard-row">
                    <span>⏱️ Total</span>
                    <strong>{sub.totalTime}</strong>
                  </div>
                  <div className="sscard-row">
                    <span>📚 Chapters Read</span>
                    <strong>{sub.chaptersRead}</strong>
                  </div>
                </div>
                <div className="sscard-progress">
                  <div className="sscard-progress-label">
                    <span>Progress</span>
                    <span>{sub.progress}%</span>
                  </div>
                  <div className="sscard-bar">
                    <div className="sscard-bar-fill" style={{ width: `${sub.progress}%`, backgroundColor: sub.progress >= 60 ? '#00B894' : sub.progress >= 40 ? '#FDCB6E' : '#E17055' }}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ═══ ARENA TIME TAB ═══ */}
      {activeTab === 'arena' && (
        <div className="pd-tab-content animate-enter">
          <h2 className="pd-section-title">⚔️ Arena Performance</h2>
          <p className="pd-section-desc">Real quiz scores from arena battles</p>

          {/* Overall Stats */}
          <div className="pd-arena-overview">
            <div className="pd-arena-stat-card best">
              <span className="arena-stat-emoji">🏆</span>
              <div className="arena-stat-content">
                <strong>{arena.overallMax}/10</strong>
                <span>Best Score</span>
              </div>
            </div>
            <div className="pd-arena-stat-card worst">
              <span className="arena-stat-emoji">📉</span>
              <div className="arena-stat-content">
                <strong>{arena.overallMin}/10</strong>
                <span>Lowest Score</span>
              </div>
            </div>
            <div className="pd-arena-stat-card avg">
              <span className="arena-stat-emoji">📊</span>
              <div className="arena-stat-content">
                <strong>{arena.overallAvg}/10</strong>
                <span>Average Score</span>
              </div>
            </div>
            <div className="pd-arena-stat-card total">
              <span className="arena-stat-emoji">⚔️</span>
              <div className="arena-stat-content">
                <strong>{arena.totalQuizzes}</strong>
                <span>Total Quizzes</span>
              </div>
            </div>
          </div>

          {arena.totalQuizzes === 0 && (
            <div className="pd-empty-state">
              <span className="pd-empty-icon">🎮</span>
              <h3>No Arena Data Yet</h3>
              <p>Your child hasn't taken any quizzes yet. Data will appear here as they play!</p>
            </div>
          )}

          {/* Subject Selector */}
          {arena.totalQuizzes > 0 && (
            <>
              <h3 className="pd-subject-filter-title">🎯 Select Subject to View Details</h3>
              <div className="pd-subject-filter">
                {arena.subjects.map((sub, i) => (
                  <button
                    key={i}
                    className={`pd-subject-btn ${selectedSubject === i ? 'active' : ''}`}
                    onClick={() => setSelectedSubject(selectedSubject === i ? null : i)}
                  >
                    <span>{sub.icon}</span>
                    <span>{sub.subject}</span>
                    {sub.quizzesTaken > 0 && <span className="pd-subject-count">{sub.quizzesTaken}</span>}
                  </button>
                ))}
              </div>
            </>
          )}

          {/* Subject Detail Panel */}
          {activeSubjectData && activeSubjectData.quizzesTaken > 0 && (
            <div className="pd-subject-detail animate-enter">
              <div className="pd-detail-header">
                <span className="pd-detail-icon">{activeSubjectData.icon}</span>
                <h3>{activeSubjectData.subject} — Arena Detail</h3>
              </div>

              <div className="pd-detail-stats">
                <div className="pd-detail-stat green">
                  <strong>{activeSubjectData.maxScore}/10</strong>
                  <span>Max Score</span>
                </div>
                <div className="pd-detail-stat red">
                  <strong>{activeSubjectData.minScore}/10</strong>
                  <span>Min Score</span>
                </div>
                <div className="pd-detail-stat blue">
                  <strong>{activeSubjectData.avgScore}/10</strong>
                  <span>Average</span>
                </div>
                <div className="pd-detail-stat purple">
                  <strong>{activeSubjectData.quizzesTaken}</strong>
                  <span>Quizzes</span>
                </div>
              </div>

              <div className="pd-detail-scores">
                <h4>📈 Recent Quiz Scores</h4>
                <ScoreBar scores={activeSubjectData.recentScores} />
              </div>

              {(activeSubjectData.strongTopics.length > 0 || activeSubjectData.weakTopics.length > 0) && (
                <div className="pd-detail-topics">
                  {activeSubjectData.strongTopics.length > 0 && (
                    <div className="pd-topics-col">
                      <h4 className="topics-strong">💪 Strong Topics</h4>
                      {activeSubjectData.strongTopics.map((t, i) => (
                        <span key={i} className="topic-tag strong">{t}</span>
                      ))}
                    </div>
                  )}
                  {activeSubjectData.weakTopics.length > 0 && (
                    <div className="pd-topics-col">
                      <h4 className="topics-weak">⚠️ Needs Improvement</h4>
                      {activeSubjectData.weakTopics.map((t, i) => (
                        <span key={i} className="topic-tag weak">{t}</span>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {activeSubjectData && activeSubjectData.quizzesTaken === 0 && (
            <div className="pd-empty-state small">
              <p>No quizzes taken in {activeSubjectData.subject} yet.</p>
            </div>
          )}

          {/* All Subjects Summary Table */}
          {selectedSubject === null && arena.totalQuizzes > 0 && (
            <div className="pd-arena-table-wrap animate-enter">
              <h3 className="pd-table-title">📋 All Subjects Summary</h3>
              <div className="pd-arena-table">
                <div className="pd-table-header">
                  <span>Subject</span>
                  <span>Quizzes</span>
                  <span>Max</span>
                  <span>Min</span>
                  <span>Avg</span>
                </div>
                {arena.subjects.map((sub, i) => (
                  <div key={i} className="pd-table-row" onClick={() => setSelectedSubject(i)}>
                    <span className="pd-table-subject">{sub.icon} {sub.subject}</span>
                    <span>{sub.quizzesTaken}</span>
                    <span className="pd-score-good">{sub.quizzesTaken > 0 ? sub.maxScore : '-'}</span>
                    <span className="pd-score-bad">{sub.quizzesTaken > 0 ? sub.minScore : '-'}</span>
                    <span>{sub.quizzesTaken > 0 ? sub.avgScore : '-'}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ParentDashboard;
