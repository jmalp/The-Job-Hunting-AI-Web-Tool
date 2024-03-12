import "./JobCard.css"
import { Link } from 'react-router-dom';

export default function JobCard({job}) {

    var details;
    if (job.type == "") {
        details = job.salary;
    } else {
        details = job.type + " | " + job.salary;
    }

    return (
        <Link to={job.link}>
            <div id="card">
                <div id="title">{job.title} @ {job.company}</div>
                <div id="location">{job.location}</div>
                <div id="details">{details}</div>
                <div id="snippet">{job.snippet}</div>
            </div>
        </Link>
    )
}