import { Link, useParams } from 'react-router-dom';
import './ClassSelection.css';

const SubjectSelection = () => {
  const { classId } = useParams();

  return (
    <div className="selection-page animate-enter">
      <h1 className="game-title">Class {classId} — Pick a Subject</h1>
      <p className="selection-subtitle">What are we learning today?</p>
      
      <div className="grid-container">
        
        <Link to={`/classes/${classId}/options/math`} style={{ textDecoration: 'none' }}>
          <div className="game-card card-blue selection-card subject-card">
            <div className="card-icon">➗</div>
            <h3>Mathematics</h3>
          </div>
        </Link>

        <Link to={`/classes/${classId}/options/sci`} style={{ textDecoration: 'none' }}>
          <div className="game-card card-primary selection-card subject-card">
            <div className="card-icon">🔬</div>
            <h3>Science</h3>
          </div>
        </Link>

        <Link to={`/classes/${classId}/options/eng`} style={{ textDecoration: 'none' }}>
          <div className="game-card card-gold selection-card subject-card">
            <div className="card-icon">📖</div>
            <h3>English</h3>
          </div>
        </Link>

        <Link to={`/classes/${classId}/options/sst`} style={{ textDecoration: 'none' }}>
          <div className="game-card card-secondary selection-card subject-card">
            <div className="card-icon">🌍</div>
            <h3>Social Studies</h3>
          </div>
        </Link>

        <Link to={`/classes/${classId}/options/hindi`} style={{ textDecoration: 'none' }}>
          <div className="game-card card-purple selection-card subject-card">
            <div className="card-icon">अ</div>
            <h3>Hindi</h3>
          </div>
        </Link>

      </div>
    </div>
  );
};

export default SubjectSelection;
