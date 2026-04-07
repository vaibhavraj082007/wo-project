import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { addStudyTime } from '../utils/trackingStore';
import './LessonInterface.css';

const lessonSteps = [
  { id: 1, text: "Welcome to Chapter 1! Today we are looking at Advanced Fractions. A fraction represents a part of a whole." },
  { id: 2, text: "For example, 1/2 means one part out of two equal parts. The top number is the numerator, the bottom is the denominator." },
  { id: 3, text: "When adding fractions with the same denominator, you just add the numerators! Like 1/4 + 2/4 = 3/4." },
  { id: 4, text: "Are you ready to test your skills in the Arena? Let's see what you've got!" }
];

const LessonInterface = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();
  const pageEnterTime = useRef(Date.now());

  // Track time spent on lessons (counts as "lesson" study time)
  useEffect(() => {
    pageEnterTime.current = Date.now();

    return () => {
      const seconds = Math.round((Date.now() - pageEnterTime.current) / 1000);
      if (seconds > 2) {
        addStudyTime('lesson', seconds, 'math');
      }
    };
  }, []);

  const handleNext = () => {
    if (currentStep < lessonSteps.length - 1) {
      setCurrentStep(curr => curr + 1);
    } else {
      navigate('/quiz');
    }
  };

  const handleSkip = () => {
    navigate('/quiz');
  };

  const step = lessonSteps[currentStep];

  return (
    <div className="lesson-page animate-enter">
      <div className="lesson-header">
        <h1 className="game-title">AI Academy</h1>
        <div className="progress-bar thin">
          <div 
            className="progress-fill" 
            style={{ width: `${((currentStep) / (lessonSteps.length - 1)) * 100}%` }}
          ></div>
        </div>
      </div>

      <div className="lesson-content">
        <div className="ai-character animate-bounce-slow">
          <div className="ai-avatar">🦉</div>
          <div className="ai-badge">Teacher</div>
        </div>

        <div className="game-card card-white dialogue-card">
          <p className="dialogue-text">{step.text}</p>
        </div>
      </div>

      <div className="lesson-actions">
        {currentStep < lessonSteps.length - 1 ? (
          <>
            <button className="game-button btn-primary btn-lg action-btn next-btn" onClick={handleNext}>
              NEXT STEP
            </button>
            <button className="game-button btn-white btn-md action-btn skip-btn" onClick={handleSkip}>
              I KNOW THIS (SKIP TO BATTLE)
            </button>
          </>
        ) : (
          <button className="game-button btn-orange btn-lg action-btn battle-btn pulse-animation" onClick={handleNext}>
            ENTER BATTLE ⚔️
          </button>
        )}
      </div>
    </div>
  );
};

export default LessonInterface;
