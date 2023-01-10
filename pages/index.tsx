import List from '@/components/jobs/List'
import getBaseURL from '@/utils/baseUrl';
import Head from 'next/head'

export async function getServerSideProps() {
  const res = await fetch(`${getBaseURL()}/api/hello`);
  const data = await res.json() as { name: string };
  return { props: { data } };
}

export default function Home({ data }: { data: { name: string } }) {
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
        {data.name}
        <div className="w-3/4 h-full flex flex-col items-center">
          <h1 className="text-3xl font-bold text-gray-800">Zippia Project</h1>
          <List></List>
        </div>
      </main>
    </>
  )
}
