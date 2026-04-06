import { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { arenasData, subjectDetails } from '../data/arenasData';
import './LearningMap.css';

const StarRating = ({ stars, maxStars = 3 }) => (
  <div className="star-rating">
    {[...Array(maxStars)].map((_, i) => (
      <span key={i} className={`star ${i < stars ? 'filled' : 'empty'}`}>★</span>
    ))}
  </div>
);

const LearningMap = () => {
  const { classId, subjectId } = useParams();
  const currentRef = useRef(null);

  // Use classId and subjectId to get correct arena data
  const safeClassId = arenasData[classId] ? classId : '6';
  const classArenas = arenasData[safeClassId] || arenasData[6];
  const safeSubjectId = classArenas[subjectId] ? subjectId : 'math';
  const arenas = classArenas[safeSubjectId];
  const subjectName = subjectDetails[safeSubjectId]?.name || 'Mathematics';
  const subjectIcon = subjectDetails[safeSubjectId]?.icon || '📐';

  // Player stats state
  const [gems, setGems] = useState(340);
  const [coins, setCoins] = useState(1250);
  const [trophies, setTrophies] = useState(856);
  const [collectingLevel, setCollectingLevel] = useState(null);
  const [collectedLevels, setCollectedLevels] = useState([]);
  const [showGift, setShowGift] = useState(false);

  const gemGoal = 2000;
  const gemPercent = Math.min((gems / gemGoal) * 100, 100);

  // Scroll to current level on load
  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentRef.current) {
        currentRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  // Calculate stars for each zone
  const getZoneStars = (arena) => {
    let earnedStars = 0;
    for (let i = 0; i < arena.levels.length; i++) {
      earnedStars += arena.levels[i].stars;
    }
    const maxStars = arena.levels.length * 3;
    return { earned: earnedStars, max: maxStars };
  };

  // Total stars across all arenas
  let totalStars = 0;
  let maxTotalStars = 0;
  for (let i = 0; i < arenas.length; i++) {
    const s = getZoneStars(arenas[i]);
    totalStars += s.earned;
    maxTotalStars += s.max;
  }

  // Collect rewards for a completed level
  const handleCollect = (levelId) => {
    setCollectingLevel(levelId);
    setTimeout(() => {
      const gemReward = 50 + Math.floor(Math.random() * 30);
      const coinReward = 100 + Math.floor(Math.random() * 50);
      setGems(prev => {
        const newGems = prev + gemReward;
        if (newGems >= gemGoal && prev < gemGoal) {
          setTimeout(() => setShowGift(true), 500);
        }
        return newGems;
      });
      setCoins(prev => prev + coinReward);
      setTrophies(prev => prev + 15);
      setCollectedLevels(prev => [...prev, levelId]);
      setCollectingLevel(null);
    }, 800);
  };

  const isCollected = (levelId) => collectedLevels.indexOf(levelId) !== -1;

  return (
    <div className="arena-map-page">

      {/* ═══ GIFT POPUP ═══ */}
      {showGift && (
        <div className="cr-gift-overlay" onClick={() => setShowGift(false)}>
          <div className="cr-gift-popup">
            <div className="cr-gift-sparkles">✨🎁✨</div>
            <h2 className="cr-gift-title">🎉 CONGRATULATIONS! 🎉</h2>
            <p className="cr-gift-msg">You've collected {gemGoal} gems!</p>
            <div className="cr-gift-chest">🏆</div>
            <p className="cr-gift-desc">You've earned a <strong>Legendary Reward Chest!</strong><br/>It contains exclusive study materials, bonus XP, and a special badge.</p>
            <button className="cr-gift-claim-btn" onClick={() => setShowGift(false)}>CLAIM REWARD 🎁</button>
          </div>
        </div>
      )}

      {/* ═══ TOP STATS BAR — Clash Royale Style ═══ */}
      <div className="cr-stats-bar">
        <div className="cr-stats-inner">
          {/* Trophies */}
          <div className="cr-stat-item cr-trophies">
            <span className="cr-stat-icon">🏆</span>
            <span className="cr-stat-val">{trophies.toLocaleString()}</span>
          </div>
          {/* Gems */}
          <div className="cr-stat-item cr-gems">
            <span className="cr-stat-icon">💎</span>
            <span className="cr-stat-val">{gems.toLocaleString()}</span>
          </div>
          {/* Coins */}
          <div className="cr-stat-item cr-coins">
            <span className="cr-stat-icon">🪙</span>
            <span className="cr-stat-val">{coins.toLocaleString()}</span>
          </div>
          {/* Stars */}
          <div className="cr-stat-item cr-stars-total">
            <span className="cr-stat-icon">⭐</span>
            <span className="cr-stat-val">{totalStars}/{maxTotalStars}</span>
          </div>
        </div>
      </div>

      {/* ═══ GEM PROGRESS BAR ═══ */}
      <div className="cr-gem-progress-wrapper">
        <div className="cr-gem-progress-header">
          <span className="cr-gem-label">💎 Gem Goal</span>
          <span className="cr-gem-count">{gems} / {gemGoal}</span>
        </div>
        <div className="cr-gem-bar">
          <div className="cr-gem-fill" style={{ width: gemPercent + '%' }}>
            <div className="cr-gem-shimmer"></div>
          </div>
        </div>
        <div className="cr-gem-milestones">
          <span className={gems >= 500 ? 'milestone hit' : 'milestone'}>🎯 500</span>
          <span className={gems >= 1000 ? 'milestone hit' : 'milestone'}>🥈 1000</span>
          <span className={gems >= 1500 ? 'milestone hit' : 'milestone'}>🥇 1500</span>
          <span className={gems >= 2000 ? 'milestone hit' : 'milestone'}>🎁 2000</span>
        </div>
        {gems >= gemGoal && (
          <div className="cr-gift-ready">🎁 Gift Ready! Tap to claim your Legendary Chest!</div>
        )}
      </div>

      {/* ═══ ARENA INFO CARDS ═══ */}
      <div className="cr-info-row">
        <div className="cr-info-card">
          <div className="cr-info-icon">🏟️</div>
          <div className="cr-info-label">Arena</div>
          <div className="cr-info-value">{subjectName}</div>
        </div>
        <div className="cr-info-card">
          <div className="cr-info-icon">📚</div>
          <div className="cr-info-label">Class</div>
          <div className="cr-info-value">{classId || 6}</div>
        </div>
        <div className="cr-info-card">
          <div className="cr-info-icon">🔥</div>
          <div className="cr-info-label">Win Streak</div>
          <div className="cr-info-value">3</div>
        </div>
        <div className="cr-info-card">
          <div className="cr-info-icon">⚡</div>
          <div className="cr-info-label">League</div>
          <div className="cr-info-value">Gold</div>
        </div>
      </div>

      {/* Page Header */}
      <div className="map-page-header">
        <h1>{subjectIcon} Class {classId || 6} {subjectName}</h1>
        <p>Conquer the Arenas to become a {subjectName} Master!</p>
      </div>

      {/* Arena Zones */}
      <div className="arena-zones">
        {arenas.map((arena) => {
          const stars = getZoneStars(arena);

          return (
            <div key={arena.id} className={`arena-zone zone-${arena.theme}`}>

              {/* Zone Banner Header */}
              <div className="zone-banner">
                <div className="zone-banner-bg"></div>
                <div className="zone-banner-content">
                  <span className="zone-icon">{arena.icon}</span>
                  <h2 className="zone-name">{arena.name}</h2>
                  <div className="zone-stars-counter">
                    <span className="zone-stars-icon">⭐</span>
                    <span className="zone-stars-text">{stars.earned}/{stars.max}</span>
                  </div>
                </div>
                <div className="zone-banner-edge left"></div>
                <div className="zone-banner-edge right"></div>
              </div>

              {/* Level Nodes */}
              <div className="zone-levels">
                {arena.levels.map((level, index) => {
                  const isLeftNode = (index % 2 === 0);
                  const isFirstNode = (index === 0);
                  const isLocked = (level.status === 'locked');

                  const alignmentClass = isLeftNode ? 'align-left' : 'align-right';
                  const pathBendClass = isLeftNode ? 'bend-right' : 'bend-left';
                  const curveDirection = isLeftNode ? "M 100 0 Q 160 30 100 60" : "M 100 0 Q 40 30 100 60";
                  const pathColor = isLocked ? 'var(--border-default)' : 'var(--color-gold)';
                  const pathActiveState = isLocked ? '' : 'active';

                  return (
                    <div key={level.id} className="level-row">

                      {/* Dotted Path */}
                      {!isFirstNode && (
                        <div className={`path-connector ${pathActiveState} ${pathBendClass}`}>
                          <svg className="path-svg" viewBox="0 0 200 60" preserveAspectRatio="none">
                            <path d={curveDirection} fill="none" stroke={pathColor} strokeWidth="4" strokeDasharray="8 6" strokeLinecap="round" />
                          </svg>
                        </div>
                      )}

                      {/* Level Node */}
                      <div
                        className={`map-node node-${level.status} ${alignmentClass}`}
                        ref={level.status === 'current' ? currentRef : null}
                      >
                        {level.status === 'current' && (
                          <div className="you-are-here">
                            <span className="here-arrow">▼</span>
                            <span className="here-text">YOU ARE HERE</span>
                          </div>
                        )}

                        <div className="node-orb-wrapper">
                          {level.status === 'current' && <div className="orb-ring"></div>}
                          <div className="node-orb">
                            {level.status === 'completed' && <span className="orb-content">{level.id}</span>}
                            {level.status === 'current' && <span className="orb-content">{level.id}</span>}
                            {level.status === 'locked' && <span className="orb-content">🔒</span>}
                          </div>
                          {level.status === 'completed' && <div className="check-badge">✅</div>}
                        </div>

                        <div className="node-info">
                          <span className="node-name">{level.name}</span>

                          {level.status === 'completed' && (
                            <>
                              <StarRating stars={level.stars} />
                              <div className="cr-node-actions">
                                {!isCollected(level.id) ? (
                                  <button
                                    className={`cr-collect-btn ${collectingLevel === level.id ? 'collecting' : ''}`}
                                    onClick={() => handleCollect(level.id)}
                                    disabled={collectingLevel !== null}
                                  >
                                    {collectingLevel === level.id ? '✨ Collecting...' : '🎁 COLLECT'}
                                  </button>
                                ) : (
                                  <span className="cr-collected-badge">✅ Collected</span>
                                )}
                                <Link to="/arena-setup" state={{ level, subjectId: safeSubjectId, classId: safeClassId }} className="restart-btn">↺ Replay</Link>
                              </div>
                            </>
                          )}

                          {level.status === 'current' && (
                            <Link to="/arena-setup" state={{ level, subjectId: safeSubjectId, classId: safeClassId }} className="battle-map-btn">
                              <span>⚔️ BATTLE!</span>
                            </Link>
                          )}

                          {level.status === 'locked' && (
                            <div className="locked-tooltip">
                              Complete <strong>{level.unlock}</strong> to unlock
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* ═══ BOTTOM SEASON INFO ═══ */}
      <div className="cr-season-bar">
        <div className="cr-season-inner">
          <div className="cr-season-left">
            <span className="cr-season-icon">🏆</span>
            <div>
              <div className="cr-season-title">Season 4 — Scholar's Quest</div>
              <div className="cr-season-time">12 days remaining</div>
            </div>
          </div>
          <div className="cr-season-reward">
            <span>🎁</span>
            <span>Season Rewards</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningMap;
