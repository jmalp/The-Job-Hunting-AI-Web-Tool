import JobCard from "../components/JobCard";
import './JobList.css';

export default function JobList({ jobs }) {
    return (
        <div className="job-list-container">
            <div className="job-list">
                {jobs.map((job, i) => <JobCard job={job} key={i} />)}
            </div>
        </div>
    );
}