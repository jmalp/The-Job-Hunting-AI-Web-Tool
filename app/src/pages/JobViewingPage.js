import JobList from "../components/JobList";
import example_jobs from "./example_jobs.json";
import { useState, useEffect } from 'react';

export default function JobViewingPage() {
    const url = "localhost:5000"
    const [jobs, setJobs] = useState([]);

    const loadJobs = async () => {
        //Search Jobs
        fetch(url + '/search', {
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

    useEffect(() => {
        loadJobs();
    }, []);

    return (
        <div>
            <h1>Job Viewing Page</h1>
            <JobList jobs={jobs} />
        </div>
    )
}