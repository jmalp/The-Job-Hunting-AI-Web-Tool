import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import url from "../api_url.json";
import "../pages/Settings.css";

const AccountDelete = () => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [deletionSuccess, setDeletionSuccess] = useState(false);
  const navigate = useNavigate();

  const handleDeleteAccount = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(url['api_url'] + '/delete-account', {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        console.log('Account deleted successfully');
        setDeletionSuccess(true);
        localStorage.removeItem('token');
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      } else {
        console.error('Failed to delete account');
      }
    } catch (error) {
      console.error('Error deleting account:', error);
    }
  };

  return (
    <div className="section-container">
      <div className="delete-account-container">
        {!showConfirmation ? (
          <button className="settings-button-delete delete-button" onClick={() => setShowConfirmation(true)}>
            Delete Account
          </button>
        ) : deletionSuccess ? (
          <div className="confirmation-container">
            <p className="success-message" style={{ color: 'white' }}>Account deleted successfully. You will be redirected to the login screen shortly.</p>
          </div>
        ) : (
          <div className="confirmation-container">
            <p>Are you sure? This cannot be undone.</p>
            <div className="confirmation-buttons">
              <button className="settings-button-yes" onClick={handleDeleteAccount}>
                Yes
              </button>
              <button className="settings-button-no" onClick={() => setShowConfirmation(false)}>
                No
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AccountDelete;