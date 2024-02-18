import JobCard from "../components/JobCard"

export default function JobList({jobs}) {
    return (
        <div id="list">
            <ul>
                {jobs.map((job, i) => <JobCard job={job} key={i} />)}
            </ul>
        </div>
    )
}