import { Link } from 'react-router-dom';
import './RoleSelection.css';

const RoleSelection = () => {
  return (
    <div className="rs-page">
      {/* Background layers */}
      <div className="rs-bg"></div>
      <div className="rs-overlay"></div>

      {/* Minimal top bar */}
      <div className="rs-topbar">
        <span className="rs-topbar-logo">EduQuest</span>
      </div>

      {/* Content */}
      <div className="rs-content">
        <div className="rs-header">
          <h1 className="rs-title">Who Is Entering?</h1>
          <p className="rs-subtitle">Choose your role to begin</p>
        </div>

        <div className="rs-cards">
          <Link to="/student-onboarding" className="rs-card-link">
            <div className="rs-card-wrapper">
              <img
                src="/987.png.jpeg"
                alt="Student character"
                className="rs-card-character"
              />
              <div className="rs-card rs-card--student">
                <div className="rs-card-glow rs-card-glow--blue"></div>
                <div className="rs-card-inner">
                  <h2 className="rs-card-title">Student</h2>
                  <p className="rs-card-desc">Start learning and earn rewards</p>
                </div>
                <div className="rs-card-border"></div>
              </div>
            </div>
          </Link>

          <Link to="/login" className="rs-card-link">
            <div className="rs-card-wrapper">
              <img
                src="/123.png.jpeg"
                alt="Parent character"
                className="rs-card-character"
              />
              <div className="rs-card rs-card--parent">
                <div className="rs-card-glow rs-card-glow--purple"></div>
                <div className="rs-card-inner">
                  <h2 className="rs-card-title">Parent / Guardian</h2>
                  <p className="rs-card-desc">Track progress and view reports</p>
                </div>
                <div className="rs-card-border"></div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;
