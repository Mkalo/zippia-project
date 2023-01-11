import { getListOfJobs } from '@/lib/client';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Loading } from '../common/Loading';
import { Filters } from './Filters';
import JobDetails from './JobDetails';
import List from './List';

// Prevent list from being re-rendered if jobs are the same by only checking if they are the same reference
const ListMemo = React.memo(List, (prevProps, nextProps) => {
  return prevProps.jobs === nextProps.jobs;
});

export function Jobs({ initialJobs, initialJobTitle }: { initialJobs: API.Job[]; initialJobTitle: string }) {
  const [jobs, setJobs] = useState<API.Job[]>(initialJobs);
  const [selectedJob, setSelectedJob] = useState<API.Job>();
  const [jobTitle, setJobTitle] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [fetching, setFetching] = useState(false);
  const [lastSevenDays, setLastSevenDays] = useState(false);
  const [companyToShow, setCompanyToShow] = useState('');

  // Optimize list of filtered jobs to only re-evaluate if jobs or searchTerm changes
  const filteredJobs = useMemo(() => {
    return jobs
      .filter(job => 
        (
          job.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) || 
            job.jobDescription.toLowerCase().includes(searchTerm.toLowerCase())
        ) && (
          !companyToShow || job.companyName === companyToShow
        ) && (
          !lastSevenDays || new Date(job.postingDate) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
        )
      );
  }, [jobs, searchTerm, companyToShow, lastSevenDays]);

  // Optimize list of companies to only re-evaluate if jobs changes
  const allCompanies = useMemo(() => {
    return [...new Set(jobs.map(job => job.companyName))];
  }, [jobs]);

  useEffect(() => {
    if (!jobTitle) return;
    setFetching(true);
    getListOfJobs(jobTitle).then((response) => setJobs(response.jobs)).finally(() => setFetching(false));
  }, [jobTitle]);

  return (
    <main className="bg-white h-screen flex items-center flex-col">
      <div className="w-3/4 max-w-5xl h-full flex flex-col items-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 whitespace-nowrap">Zippia Jobs</h1>
        <Filters
          lastSevenDays={lastSevenDays}
          allCompanies={allCompanies}
          onChangeJobTitle={value => setJobTitle(value)}
          onChangeSearchTerm={value => setSearchTerm(value)}
          onToggleLastSevenDays={() => setLastSevenDays(previousValue => !previousValue)}
          onChangeCompany={value => setCompanyToShow(value)}
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-5">
          <div className={`relative ${selectedJob ? 'col-span-1 order-last lg:order-first' : 'col-span-2'} ${fetching ? 'h-[70vh]' : ''}`}>
            {!fetching ? <ListMemo jobs={filteredJobs} onSelectJob={(job: API.Job) => setSelectedJob(job)}></ListMemo> : <Loading />}
          </div>
          {selectedJob && <div className="lg:sticky lg:top-6 h-fit"><JobDetails job={selectedJob} onCloseDetail={() => setSelectedJob(undefined)}></JobDetails></div>}
        </div>
      </div>
    </main>
  );
}