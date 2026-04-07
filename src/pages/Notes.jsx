import { useParams, Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import notesData from '../data/notesData';
import { getPdfUrl, getPdfChapterCount } from '../data/pdfMapping';
import { addStudyTime, addChapterRead } from '../utils/trackingStore';
import './Notes.css';

const Notes = () => {
  const { classId, subjectId } = useParams();
  const pdfOpenTime = useRef(null);
  const currentSubject = useRef(subjectId);

  const classNum = parseInt(classId) || 6;
  const classData = notesData[classNum];
  const subjectData = classData ? classData[subjectId] : null;

  // Track time spent on Notes page itself (counts as "notes" study time)
  const pageEnterTime = useRef(Date.now());

  useEffect(() => {
    pageEnterTime.current = Date.now();
    currentSubject.current = subjectId;

    return () => {
      // When leaving Notes page, log the time as "notes" reading
      const seconds = Math.round((Date.now() - pageEnterTime.current) / 1000);
      if (seconds > 2) {
        addStudyTime('notes', seconds, currentSubject.current);
      }
    };
  }, [subjectId]);

  // Track when user returns from a PDF tab
  useEffect(() => {
    const handleFocus = () => {
      if (pdfOpenTime.current) {
        const seconds = Math.round((Date.now() - pdfOpenTime.current) / 1000);
        if (seconds > 2) {
          addStudyTime('pdf', seconds, currentSubject.current);
        }
        pdfOpenTime.current = null;
      }
    };

    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, []);

  if (!subjectData) {
    return (
      <div className="animate-enter" style={{ padding: '2rem', textAlign: 'center' }}>
        <h1 className="game-title">Notes Not Found</h1>
        <p>No notes available for this selection.</p>
        <Link to="/classes">
          <button className="game-button btn-primary btn-lg">← Back to Classes</button>
        </Link>
      </div>
    );
  }

  // Limit displayed chapters to the number of available PDFs
  const pdfCount = getPdfChapterCount(classNum, subjectId);
  const chaptersToShow = pdfCount > 0
    ? subjectData.chapters.slice(0, pdfCount)
    : subjectData.chapters;

  const handleChapterClick = (chapterNum) => {
    const pdfUrl = getPdfUrl(classNum, subjectId, chapterNum);
    if (pdfUrl) {
      // Record that this chapter was read
      addChapterRead(subjectId, chapterNum);
      // Start timing the PDF view
      pdfOpenTime.current = Date.now();
      window.open(pdfUrl, '_blank');
    }
  };

  return (
    <div className="notes-page animate-enter">
      {/* Header */}
      <div className="notes-header">
        <span className="notes-header-icon">{subjectData.icon}</span>
        <div>
          <h1 className="game-title" style={{ margin: 0, textAlign: 'left' }}>
            Class {classNum} — {subjectData.name}
          </h1>
          <p className="notes-subtitle">
            {chaptersToShow.length} Chapters • Tap a chapter to open notes
          </p>
        </div>
      </div>

      {/* Chapter List */}
      <div className="chapter-list">
        {chaptersToShow.map((chapter) => {
          const pdfUrl = getPdfUrl(classNum, subjectId, chapter.id);
          return (
            <div
              key={chapter.id}
              className={`chapter-card ${pdfUrl ? 'chapter-card--has-pdf' : ''}`}
              onClick={() => handleChapterClick(chapter.id)}
            >
              <div className="chapter-card-header">
                <div className="chapter-number">
                  <span>{chapter.id}</span>
                </div>
                <div className="chapter-info">
                  <h3 className="chapter-title">{chapter.title}</h3>
                  <p className="chapter-summary">{chapter.summary}</p>
                </div>
                {pdfUrl && (
                  <div className="chapter-pdf-badge">
                    📄 PDF
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Actions */}
      <div className="notes-actions">
        <Link to={classId ? `/classes/${classId}/options/${subjectId}` : `/options/${subjectId}`}>
          <button className="game-button btn-white btn-lg">⬅️ Back</button>
        </Link>
        <Link to={classId ? `/classes/${classId}/map/${subjectId}` : `/map/${subjectId}`}>
          <button className="game-button btn-primary btn-lg pulse-animation">ENTER ARENA ⚔️</button>
        </Link>
      </div>
    </div>
  );
};

export default Notes;
