import { useRouter } from 'next/router';

const SlugPage = () => {
  const router = useRouter();
  const { slug } = router.query;

  return (
    <div>
      <h1>Slug: {slug}</h1>
    </div>
  );
};

export default SlugPage;
