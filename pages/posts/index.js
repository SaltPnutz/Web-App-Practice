import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../components/layout';

export default function FirstPost() {
  return (
    <Layout>
    <Head>
        <title>Welcome to Bullpen Banter</title>
    </Head>
    <h1>Bullpen Banter</h1>
    <h2>
        <Link href="/">Back to home</Link>
    </h2>
      </Layout>
  );
}