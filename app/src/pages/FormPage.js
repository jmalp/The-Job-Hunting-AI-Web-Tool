import '../App.css'
import '../components/MultiStepProgress.css'
import { useNavigate } from 'react-router-dom'
import { MultiStepProgressBar } from '../components/MultiStepProgress'
import { useState } from 'react'
import { MultiStepForm } from '../components/MultiStepForm'
import { questions } from '../Questions'
import { SearchPage } from './JobSearchingPage'
import url from "../api_url.json";

function FormPage() {
  const [index, setIndex] = useState(1)
  const [submitted, setSubmitted] = useState(false)
  const totalPagesCount = questions?.length || 0
  const [pagesAnswers, setPagesAnswers] = useState({})

  const prevButton = () => {
    if (index > 1) {
      setIndex(prevIndex => prevIndex - 1)
    }
  }

  const nextButton = () => {
    if (index === totalPagesCount) {
      const formData = new FormData();
  
      Object.keys(pagesAnswers).forEach(page => {
        Object.entries(pagesAnswers[page]).forEach(([key, value]) => {
          if (key !== 'index') { // Skip 'index'
            formData.append(key, value);
          }
        });
      });
  
      for (var pair of formData.entries()) {
        console.log(pair[0]+ ': ' + pair[1]); 
    }
      setPagesAnswers({});
      setSubmitted(true);
    } else {
      setIndex(prevIndex => prevIndex + 1);
    }
  };

  const onPageAnswerUpdate = (step, answersObj) => {
    setPagesAnswers({ ...pagesAnswers, [step]: answersObj })
  }

  const handleReset = () => {
    setIndex(1)
    setSubmitted(false)
  }

  const navigate = useNavigate()

  const goToSearch = () => {
    navigate('/search')
  }

  return (
    <div className='main-container'>
      <div className='title-header'>
        <div className='title-text'>Create your Profile</div>
        <div className='title-underline'></div>
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
          Tell us more about yourself to receive more accurate results
          <div className='multistep-form-body'>
            <MultiStepForm
              list={questions}
              step={index}
              onPageUpdate={onPageAnswerUpdate}
              pagesAnswers={pagesAnswers}
            />
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
