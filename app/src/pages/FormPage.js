import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FormWizard from "react-form-wizard-component";
import "react-form-wizard-component/dist/style.css";
import { questions } from '../Questions';
import DragDropFiles from '../components/DragDropFiles';
import { FormItem } from "../components/FormItem";
import url from "../api_url.json";
import './Form.css';

const BackTemplate = ({ handlePrevious }) => (
  <button className="base-button" onClick={handlePrevious}>
    Back
  </button>
);

const NextTemplate = ({ handleNext }) => (
  <button className="base-button" onClick={handleNext}>
    Next
  </button>
);

const FinishTemplate = ({ handleComplete }) => (
  <button className="base-button" onClick={handleComplete}>
    Finish
  </button>
);

const FormPage = () => {
  const [formData, setFormData] = useState({});
  const [pdfFile, setPdfFile] = useState(null);
  const navigate = useNavigate();

  const handleInputChange = (newValue, field) => {
    setFormData(prev => ({
      ...prev,
      [field]: newValue
    }));
  };

  const handleSubmit = async () => {
  if (!formData.username || !formData.email || !formData.password || !formData.first_name || !formData.last_name) {
    console.error('Required fields are missing');
    return;
  }

    console.log("Form completed!", formData);
    const submitData = new FormData();
    Object.keys(formData).forEach(key => {
      submitData.append(key, formData[key] || '');
    });
    if (pdfFile) {
      submitData.append('resume', pdfFile);
      console.log("Appending resume to FormData");
    }

    try {
      const response = await fetch(`${url['api_url']}/create-account`, {
        method: 'POST',
        body: submitData,
      });

      if (response.ok) {
        const jsonResponse = await response.json();
        console.log('Account created successfully. Token:', jsonResponse.token);
        localStorage.setItem('token', jsonResponse.token);
        navigate('/search');
      } else {
        console.error('Failed to send request. Server responded with status:', response.status);
      }
    } catch (error) {
      console.error('Failed to send request:', error);
    }
  };

  const handlePDFChange = (file) => {
    setPdfFile(file);
  };

  return (
    <div className="form-page-container">
      <div className="form-page-header">
        <div className="form-page-title">Registration Form</div>
        <div className="form-page-underline"></div>
      </div>
      <FormWizard
        shape="circle"
        color="#E63946"
        onComplete={handleSubmit}
        backButtonTemplate={(handlePrevious) => <BackTemplate handlePrevious={handlePrevious} />}
        nextButtonTemplate={(handleNext) => <NextTemplate handleNext={handleNext} />}
        finishButtonTemplate={(handleComplete) => <FinishTemplate handleComplete={handleComplete} />}
      >
        {questions.map((section) => (
          <FormWizard.TabContent  key={`step-${section.section}`}>
            <div className="form-page-inputs">
              {section.items.map((item) => (
                <div className="form-page-input" key={item.value}>
                  {item.type === 'select' || item.type === 'text' || item.type === 'email' || item.type === 'password' || item.type === 'phone_number' ? (
                    <FormItem
                      item={item}
                      answer={formData[item.value] || ''}
                      onChange={handleInputChange}
                    />
                  ) : item.type === 'dragDropFile' ? (
                    <DragDropFiles onFileSelect={handlePDFChange} />
                  ) : null}
                </div>
              ))}
            </div>
          </FormWizard.TabContent>
        ))}
      </FormWizard>
    </div>
  );
};

export default FormPage;
