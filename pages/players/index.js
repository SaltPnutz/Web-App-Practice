import { useEffect, useState } from 'react';
import { createClient } from 'contentful';
import styles from '../../styles/players.module.css';
import Navigation from '../../components/Navigation';
import Head from 'next/head';
import Link from 'next/link';
import { slugify } from './[playerName]';

const client = createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
});

const Players = () => {
  const [playerList, setPlayerList] = useState([]);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await client.getEntries({
          content_type: 'playerList',
          select: 'fields.playerListName,fields.playerPhoto',
        });
        const players = response.items.map((item) => ({
          id: item.sys.id,
          name: item.fields.playerListName,
          photo: item.fields.playerPhoto,
        }));
        const sortedPlayers = sortPlayers(players);
        setPlayerList(sortedPlayers);
      } catch (error) {
        console.log('Error fetching players:', error);
      }
    };

    fetchPlayers();
  }, []);

  const sortPlayers = (players) => {
    // Sort players by name (last text)
    const sortedPlayers = [...players].sort((a, b) => {
      const aLastText = a.name.split(' ').pop();
      const bLastText = b.name.split(' ').pop();
      return aLastText.localeCompare(bLastText);
    });

    // Rearrange players into top to bottom, then left to right order
    const numColumns = 3; // Number of columns
    const sortedPlayersWithOrder = [];
    const numRows = Math.ceil(sortedPlayers.length / numColumns);

    for (let row = 0; row < numRows; row++) {
      for (let col = 0; col < numColumns; col++) {
        const index = col * numRows + row;
        if (index < sortedPlayers.length) {
          sortedPlayersWithOrder.push(sortedPlayers[index]);
        }
      }
    }

    return sortedPlayersWithOrder;
  };

  return (
    <div>
      <Head>
        <title>Players</title>
      </Head>
      <Navigation />
      <div className={styles.container}>
        <h1>Players</h1>
        <ul className={`${styles.table} ${styles['bulletless-list']}`}>
          {playerList.map((player) => (
            <li key={player.id} className={styles.gridItem}>
              {player.photo && (
                <img src={player.photo.fields.file.url} alt={player.name} className={styles.photo} />
              )}
              <Link href={`/players/${slugify(player.name)}`}>
                <div className={styles.link}>{player.name}</div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Players;
