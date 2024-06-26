import './JobSearching.css';
import url from '../api_url.json';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import JobList from '../components/JobList';
import WaitingSearch from '../components/WaitingSearch';
import SearchError from '../components/SearchError';

const SearchIcon = () => <span className="material-symbols-outlined">search</span>;
const LocationIcon = () => <span className="material-symbols-outlined">near_me</span>;
const SalaryIcon = () => <span className="material-symbols-outlined">attach_money</span>;
const RadiusIcon = () => <span className="material-symbols-outlined">distance</span>;

export default function SearchPage() {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [token, setToken] = useState();
  const [formData, setFormData] = useState({
    keywords: "",
    location: "",
    salary: "",
    radius: ""
  });

  useEffect(() => {
    setToken(localStorage.getItem('token'));
  }, []);

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const loadJobs = async () => {
    setJobs("waiting");
    console.log("Searching for jobs...");
    console.log(formData);
    console.log(token);
    if (!token) {
      console.log(token);
      navigate('/login', { replace: true });
    }
    //Search Jobs
    fetch(url['api_url'] + '/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(formData)
    })
      .then((response) => response.json())
      .then((data) => {
        const jobs_result = data;
        setJobs(jobs_result);
      })
      .catch((error) => {
        setJobs("error");
        console.error("Error Searching Jobs: ", error);
      });
  };

  const handleSearch = () => {
    loadJobs();
  };

  return (
    <>
      <div className='search-page-container'>
        <div className='search-page-form'>
          <div className='search-page-header'>
            <div className='search-page-title'>Search for Jobs</div>
            <div className='search-page-underline'></div>
          </div>
          <div className='search-page-inputs'>
            <div className='search-page-input'>
              <div className='input'>
                <SearchIcon />
                <input
                  className='input-field'
                  type='text'
                  name='keywords'
                  placeholder='Title, keywords or company...'
                  value={formData.keywords}
                  onChange={handleFormChange}
                />
              </div>
            </div>
            <div className='search-page-input'>
              <div className='input'>
                <LocationIcon />
                <input
                  className='input-field'
                  type='text'
                  name='location'
                  placeholder='Search location...'
                  value={formData.location}
                  onChange={handleFormChange}
                />
              </div>
            </div>
            <div className='search-page-input'>
              <div className='input'>
                <SalaryIcon />
                <input
                  className='input-field'
                  type='text'
                  name='salary'
                  placeholder='Desired salary...'
                  value={formData.salary}
                  onChange={handleFormChange}
                />
              </div>
            </div>
            <div className='search-page-input'>
              <div className='input'>
                <RadiusIcon />
                <input
                  className='input-field'
                  type='text'
                  name='radius'
                  placeholder='Search radius in miles...'
                  value={formData.radius}
                  onChange={handleFormChange}
                />
              </div>
            </div>
          </div>
          <div className='search-page-submit-container'>
            <button onClick={handleSearch} className='search-page-submit-btn'>
              Search
            </button>
          </div>
        </div>
        <div className='search-page-results'>
          {
            (jobs === "waiting")
              ? <WaitingSearch />
              : (jobs === "error")
                ? <SearchError />
                : <JobList jobs={jobs} />
          }
        </div>
      </div>
    </>
  );
};