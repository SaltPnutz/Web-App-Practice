import { createClient } from 'contentful';

const client = createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
});

export async function getStaticPaths() {
  const response = await client.getEntries({ content_type: 'playerList' });
  const paths = response.items.map((item) => ({
    params: { playerName: slugify(item.fields.playerListName) },
  }));

  console.log("Generated paths:", paths);

  return { paths, fallback: false };
}

export function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-') // replace spaces with -
    .replace(/[^\w-]+/g, ''); // remove all non-word characters
}

function deslugify(text) {
  return text
    .toString()
    .replace(/-/g, ' ') // replace - with spaces
    .replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase()))); // title case
}

export async function getStaticProps({ params }) {
  console.log('Getting static props for: ', params.playerName); // log the player name

  const response = await client.getEntries({ content_type: 'playerList' });
  console.log('Response from Contentful:', response.items);

  const { items } = await client.getEntries({
    content_type: 'playerList',
    'fields.playerListName': deslugify(params.playerName),
  });

  if (!items || items.length === 0) {
    console.error('No player found for name:', params.playerName);
    return { notFound: true };
  }

  if (!items[0].fields) {
    console.error('No fields found for player:', params.playerName);
    return { notFound: true };
  }

  return { props: { player: items[0].fields } };
}

const PlayerPage = ({ player }) => {
  return (
    <div>
      <h1>{player.playerListName}</h1>
      {/* render the rest of the player data here */}
    </div>
  );
};

export default PlayerPage;
