import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import "./Header.css";

const SettingsIcon = () => <span className="material-symbols-outlined settings-icon">account_circle</span>;

const Header = () => {
  const location = useLocation();  // Use the hook to get the current location

  return (
    <header style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', backgroundColor: '#1D3557'}}>
      {/* Logo */}
      <div style={{flex: 1}}>
        {/* Logo or content */}
      </div>
      
      {/* Title */}
      <div style={{flex: 1, display: 'flex', justifyContent: 'center'}}>
        <h1 style={{textAlign: 'center', color: '#FFFFFF'}}>The Job Hunting AI Web Tool</h1>
      </div>
      
      {/* Navigation */}
      <div style={{flex: 1, display: 'flex', justifyContent: 'flex-end'}}>
        <nav>
          {/* Render the SettingsIcon only if the current path is '/search' */}
          {location.pathname === '/search' && (
            <Link to="/settings" title="Settings">
              <SettingsIcon />
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
