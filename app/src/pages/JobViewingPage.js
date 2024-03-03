import JobList from "../components/JobList";
import url from "../api_url.json"
import { useState, useEffect } from 'react';

export default function JobViewingPage() {
    const [jobs, setJobs] = useState([]);
    const [tempForm, setFormData] = useState({
        keywords: "Software Engineer",
        location: "Santa Clara",
        salary: "60000",
        radius: "100"
    });

    const loadJobs = async () => {
        //Search Jobs
        fetch(url['api_url'] + '/search', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(tempForm)
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