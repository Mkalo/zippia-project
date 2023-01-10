import Head from 'next/head'
import { Inter } from '@next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function App() {
  return (
    <>
      <Head>
        <title>Zippia Project</title>
        <meta name="description" content="Zippia job" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="bg-sky-500 h-screen">
      </main>
    </>
  )
}
