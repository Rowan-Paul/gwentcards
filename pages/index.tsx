import { useQuery } from 'react-query';
import Head from 'next/head';
import { useState } from 'react';

import Card, { ICard } from '../components/Card';
import ExpandedImage from '../components/ExpandedImage';

interface ICards {
  cards: ICard[];
}

const Home = (): JSX.Element => {
  const [imageCard, setImageCard] = useState('');
  const [showImage, setShowImage] = useState(false);

  const getCollectedData = () => {
    try {
      return JSON.parse(localStorage.collected);
    } catch {
      return { collected: [] };
    }
  };

  const cardsQuery = useQuery<ICards, Error>(['cards'], fetchCards, {
    refetchOnWindowFocus: false
  });
  const collectedQuery = useQuery('collected', getCollectedData, {
    refetchOnWindowFocus: false
  });

  if (collectedQuery.isError || cardsQuery.isError) return <>Something went wrong...</>;
  if (collectedQuery.isLoading || cardsQuery.isLoading || !cardsQuery.data) return <>Loading cards...</>;

  return (
    <>
      <Head>
        <title>GWENTcards</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ExpandedImage image={imageCard} showImage={showImage} setShowImage={() => setShowImage(!showImage)} />
      <div className="p-2 md:p-10 grid lg:grid-cols-2 2xl:grid-cols-3 gap-4">
        {cardsQuery.data?.cards?.map((c) => {
          return (
            <Card
              key={c.id}
              card={c}
              setImage={(img: string) => {
                setImageCard(img);
                setShowImage(true);
              }}
            />
          );
        })}
      </div>
    </>
  );
};

const fetchCards = async (): Promise<ICards> => {
  const scoiatael = await fetch('/scoiatael.json', {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    }
  }).then((data) => data.json());
  const monsters = await fetch('/monsters.json', {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    }
  }).then((data) => data.json());
  const neutral = await fetch('/neutral.json', {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    }
  }).then((data) => data.json());
  const nilfgaard = await fetch('/nilfgaard.json', {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    }
  }).then((data) => data.json());
  const northernRealms = await fetch('/northern-realms.json', {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    }
  }).then((data) => data.json());
  const skellige = await fetch('/skellige.json', {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    }
  }).then((data) => data.json());

  if (
    !monsters?.cards ||
    monsters?.cards?.length < 1 ||
    !neutral?.cards ||
    neutral?.cards?.length < 1 ||
    !nilfgaard?.cards ||
    nilfgaard?.cards?.length < 1 ||
    !northernRealms?.cards ||
    northernRealms?.cards?.length < 1 ||
    !scoiatael?.cards ||
    scoiatael?.cards?.length < 1 ||
    !skellige?.cards ||
    skellige?.cards?.length < 1
  ) {
    throw new Error('Cards request failed or no results');
  }

  return {
    cards: [
      ...scoiatael?.cards,
      ...monsters?.cards,
      ...neutral?.cards,
      ...nilfgaard?.cards,
      ...northernRealms?.cards,
      ...skellige?.cards
    ].sort(function (a, b) {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    })
  };
};

export default Home;
