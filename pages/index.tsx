import { useQuery } from 'react-query';
import Head from 'next/head';

import type { NextPage } from 'next';
import Card from '../components/Card';

interface ICards {
  cards: ICard[];
}

interface ICard {
  id: string;
  image: string;
  name: string;
  deck: "Scoia'tael" | 'Monsters';
  strength?: number;
  row?: 'close' | 'agile' | 'ranged' | 'siege' | 'leader';
  locations?: any;
  notes?: any;
  abilities?: any[];
  isDLC?: any;
  expansion?: any;
  effect?: any;
}

const Home: NextPage = () => {
  const getCardsData = async () => {
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

    if (
      !scoiatael?.cards ||
      scoiatael?.cards?.length < 1 ||
      !monsters?.cards ||
      monsters?.cards?.length < 1 ||
      !neutral?.cards ||
      neutral?.cards?.length < 1 ||
      !nilfgaard?.cards ||
      nilfgaard?.cards?.length < 1 ||
      !northernRealms?.cards ||
      northernRealms?.cards?.length < 1
    ) {
      throw new Error('Cards request failed or no results');
    }

    return {
      cards: [
        ...scoiatael?.cards,
        ...monsters?.cards,
        ...neutral?.cards,
        ...nilfgaard?.cards,
        ...northernRealms?.cards
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
  const getCollectedData = () => {
    try {
      return JSON.parse(localStorage.collected);
    } catch {
      return { collected: [] };
    }
  };

  const cardsQuery = useQuery<ICards, Error>(['cards'], getCardsData, {
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

      <div className="">
        <div className="grid lg:grid-cols-2 2xl:grid-cols-3 gap-4">
          {cardsQuery.data?.cards?.map((c) => {
            return <Card key={c.id} card={c} />;
          })}
        </div>
      </div>
    </>
  );
};

export default Home;
