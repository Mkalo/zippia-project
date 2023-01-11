import { Jobs } from '@/components/jobs/Jobs';
import { getListOfJobs } from '@/lib/client';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';

export const DEFAULT_JOB_TITLE = 'Business Analyst';

export async function getServerSideProps({ res }: GetServerSidePropsContext) {
  res.setHeader('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=59');

  return {
    props: {
      ssrResponse: await getListOfJobs(DEFAULT_JOB_TITLE)
    },
  };
}

export default function Home({ ssrResponse }: { ssrResponse: API.ListJobsResponse }) {
  return (
    <>
      <Head>
        <title>Zippia Project</title>
        <meta name="description" content="Zippia project" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Jobs initialJobs={ssrResponse.jobs} />
    </>
  );
}
