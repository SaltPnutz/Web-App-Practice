import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../components/layout';

export default function FirstPost() {
  return (
    <Layout>
    <Head>
        <title>Shop All Yankee Baseball Cards</title>
    </Head>
    <h1>Shop All</h1>
    <h2>
        <Link href="/">Back to home</Link>
    </h2>
      </Layout>
  );
}