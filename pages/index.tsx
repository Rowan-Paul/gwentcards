import { useQuery } from 'react-query';

import Card from '../components/Card';

import type { NextPage } from 'next';
import Head from 'next/head';

interface ICards {
  cards: ICard[];
}

interface ICard {
  id: string;
  image: string;
  name: string;
  deck: "Scoia'tael";
  strength?: number;
  row: 'close' | 'agile' | 'ranged' | 'siege' | 'leader';
  locations?: any;
  notes?: any;
  abilities?: any[];
  isDLC?: any;
  expansion?: any;
  effect?: any;
}

const Home: NextPage = () => {
  const getCardsData = async () => {
    const res = await fetch('scoiatael.json'
      , {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }
    );
    const json = await res.json();

    if (!json?.cards || json?.cards?.length < 1) {
      throw new Error('Cards request failed or no results');
    }

    return json;
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
      </Head>

      <div className="grid lg:grid-cols-2 2xl:grid-cols-3 gap-4 m-2 md:m-10">
        {cardsQuery.data?.cards?.map((c) => {
          return <Card key={c.id} card={c} />;
        })}
      </div>
    </>
  );
};

export default Home;
