import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';

// Auth & Onboarding
import SplashScreen from './pages/SplashScreen';
import RoleSelection from './pages/RoleSelection';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import StudentOnboarding from './pages/StudentOnboarding';

// Core App
import Dashboard from './pages/Dashboard';
import ParentDashboard from './pages/ParentDashboard';
import Profile from './pages/Profile';
import Leaderboard from './pages/Leaderboard';

// Learning Flow
import ClassSelection from './pages/ClassSelection';
import SubjectSelection from './pages/SubjectSelection';
import SubjectOptions from './pages/SubjectOptions';
import Notes from './pages/Notes';
import LearningMap from './pages/LearningMap';
import LessonInterface from './pages/LessonInterface';
import Quiz from './pages/Quiz';
import Results from './pages/Results';
import ArenaSetup from './pages/ArenaSetup';
import Arena from './pages/Arena';
import ArenaSubjects from './pages/ArenaSubjects';

// Simple Header component (no separate file needed)
const Header = () => {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup' || location.pathname === '/home';

  return (
    <header className="app-header">
      <div className="header-container">
        <Link to="/home" className="header-logo">EduQuest</Link>
        <div className="header-actions">
          {isAuthPage ? (
            <>
              <Link to="/login"><button className="game-button btn-white btn-sm">Log IN</button></Link>
              <Link to="/signup"><button className="game-button btn-gold btn-sm">SIGN UP</button></Link>
            </>
          ) : (
            <>
              <Link to="/dashboard" className="nav-icon" title="Dashboard">🏠</Link>
              <Link to="/leaderboard" className="nav-icon" title="Leaderboard">🏆</Link>
              <Link to="/parents" className="nav-icon" title="Parent Portal">👨‍👩‍👦</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

const AppContent = () => {
  const location = useLocation();
  const isSplash = location.pathname === '/';
  const isDashboard = location.pathname === '/dashboard';
  const isRoleSelection = location.pathname === '/role-selection';

  return (
    <div className="app-container">
      {!isSplash && !isDashboard && !isRoleSelection && <Header />}
      <main className={isSplash || isDashboard ? "" : "main-content"}>
        <Routes>
          <Route path="/" element={<SplashScreen />} />
          <Route path="/home" element={<LandingPage />} />
          <Route path="/role-selection" element={<RoleSelection />} />
          <Route path="/student-onboarding" element={<StudentOnboarding />} />
          <Route path="/login" element={<LoginPage isSignup={false} />} />
          <Route path="/signup" element={<LoginPage isSignup={true} />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/parents" element={<ParentDashboard />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/classes" element={<ClassSelection />} />
          <Route path="/subjects" element={<SubjectSelection />} />
          <Route path="/classes/:classId/subjects" element={<SubjectSelection />} />
          <Route path="/options/:subjectId" element={<SubjectOptions />} />
          <Route path="/classes/:classId/options/:subjectId" element={<SubjectOptions />} />
          <Route path="/notes/:subjectId" element={<Notes />} />
          <Route path="/classes/:classId/notes/:subjectId" element={<Notes />} />
          <Route path="/classes/:classId/arena-subjects" element={<ArenaSubjects />} />
          <Route path="/classes/:classId/map/:subjectId" element={<LearningMap />} />
          <Route path="/lesson" element={<LessonInterface />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/results" element={<Results />} />
          <Route path="/arena-setup" element={<ArenaSetup />} />
          <Route path="/arena" element={<Arena />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </main>
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
