import React, { useState } from 'react';
import './Settings.css';
import SkillsInput from '../components/SkillsInput';

const DeleteIcon = ({ onClick }) => (
    <span className="material-symbols-outlined remove-skill" onClick={onClick}>
      cancel
    </span>
  );
  
const ProfileSection = () => (
  <div className="section-container">
    <h2>Profile</h2>
    <p>Placeholder text for the profile section.</p>
  </div>
);

const SkillsSection = () => {
  const [addedSkills, setAddedSkills] = useState([]);
  const addSkill = (skill) => {
    if (!addedSkills.includes(skill)) {
      setAddedSkills([...addedSkills, skill]);
    }
  };

  const removeSkill = (skill) => {
    setAddedSkills(addedSkills.filter((s) => s !== skill));
  };

  return (
    <div className="section-container">
      <h2>Skills</h2>
      <SkillsInput addSkill={addSkill} />
      <div className="added-skills">
        {addedSkills.map((skill) => (
          <div key={skill} className="added-skill">
            <span className="skill-button">
              {skill}
              <DeleteIcon onClick={(e) => {
                e.stopPropagation();
                removeSkill(skill);}} />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

const ResumeSection = () => (
  <div className="section-container">
    <h2>Resume</h2>
    <p>Placeholder text for the resume section.</p>
  </div>
);

const AccountSection = () => (
  <div className="section-container">
    <h2>Account</h2>
    <p>Placeholder text for the account section.</p>
  </div>
);

const SettingsPage = () => {
  const [activeSection, setActiveSection] = useState('profile');

  const renderSection = () => {
    switch (activeSection) {
      case 'profile':
        return <ProfileSection />;
      case 'skills':
        return <SkillsSection />;
      case 'resume':
        return <ResumeSection />;
      case 'account':
        return <AccountSection />;
      default:
        return null;
    }
  };

  return (
    <div className="settings-container">
      <div className="settings-header">
        <div className="settings-title">Account Settings</div>
        <div className="settings-underline"></div>
      </div>
      <div className="settings-content">
        <div className="settings-sidebar">
          <button
            className={`settings-button ${activeSection === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveSection('profile')}
          >
            Profile
          </button>
          <button
            className={`settings-button ${activeSection === 'skills' ? 'active' : ''}`}
            onClick={() => setActiveSection('skills')}
          >
            Skills
          </button>
          <button
            className={`settings-button ${activeSection === 'resume' ? 'active' : ''}`}
            onClick={() => setActiveSection('resume')}
          >
            Resume
          </button>
          <button
            className={`settings-button ${activeSection === 'account' ? 'active' : ''}`}
            onClick={() => setActiveSection('account')}
          >
            Account
          </button>
        </div>
        <div className="settings-section">{renderSection()}</div>
      </div>
    </div>
  );
};

export default SettingsPage;