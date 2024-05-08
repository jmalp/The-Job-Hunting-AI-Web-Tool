import React, { useState } from 'react';
import "../pages/Login.css"

const ProfileForm = ({ initialValues, onSubmit, onError }) => {
  const [formValues, setFormValues] = useState({ ...initialValues, password: '', confirmPassword: '', file: null });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setFormValues({
      ...formValues,
      file: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formValues.password !== formValues.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("username", formValues.username);
      formData.append("email", formValues.email);
      formData.append("city", formValues.city);
      formData.append("state", formValues.state);
      formData.append("phone_number", formValues.phone_number);
      formData.append("password", formValues.password);

      await onSubmit(formData);
    } catch (error) {
      setError(error.message);
      onError && onError(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="inputs">
        {error && <div className="error">{error}</div>}
        <div className="input">
          <input type="text" name="username" value={formValues.username} onChange={handleChange} placeholder="Username" className="input-field"/>
        </div>
        <div className="input">
          <input type="email" name="email" value={formValues.email} onChange={handleChange} placeholder="Email" className="input-field"/>
        </div>
        <div className="input">
          <input type="password" name="password" value={formValues.password} onChange={handleChange} placeholder="Password" className="input-field"/>
        </div>
        <div className="input">
          <input type="password" name="confirmPassword" value={formValues.confirmPassword} onChange={handleChange} placeholder="Confirm Password" className="input-field"/>
        </div>
        <div className="input">
          <input type="text" name="city" value={formValues.city} onChange={handleChange} placeholder="City" className="input-field"/>
        </div>
        <div className="input">
          <input type="text" name="state" value={formValues.state} onChange={handleChange} placeholder="State" className="input-field"/>
        </div>
        <div className="input">
          <input type="text" name="phone_number" value={formValues.phone_number} onChange={handleChange} placeholder="Phone Number" className="input-field"/>
        </div>
      </div>
      <div className="submit-container">
        <button type="submit" className="submit">Submit</button>
      </div>
    </form>
  );
};

export default ProfileForm;
