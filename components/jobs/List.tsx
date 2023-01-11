import Card from './Card';

export default function List({ jobs, onSelectJob }: { jobs: API.Job[]; onSelectJob: (job: API.Job) => void }) {
  return (
    <ul className="flex flex-col items-center w-full h-full min-w-[300px]">
      {jobs.map((job) => <Card key={job.jobId} job={job} onSelectJob={(job: API.Job) => onSelectJob(job)}></Card>)}
    </ul>
  );
}
