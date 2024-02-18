import "./JobCard.css"

export default function JobCard({job}) {
    
    return (
        <li id="card">
            <h5>{job.title} at {job.company}</h5>
            <body>{job.location}</body>
            <body>{job.type} | {job.salary}</body>
        </li>
    )
}