import { Link, useParams } from 'react-router-dom';
import { subjectDetails } from '../data/arenasData';
import './ClassSelection.css';

const ArenaSubjects = () => {
  const { classId } = useParams();

  const subjects = [
    { id: 'math', icon: '➗', name: 'Mathematics', cardClass: 'card-blue' },
    { id: 'sci', icon: '🔬', name: 'Science', cardClass: 'card-primary' },
    { id: 'eng', icon: '📖', name: 'English', cardClass: 'card-gold' },
    { id: 'sst', icon: '🌍', name: 'Social Studies', cardClass: 'card-secondary' },
    { id: 'hindi', icon: 'अ', name: 'Hindi', cardClass: 'card-purple' },
  ];

  return (
    <div className="selection-page animate-enter">
      <h1 className="game-title">Class {classId} — Arena ⚔️</h1>
      <p className="selection-subtitle">Pick a subject to battle in!</p>

      <div className="grid-container">
        {subjects.map((sub) => (
          <Link key={sub.id} to={`/classes/${classId}/map/${sub.id}`} style={{ textDecoration: 'none' }}>
            <div className={`game-card ${sub.cardClass} selection-card subject-card`}>
              <div className="card-icon">{sub.icon}</div>
              <h3>{sub.name}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ArenaSubjects;
