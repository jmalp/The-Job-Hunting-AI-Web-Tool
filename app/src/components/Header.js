import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import "./Header.css";

const SettingsIcon = () => <span className="material-symbols-outlined settings-icon">account_circle</span>;

const SearchIcon = () => <span className="material-icons search-icon">Back to Search</span>

const Header = () => {
  const location = useLocation();

  return (
    <div className='main-header'>
      <header style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', backgroundColor: '#1D3557'}}>
        {/* Logo */}
        <div style={{flex: 1}}>
        </div>
        
        {/* Title */}
        <div style={{flex: 1, display: 'flex', justifyContent: 'center'}}>
          <h1 style={{textAlign: 'center', color: '#FFFFFF'}}>The Job Hunting AI Web Tool</h1>
        </div>
        
        {/* Navigation */}
        <div style={{flex: 1, display: 'flex', justifyContent: 'flex-end'}}>
          <nav>
            {location.pathname === '/search' && (
              <Link to="/settings" title="Settings">
                <SettingsIcon />
              </Link>
            )}
            {location.pathname === '/settings' && (
              <Link to="/search" title="Search">
                <SearchIcon />
              </Link>
            )}
          </nav>
        </div>
      </header>
    </div>
  );
};

export default Header;
