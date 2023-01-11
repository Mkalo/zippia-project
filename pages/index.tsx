import JobDetails from '@/components/jobs/JobDetails';
import List from '@/components/jobs/List';
import axios from 'axios';
import Head from 'next/head';
import { useState } from 'react';

async function getListOfJobs() {
  const res = await axios.post<API.ListJobsResponse>('https://www.zippia.com/api/jobs/', {
    'companySkills': true,
    'dismissedListingHashes': [],
    'fetchJobDesc': true,
    'jobTitle': 'Developer',
    'locations': [],
    'numJobs': 20,
    'previousListingHashes': []
  });
  return res.data;
}

export async function getServerSideProps() {
  return {
    props: {
      ssrResponse: await getListOfJobs()
    },
  };
}

export default function Home({ ssrResponse }: { ssrResponse: API.ListJobsResponse }) {
  const [selectedJob, setSelectedJob] = useState<API.Job>();

  return (
    <>
      <Head>
        <title>Zippia Project</title>
        <meta name="description" content="Zippia project" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="bg-white h-screen flex items-center flex-col">
        <div className="w-3/4 max-w-5xl h-full flex flex-col items-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-8 whitespace-nowrap">Zippia Project</h1>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className={selectedJob ? 'col-span-1 order-last lg:order-first' : 'col-span-2'}>
              <List jobs={ssrResponse.jobs} onSelectJob={(job: API.Job) => setSelectedJob(job)}></List>
            </div>
            {selectedJob && <div className="lg:sticky lg:top-6 h-fit"><JobDetails job={selectedJob} onCloseDetail={() => setSelectedJob(undefined)}></JobDetails></div>}
          </div>
        </div>
      </main>
    </>
  );
}
