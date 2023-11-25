import { useParams } from "react-router-dom"

const JobDetails = () => {
  const {jobId} = useParams();
  return <div>job details for job id: {jobId}</div>;
}

export default JobDetails