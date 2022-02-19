import { useQuery } from 'react-query';

import Card from '../components/card';

import type { NextPage } from 'next';
import { IGetCardsResponse } from './api/cards';

const Home: NextPage = () => {
  const getData = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cards`);
    const json = await res.json();

    if (!json?.cards || json?.cards?.length < 1) {
      throw new Error('Request failed or no results');
    }

    return json;
  };

  const { isLoading, isError, data } = useQuery<IGetCardsResponse, Error>(['cards'], getData, {
    refetchOnWindowFocus: false
  });

  if (isError) return <>Something went wrong...</>;
  if (isLoading || !data) return <>Loading cards...</>;

  return (
    <div className="grid lg:grid-cols-2 2xl:grid-cols-3 gap-4 m-2 md:m-10">
      {data?.cards?.map((c) => {
        return <Card key={c.id} image={c.image} name={c.name} deck={c.deck} strength={c.strength} row={c.row} />;
      })}
    </div>
  );
};

export default Home;
