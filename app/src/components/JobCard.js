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
        <Link className='job-link' to={job.link} target='_blank'>
            <div className='card'>
                <div className='title'>{job.title} @ {job.company}</div>
                <div className='location'>{job.location}</div>
                <div className='details'>{details}</div>
                <div className='snippet'>{job.snippet}</div>
            </div>
        </Link>
    )
}