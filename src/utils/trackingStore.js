/*  ═══════════════════════════════════════════════════
    trackingStore.js — Centralised localStorage tracker
    Tracks: PDF time, Notes time, Lesson time, Quiz/Arena scores
    Everything starts at ZERO and grows with real usage.
    ═══════════════════════════════════════════════════ */

const STORE_KEY = 'eduquest_tracking';

// Subject ID → display name mapping
const SUBJECT_NAMES = {
  math: 'Mathematics',
  science: 'Science',
  english: 'English',
  social: 'Social Science',
  hindi: 'Hindi',
};

const SUBJECT_ICONS = {
  math: '📐',
  science: '🔬',
  english: '📖',
  social: '🌍',
  hindi: '📝',
};

function getStoreKey(userId) {
  if (userId) return `eduquest_tracking_${userId}`;
  const activeUser = localStorage.getItem('eduquest_active_user') || 'guest';
  return `eduquest_tracking_${activeUser}`;
}

function getStore(userId) {
  try {
    const key = getStoreKey(userId);
    let raw = localStorage.getItem(key);
    
    // Migration: If no user-specific data, but legacy generic data exists, migrate it
    if (!raw && localStorage.getItem('eduquest_tracking')) {
      raw = localStorage.getItem('eduquest_tracking');
      localStorage.setItem(key, raw);
    }
    
    return raw ? JSON.parse(raw) : createEmptyStore();
  } catch {
    return createEmptyStore();
  }
}

function saveStore(store, userId) {
  localStorage.setItem(getStoreKey(userId), JSON.stringify(store));
}

function createEmptyStore() {
  return {
    // Study time in SECONDS per category
    studyTime: {
      pdf: 0,
      notes: 0,
      lesson: 0,
      revision: 0,
    },
    // Per-subject study seconds
    subjectStudy: {},
    // Per-subject chapters read (Set stored as array)
    chaptersRead: {},
    // Arena/quiz scores: array of { subject, score, total, mode, date }
    quizScores: [],
  };
}

// ─────────────────────────────────────────────
//  STUDY TIME TRACKING
// ─────────────────────────────────────────────

/** Add seconds to a study category ('pdf' | 'notes' | 'lesson' | 'revision') */
export function addStudyTime(category, seconds, subjectId) {
  const store = getStore();
  store.studyTime[category] = (store.studyTime[category] || 0) + seconds;

  // Also track per-subject
  if (subjectId) {
    if (!store.subjectStudy[subjectId]) {
      store.subjectStudy[subjectId] = { pdf: 0, notes: 0, lesson: 0, revision: 0 };
    }
    store.subjectStudy[subjectId][category] = (store.subjectStudy[subjectId][category] || 0) + seconds;
  }

  saveStore(store);
}

/** Record that a chapter was read */
export function addChapterRead(subjectId, chapterId) {
  const store = getStore();
  if (!store.chaptersRead[subjectId]) {
    store.chaptersRead[subjectId] = [];
  }
  if (!store.chaptersRead[subjectId].includes(chapterId)) {
    store.chaptersRead[subjectId].push(chapterId);
  }
  saveStore(store);
}

// ─────────────────────────────────────────────
//  QUIZ / ARENA SCORE TRACKING
// ─────────────────────────────────────────────

/** Save a quiz/arena result */
export function saveQuizScore(subjectId, score, total, mode) {
  const store = getStore();
  store.quizScores.push({
    subject: subjectId,
    score,
    total,
    mode, // 'quiz' or 'arena'
    date: new Date().toISOString(),
  });
  saveStore(store);
}

// ─────────────────────────────────────────────
//  DATA READERS (for Parent Dashboard)
// ─────────────────────────────────────────────

/** Get study time breakdown for pie chart (in minutes) */
export function getStudyBreakdown(userId) {
  const store = getStore(userId);
  const st = store.studyTime;
  return [
    { label: 'PDF Learning', minutes: Math.round(st.pdf / 60), color: '#6C5CE7' },
    { label: 'Short Notes', minutes: Math.round(st.notes / 60), color: '#00B894' },
    { label: 'Lesson Time', minutes: Math.round(st.lesson / 60), color: '#FDCB6E' },
    { label: 'Revision', minutes: Math.round(st.revision / 60), color: '#E17055' },
  ];
}

/** Get total study time as formatted string */
export function getTotalStudyTime(userId) {
  const store = getStore(userId);
  const st = store.studyTime;
  const totalSec = st.pdf + st.notes + st.lesson + st.revision;
  const h = Math.floor(totalSec / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  return `${h}h ${m}m`;
}

/** Get per-subject study details */
export function getSubjectStudyDetails(userId) {
  const store = getStore(userId);
  const subjects = Object.keys(SUBJECT_NAMES);

  return subjects.map((id) => {
    const data = store.subjectStudy[id] || { pdf: 0, notes: 0, lesson: 0, revision: 0 };
    const totalSec = data.pdf + data.notes + data.lesson + data.revision;
    const chapters = store.chaptersRead[id] || [];

    return {
      subjectId: id,
      subject: SUBJECT_NAMES[id],
      icon: SUBJECT_ICONS[id],
      pdfTime: formatDuration(data.pdf),
      notesTime: formatDuration(data.notes),
      totalTime: formatDuration(totalSec),
      chaptersRead: chapters.length,
      progress: Math.min(100, Math.round((totalSec / 3600) * 20)), // ~5h = 100%
    };
  });
}

/** Get arena performance overview + per-subject data */
export function getArenaPerformance(userId) {
  const store = getStore(userId);
  const allScores = store.quizScores;

  // Overall stats
  const scores = allScores.map((q) => q.score);
  const overallMax = scores.length > 0 ? Math.max(...scores) : 0;
  const overallMin = scores.length > 0 ? Math.min(...scores) : 0;
  const overallAvg = scores.length > 0 ? parseFloat((scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1)) : 0;

  // Per-subject breakdown
  const subjects = Object.keys(SUBJECT_NAMES);
  const subjectData = subjects.map((id) => {
    const subScores = allScores.filter((q) => q.subject === id);
    const vals = subScores.map((q) => q.score);

    return {
      subject: SUBJECT_NAMES[id],
      icon: SUBJECT_ICONS[id],
      quizzesTaken: subScores.length,
      maxScore: vals.length > 0 ? Math.max(...vals) : 0,
      minScore: vals.length > 0 ? Math.min(...vals) : 0,
      avgScore: vals.length > 0 ? parseFloat((vals.reduce((a, b) => a + b, 0) / vals.length).toFixed(1)) : 0,
      recentScores: vals.slice(-8), // last 8
      // Determine strong/weak from avg (placeholder logic)
      strongTopics: vals.length > 0 && (vals.reduce((a, b) => a + b, 0) / vals.length) >= 7 ? ['Good Performance'] : [],
      weakTopics: vals.length > 0 && (vals.reduce((a, b) => a + b, 0) / vals.length) < 5 ? ['Needs Practice'] : [],
    };
  });

  return {
    totalQuizzes: allScores.length,
    overallMax,
    overallMin,
    overallAvg,
    subjects: subjectData,
  };
}

// ─── Helper ───
function formatDuration(totalSeconds) {
  if (totalSeconds <= 0) return '0m';
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  if (h === 0) return `${m}m`;
  return `${h}h ${m}m`;
}

export { SUBJECT_NAMES, SUBJECT_ICONS };
