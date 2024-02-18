import JobList from "../components/JobList";
import example_jobs from "./example_jobs.json";
import { useState, useEffect } from 'react';

export default function JobViewingPage() {
    const [jobs, setJobs] = useState([]);

    const loadJobs = async () => {
        //Search Jobs
        fetch('http://localhost:5000/search', {
            method: 'GET'
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

    return (
        <div>
            <h1>Job Viewing Page</h1>
            <button onClick={loadJobs}>Search</button>
            <JobList jobs={jobs} />
        </div>
    )
}