import React, { useState, useEffect } from 'react';
import "../styles/profile.css"
import Setup from './Setup';
import DescriptionComponent from './DescriptionComponent';
import ProfileUpdate from './ProfileUpdate';
const Profile = () => {
  const [activePanel, setActivePanel] = useState(null);

  useEffect(() => {
    const storedPanel = localStorage.getItem('activePanel');
    if (storedPanel) {
      setActivePanel(storedPanel);
    }
  }, []);

  const handleClick = (panelName) => {
    setActivePanel(panelName);
    localStorage.setItem('activePanel', panelName);
  };

  return (
    <div className="profile-container">
      <div className="side-panel">
        <button
          className={activePanel === 'description' ? 'active' : ''}
          onClick={() => handleClick('description')}
        >
          Change Password
        </button>
        <button
          className={activePanel === 'setup' ? 'active' : ''}
          onClick={() => handleClick('setup')}
        >
          2FA
        </button>
        <button
          className={activePanel === 'profile' ? 'active' : ''}
          onClick={() => handleClick('profile')}
        >
          Profile Update
        </button>
      </div>

      <div className="component">
        {activePanel === 'description' && <DescriptionComponent />}
        {activePanel === 'profile' && <ProfileUpdate />}
        {activePanel === 'setup' && <Setup />}
      </div>
    </div>
  );
};




export default Profile;
