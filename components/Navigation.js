import styles from '../styles/Navigation.module.css';
import Link from 'next/link';

const Navigation = () => {
  return (
    <div className={styles.navigation}>
      <Link href="/" passHref>
        <div>Home</div>
      </Link>
      <Link href="/players" passHref>
        <div>Players</div>
      </Link>
      <Link href="/shopall" passHref>
        <div>Shop All</div>
      </Link>
      <Link href="/posts" passHref>
        <div>Bullpen Banter</div>
      </Link>
    </div>
  );
};

export default Navigation;
