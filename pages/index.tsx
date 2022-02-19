import { useQuery } from 'react-query';

import Card from '../components/card';

import type { NextPage } from 'next';
import { IGetCardsResponse } from './api/cards';

const Home: NextPage = () => {
  const getCardsData = async () => {
    const res = await fetch(`/api/cards`);
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

  const cardsQuery = useQuery<IGetCardsResponse, Error>(['cards'], getCardsData, {
    refetchOnWindowFocus: false
  });
  const collectedQuery = useQuery('collected', getCollectedData, {
    refetchOnWindowFocus: false
  });

  if (collectedQuery.isError || cardsQuery.isError) return <>Something went wrong...</>;
  if (collectedQuery.isLoading || cardsQuery.isLoading || !cardsQuery.data) return <>Loading cards...</>;

  return (
    <div className="grid lg:grid-cols-2 2xl:grid-cols-3 gap-4 m-2 md:m-10">
      {cardsQuery.data?.cards?.map((c) => {
        return <Card key={c.id} card={c} />;
      })}
    </div>
  );
};

export default Home;
