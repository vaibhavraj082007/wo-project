import { Link } from 'react-router-dom';
import './ClassSelection.css';

const ClassSelection = () => {
  return (
    <div className="selection-page animate-enter">
      <h1 className="game-title">Select Your Class</h1>
      <p className="selection-subtitle">Choose the class you want to tackle today!</p>
      
      <div className="grid-container">
        
        <Link to="/classes/6/subjects" style={{ textDecoration: 'none' }}>
          <div className="game-card card-blue selection-card">
            <div className="card-icon" style={{ fontSize: '2.5rem' }}>🏰</div>
            <div className="card-number">6</div>
            <h3>Class 6</h3>
          </div>
        </Link>
        
        <Link to="/classes/7/subjects" style={{ textDecoration: 'none' }}>
          <div className="game-card card-primary selection-card">
            <div className="card-icon" style={{ fontSize: '2.5rem' }}>⚔️</div>
            <div className="card-number">7</div>
            <h3>Class 7</h3>
          </div>
        </Link>
        
        <Link to="/classes/8/subjects" style={{ textDecoration: 'none' }}>
          <div className="game-card card-purple selection-card">
            <div className="card-icon" style={{ fontSize: '2.5rem' }}>🛡️</div>
            <div className="card-number">8</div>
            <h3>Class 8</h3>
          </div>
        </Link>
        
      </div>
    </div>
  );
};

export default ClassSelection;
