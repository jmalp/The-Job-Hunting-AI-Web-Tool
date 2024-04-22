import './Login.css'
import '../components/MultiStepProgress.css'
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom'
import { MultiStepProgressBar } from '../components/MultiStepProgress'
import { MultiStepForm } from '../components/MultiStepForm'
import { questions } from '../Questions'
import url from "../api_url.json";
import DragDropFiles from '../components/DragDropFiles'

function FormPage() {
  const [index, setIndex] = useState(1)
  const [submitted, setSubmitted] = useState(false)
  const totalPagesCount = questions?.length || 0
  const [pagesAnswers, setPagesAnswers] = useState({})
  const [pdfFile, setPdfFile] = useState(null);
  const navigate = useNavigate()
  const inputRef = useRef(null);

  const prevButton = () => {
    if (index > 1) {
      setIndex(prevIndex => prevIndex - 1)
    }
  }

  const nextButton = () => {
    if (index === totalPagesCount) {
      handleSubmit();
    } else {
      setIndex((prevIndex) => prevIndex + 1);
    }
  };

  const onPageAnswerUpdate = (step, answersObj) => {
    setPagesAnswers({ ...pagesAnswers, [step]: answersObj })
  }

  // const handlePDFChange = (event) => {
  //   setPdfFile(event.target.files[0]);
  // };

  const handlePDFChange = (file) => {
    setPdfFile(file);
  };

  const handleReset = () => {
    setIndex(1)
    setSubmitted(false)
  }

  const handleSubmit = async () => {
    console.log('Form submitted');
    const formData = new FormData();

    Object.keys(pagesAnswers).forEach(page => {
      Object.entries(pagesAnswers[page]).forEach(([key, value]) => {
        if (key !== 'index' && value != null) {
          formData.append(key, value);
        }
      });
    });

    if (pdfFile) {
      formData.append('resume', pdfFile);
    }

    try {
      const response = await fetch(`${url['api_url']}/create-account`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const jsonResponse = await response.json();
        console.log('Account created successfully. Token:', jsonResponse.token);
        setSubmitted(true);
      } else {
        console.error('Failed to send request. Server responded with status:', response.status);
      }
    } catch (error) {
      console.error('Failed to send request:', error);
    }
  };

  const goToSearch = () => {
    navigate('/search')
  }

  return (
    <div className='container'>
      <div className='header'>
        <div className='text'>Sign Up</div>
        <div className='underline'></div>
      </div>

      <div className='progress-bar-container'>
        <MultiStepProgressBar step={index} />
      </div>

      {submitted ? (
        <div>
          <div className='container-style'>
            Profile saved successfully.
          </div>
          <div className=''>
            <div className='multistep-submit-button' onClick={goToSearch}>
              Continue to Search Page
            </div>
          </div>

        </div>
      ) : (
        <div className=''>
          <div className='multistep-form-body'>
            <MultiStepForm
              list={questions}
              step={index}
              onPageUpdate={onPageAnswerUpdate}
              pagesAnswers={pagesAnswers}
            />
            {index === totalPagesCount && (
              <>
                <DragDropFiles onFileSelect={handlePDFChange} />
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={(event) => handlePDFChange(event.target.files[0])}
                  style={{ display: 'none' }}
                  ref={inputRef}
                />
              </>
            )}
          </div>
          <div className='card-footer d-flex justify-content-between'>
            <div
              onClick={prevButton}
              className={`submit ${index === 1 ? 'disabled' : ''}`}
            >
              Previous
            </div>
            <div onClick={nextButton} className='submit'>
              {index === totalPagesCount ? 'Submit' : 'Next'}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default FormPage
