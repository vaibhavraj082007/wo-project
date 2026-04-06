import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { collection, query, where, limit, getDocs } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { checkAndSeedSchools } from '../utils/seedSchools';
import './StudentOnboarding.css';

const StudentOnboarding = () => {
  // Simple states
  const [school, setSchool] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [phoneVerified, setPhoneVerified] = useState(false);
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Search states
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Load initial school data
  useEffect(() => {
    checkAndSeedSchools();
  }, []);

  // Hide dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Simple beginner-friendly auto-search
  useEffect(() => {
    if (!school.trim()) {
      setSuggestions([]);
      setShowDropdown(false);
      return;
    }

    setShowDropdown(true);
    setIsSearching(true);

    // Wait a bit before searching so we don't spam the database
    const timer = setTimeout(async () => {
      try {
        const schoolsRef = collection(db, 'schools');
        const q = query(
          schoolsRef, 
          where('searchKeywords', 'array-contains', school.toLowerCase().trim()),
          limit(6)
        );
        const snapshot = await getDocs(q);
        
        // Convert to array
        let results = [];
        snapshot.forEach((doc) => {
          results.push({ id: doc.id, ...doc.data() });
        });
        
        setSuggestions(results);
      } catch (error) {
        console.error("Search failed:", error);
      }
      setIsSearching(false);
    }, 400);

    return () => clearTimeout(timer);
  }, [school]);

  const selectSchool = (chosenSchool) => {
    setSchool(chosenSchool.name);
    setShowDropdown(false);
  };

  const setupRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', { size: 'invisible' });
    }
  };

  const sendOtp = async () => {
    if (!phone) {
      setMessage('Please enter a phone number first.');
      return;
    }

    try {
      setLoading(true);
      setMessage('');
      setupRecaptcha();

      const verifier = window.recaptchaVerifier;
      const result = await signInWithPhoneNumber(auth, '+91' + phone, verifier);
      
      setConfirmationResult(result);
      setOtpSent(true);
      setMessage('OTP has been sent!');
    } catch (error) {
      setMessage('Error sending OTP. Check number format.');
      console.log(error);
    }
    setLoading(false);
  };

  const verifyOtp = async () => {
    if (!otp) {
      setMessage('Please enter the OTP you received.');
      return;
    }

    try {
      setLoading(true);
      await confirmationResult.confirm(otp);
      setPhoneVerified(true);
      setMessage('Phone verified successfully!');
    } catch (error) {
      setMessage('OTP is incorrect. Try again.');
      console.log(error);
    }
    setLoading(false);
  };

  const saveAndContinue = (e) => {
    e.preventDefault();

    if (!phoneVerified) {
      setMessage('Please verify your phone number first.');
      return;
    }

    if (school && name) {
      // Save data locally
      const profileData = { name, school, phone, phoneVerified: true };
      localStorage.setItem('eduquest_student_profile', JSON.stringify(profileData));
      navigate('/classes');
    }
  };

  return (
    <div className="onboarding-page animate-enter">
      <div className="game-card card-white onboarding-card">
        
        <div className="onboarding-header">
          <span className="onboarding-icon">🏫</span>
          <h2 className="onboarding-title">Tell Us About You!</h2>
          <p className="onboarding-subtitle">Before we start the adventure...</p>
        </div>

        <form onSubmit={saveAndContinue} className="onboarding-form">
          <div className="form-group">
            <label>Student's Avatar Name</label>
            <input
              type="text"
              className="onboarding-input"
              placeholder="e.g. Alex M."
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>School or College Name</label>
            <div className="school-input-container" ref={dropdownRef}>
              <input
                type="text"
                className="onboarding-input"
                placeholder="e.g. Springfield High"
                value={school}
                onChange={(e) => setSchool(e.target.value)}
                onFocus={() => { if (school) setShowDropdown(true); }}
                required
              />
              
              {showDropdown && (
                <ul className="school-dropdown">
                  {isSearching && <li className="school-dropdown-message">Searching...</li>}
                  
                  {!isSearching && suggestions.length === 0 && (
                    <li className="school-dropdown-message">No matching schools found</li>
                  )}
                  
                  {!isSearching && suggestions.map(s => (
                    <li 
                      key={s.id} 
                      className="school-dropdown-item"
                      onClick={() => selectSchool(s)}
                    >
                      <span className="school-name">{s.name}</span>
                      <span className="school-address">{s.address}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div className="form-group">
            <label>Phone Number</label>
            <input
              type="text"
              className="onboarding-input"
              placeholder="10-digit mobile number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>

          <button className="game-button btn-orange btn-full" type="button" onClick={sendOtp} disabled={loading}>
            {loading && !otpSent ? 'Sending...' : 'SEND OTP'}
          </button>

          {otpSent && (
            <div className="form-group" style={{ marginTop: '15px' }}>
              <label>Enter OTP</label>
              <input
                type="text"
                className="onboarding-input"
                placeholder="6-digit OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            </div>
          )}

          {otpSent && (
            <button className="game-button btn-orange btn-full" type="button" onClick={verifyOtp} disabled={loading || phoneVerified}>
              {phoneVerified ? 'VERIFIED' : loading ? 'Verifying...' : 'VERIFY OTP'}
            </button>
          )}

          {message && (
            <p style={{ textAlign: 'center', color: phoneVerified ? '#22c55e' : '#ffffff', marginTop: '10px', fontWeight: '600' }}>
              {message}
            </p>
          )}

          <div id="recaptcha-container"></div>

          <button className="game-button btn-orange btn-full" type="submit" disabled={!phoneVerified} style={{ marginTop: '20px' }}>
            NEXT STEP ➡️
          </button>
        </form>

      </div>
    </div>
  );
};

export default StudentOnboarding;