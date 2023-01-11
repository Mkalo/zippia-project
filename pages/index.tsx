import List from '@/components/jobs/List';
import Head from 'next/head';

async function getListOfJobs() {
  
}

export async function getServerSideProps() {
  return {
    props: {},
  };
}

export default function Home() {
  return (
    <>
      <Head>
        <title>Zippia Project</title>
        <meta name="description" content="Zippia job" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="bg-white h-screen flex items-center flex-col">
        {/* Main column */}
        <div className="w-3/4 h-full flex flex-col items-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Zippia Project</h1>
          <List></List>
        </div>
      </main>
    </>
  );
}
