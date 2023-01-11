import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

export default function JobDetails({ job, onCloseDetail }: { job: API.Job; onCloseDetail: () => void }) {
  // Display job with complete description as body and make it sticky
  return (
    <div className="bg-white min-w-[300px] h-fit relative rounded-[4px] border border-gray-light shadow-md">
      <header className="flex items-center border-b border-gray-light p-5 shadow-[0_4px_12px_rgba(0,0,0,.06)]">
        <button onClick={() => onCloseDetail()} className="absolute top-2 right-5"><FontAwesomeIcon icon={faTimes} /></button>
        <div className="flex flex-col min-w-[150px]">
          <h2 className="text-xl font-bold truncate">{job.jobTitle}</h2>
          <label className="truncate">
            {job.companyName}
          </label>
          <label>
            {job.location}
          </label>
          <label>
            {job.estimatedSalary}
          </label>
        </div>
        <div className="flex flex-row items-center justify-center ml-auto">
          <button className="bg-blue hover:bg-[#205fd0] rounded-[4px] text-white text-sm font-semibold min-w-[84px] max-w-[84px] py-2 px-3 shrink-0">View</button>
        </div>
      </header>
      <article className="p-5 max-h-[calc(100vh_-_260px)] overflow-y-auto">
        <h3 className="font-bold text-xl mb-4">Job Description</h3>
        <div dangerouslySetInnerHTML={{ __html: job.jobDescription }} />
      </article>
    </div>
  );
}