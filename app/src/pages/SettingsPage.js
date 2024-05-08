import React, { useState, useEffect } from 'react';
import './Settings.css';
import url from "../api_url.json";
import SkillsInput from '../components/SkillsInput';
import ProfileForm from '../components/ProfileForm';
import AccountDelete from '../components/AccountDelete';

const DeleteIcon = ({ onClick }) => (
    <span className="material-symbols-outlined remove-skill" onClick={onClick}>
      cancel
    </span>
  );
  
  const ProfileSection = () => {
    const [profileData, setProfileData] = useState({
        username: '',
        email: '',
        city: '',
        state: '',
        phone_number: '',
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch(url['api_url'] + '/get-account', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                const data = await response.json();

                if (response.ok) {
                    if (data.hasOwnProperty("error")) {
                        console.error("Error fetching profile data:", data.error);
                    } else {
                        setProfileData(data);
                        setLoading(false);
                    }
                } else {
                    console.error('Failed to fetch profile data');
                    setLoading(false);
                }
            } catch (error) {
                console.error('Error fetching profile data:', error);
                setLoading(false);
            }
        };

        fetchProfileData();
    }, []);

    const handleProfileUpdate = async (formData) => {
        try {
          const token = localStorage.getItem('token');
          const response = await fetch(url['api_url'] + '/update-account', {
            method: 'PUT',
            headers: {
              'Authorization': `Bearer ${token}`,
            },
            body: formData,
          });
      
          if (response.ok) {
            console.log('Profile updated successfully');
            const updatedData = await response.json();
            setProfileData(updatedData);
          } else {
            console.error('Failed to update profile');
          }
        } catch (error) {
          console.error('Error updating profile:', error);
        }
      };

    const handleError = (errorMessage) => {
        console.error('Profile form error:', errorMessage);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="section-container">
            <h2>Update Profile</h2>
            <ProfileForm initialValues={profileData} onSubmit={handleProfileUpdate} onError={handleError} />
        </div>
    );
};


const SkillsSection = () => {
    const [addedSkills, setAddedSkills] = useState([]);
  
    useEffect(() => {
        const fetchUserSkills = async () => {
          try {
            const token = localStorage.getItem('token');
            const response = await fetch(url['api_url'] + '/get-user-skills', {
              method: 'GET',
              headers: {
                'Authorization': `Bearer ${token}`,
              },
            });
      
            const data = await response.json();
      
            if (response.ok) {
              if (data.hasOwnProperty("error")) {
                console.error("Error fetching user skills:", data.error);
              } else {
                setAddedSkills(data);
              }
            } else {
              console.error('Failed to fetch user skills');
            }
          } catch (error) {
            console.error('Error fetching user skills:', error);
          }
        };
      
        fetchUserSkills();
      }, []);
  
    const addSkill = (skill) => {
      if (!addedSkills.includes(skill)) {
        setAddedSkills([...addedSkills, skill]);
      }
    };
  
    const removeSkill = async (skill) => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(url['api_url'] + '/remove-skill', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({ skill }),
        });
  
        if (response.ok) {
          setAddedSkills(addedSkills.filter((s) => s !== skill));
        } else {
          console.error('Failed to remove skill');
        }
      } catch (error) {
        console.error('Error removing skill:', error);
      }
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
                  <DeleteIcon onClick={() => removeSkill(skill)} />
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
      <AccountDelete />
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