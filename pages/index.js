import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Home.module.css';

const IndexPage = () => {
  return (
    <div>
      <Head>
        <title>Home Page</title>
      </Head>
      <div className={styles.container}>
        <h1 className={styles.title}>Welcome to the Home Page</h1>
        <Link href="/players">
          <div className={styles.link}>View Players</div>
        </Link>
      </div>
    </div>
  );
};

export default IndexPage;