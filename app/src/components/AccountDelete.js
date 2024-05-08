import React, { useState } from 'react';
import url from "../api_url.json";

const AccountDelete = () => {
  const [showConfirmation, setShowConfirmation] = useState(false);

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
        // Account deleted successfully, perform any necessary cleanup or redirection
        console.log('Account deleted successfully');
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