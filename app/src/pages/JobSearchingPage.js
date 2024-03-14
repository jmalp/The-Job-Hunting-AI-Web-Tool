import '../App.css'
import url from '../api_url.json'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import search_icon from '../assets/search.png'
import location_icon from '../assets/location.png'
import salary_icon from '../assets/salary.png'
import radius_icon from '../assets/radius.png'
import JobList from '../components/JobList'

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
  if (!token) {
    console.log(token)
    // TODO: navigate to login on missing toekn
    // navigate('/login', { replace: true });
  } else {
    console.log(token)
  }
}, [])

const handleFormChange = (event) => {
  const { name, value } = event.target;
  setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
  }));
}

  const loadJobs = async () => {
    console.log("Searching for jobs...");
    console.log(formData);
    console.log(token)
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
            const jobs = data;
            setJobs(jobs);
        })
        .catch((error) => {
            console.error("Error Searching Jobs: ", error);
        });
}

  const handleSearch = () => {
    loadJobs()
}

  return (
    <div className='job-search'>
    <div className='main-container'>
      <div className='title-header'>
        <div className='title-text'>Search for Jobs</div>
        <div className='title-underline'></div>
      </div>
      <div className='search-inputs'>
        <div className='search-input'>
          <div className='input'>
          <img src={search_icon} alt="search_icon" className="icon"/>
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
        <div className='search-input'>
          <div className='input'>
          <img src={location_icon} alt="location_icon" className="icon"/>
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

        <div className=''>
          <div className='search-input'>
            <div className='input'>
            <img src={salary_icon} alt="salary_icon" className="icon"/>
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
        </div>
        <div className=''>
          <div className='search-input'>
            <div className='input'>
            <img src={radius_icon} alt="radius_icon" className="icon"/>
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
      </div>
      <div className='search-submit-container'>
        <button onClick={handleSearch} className='search-submit-btn'>
          Search
        </button>
      </div>
    </div>
    <div className='search-results'><JobList jobs={jobs} /></div>
    </div>
  );
}
