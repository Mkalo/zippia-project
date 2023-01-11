export default function Card({ job, onSelectJob }: { job: API.Job; onSelectJob: (job: API.Job) => void }) {
  return (
    <li onClick={() => onSelectJob(job)} className="group w-full bg-white hover:bg-[#f7f8f9] rounded-[4px] border border-gray-light shadow-md cursor-pointer mb-4 p-5 xl:grid xl:grid-cols-4 gap-8">
      <div className="flex flex-col">
        <h2 className="text-xl font-bold line-clamp-2 group-hover:text-blue">{job.jobTitle}</h2>
        <label className="truncate">
          {job.companyName}
        </label>
        <label>
          {job.location}
        </label>
      </div>
      <div className="col-span-2">
        <article className="line-clamp-3 text-sm">
          {job.jobDescription.replace(/<[^>]+>/g, ' ')}
        </article>
      </div>
      <div className="flex flex-row xl:flex-col">
        <div className="flex flex-col">
          <span className="text-sm truncate">{job.estimatedSalary}</span>
          <span className="text-sm truncate">{job.postedDate}</span>
        </div>
        <button className="bg-blue hover:bg-[#205fd0] rounded-[4px] text-white text-sm font-semibold mt-auto min-w-[84px] max-w-[84px] mb-auto ml-auto py-2 px-3 shrink-0">View</button>
      </div>
    </li>
  );
}
