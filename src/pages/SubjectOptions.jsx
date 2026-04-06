import { useParams, Link } from 'react-router-dom';
import './ClassSelection.css';

const SubjectOptions = () => {
  const { classId, subjectId } = useParams();

  let subjectName = 'Unknown Subject';
  let subjectColor = 'white';

  if (subjectId === 'math') {
    subjectName = 'Mathematics';
    subjectColor = 'blue';
  } else if (subjectId === 'sci') {
    subjectName = 'Science';
    subjectColor = 'primary';
  } else if (subjectId === 'eng') {
    subjectName = 'English';
    subjectColor = 'gold';
  } else if (subjectId === 'sst') {
    subjectName = 'Social Studies';
    subjectColor = 'secondary';
  } else if (subjectId === 'hindi') {
    subjectName = 'Hindi';
    subjectColor = 'purple';
  }

  return (
    <div className="selection-page animate-enter">
      <h1 className="game-title">Class {classId} — {subjectName}</h1>
      <p className="selection-subtitle">What would you like to do?</p>
      
      <div className="grid-container" style={{ maxWidth: '900px', margin: '0 auto', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
        
        <Link to={`/classes/${classId}/notes/${subjectId}`} style={{ textDecoration: 'none' }}>
          <div className="game-card card-gold selection-card subject-card" style={{ height: '100%' }}>
            <div className="card-icon">📖</div>
            <h3>Study Notes</h3>
            <p style={{ marginTop: '10px', fontSize: '0.9rem', color: '#666' }}>Review key concepts and formulas</p>
          </div>
        </Link>
        
        <Link to={`/classes/${classId}/short-notes/${subjectId}`} style={{ textDecoration: 'none' }}>
          <div className="game-card card-secondary selection-card subject-card" style={{ height: '100%' }}>
            <div className="card-icon">📝</div>
            <h3>Short Notes</h3>
            <p style={{ marginTop: '10px', fontSize: '0.9rem', color: '#666' }}>Quick revisions and summaries</p>
          </div>
        </Link>

        <Link to={`/classes/${classId}/map/${subjectId}`} style={{ textDecoration: 'none' }}>
          <div className={`game-card card-${subjectColor} selection-card subject-card`} style={{ height: '100%' }}>
            <div className="card-icon">⚔️</div>
            <h3>Enter Arena</h3>
            <p style={{ marginTop: '10px', fontSize: '0.9rem', color: '#666' }}>Test your skills in interactive quests</p>
          </div>
        </Link>

      </div>
    </div>
  );
};

export default SubjectOptions;
