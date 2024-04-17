import React from 'react';
import { Link } from 'react-router-dom';
import "./Header.css"
const Header = () => {
  return (
    <header style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', backgroundColor: '#1D3557'}}>
      {/* Logo */}
      <div style={{flex: 1}}>
        <img src={`${process.env.PUBLIC_URL}/logo192.png`} alt="App Logo" style={{height: '50px'}} />
      </div>
      
      {/* Title */}
      <div style={{flex: 1, display: 'flex', justifyContent: 'center'}}>
        <h1 style={{textAlign: 'center', color: '#FFFFFF'}}>The Job Hunting AI Web Tool</h1>
      </div>
      
      {/* Navigation */}
      <div style={{flex: 1, display: 'flex', justifyContent: 'flex-end'}}>
        <nav>
          <Link to="/profile" style={{marginRight: '1rem'}}>Profile</Link>
          <Link to="/settings">Settings</Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;