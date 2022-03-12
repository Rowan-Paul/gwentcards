import { useMutation, useQuery, useQueryClient } from 'react-query';
import Head from 'next/head';
import { useState } from 'react';

import Card, { ICard, ILocation } from '../components/Card';
import ExpandedImage from '../components/ExpandedImage';
import LocationsModal from '../components/LocationsModal';
import Filters from '../components/Filters';

interface ICards {
  cards: ICard[];
}

const Home = (): JSX.Element => {
  const [imageCard, setImageCard] = useState('');
  const [showImage, setShowImage] = useState(false);
  const [showLocations, setShowLocations] = useState(false);
  const [cardLocations, setCardLocations] = useState<ILocation[] | undefined>();
  const [filter, setFilter] = useState<string>();
  const queryClient = useQueryClient();

  const getCollectedData = () => {
    try {
      return JSON.parse(localStorage.collected);
    } catch {
      return { collected: [] };
    }
  };

  const getCards = async () => {
    const data: any = await fetchCards();

    if (filter) {
      return { cards: data.cards.filter((card: ICard) => card.deck === filter && card) };
    }

    return data;
  };

  const cardsQuery = useQuery<ICards, Error>(['cards', filter], getCards, {
    refetchOnWindowFocus: false
  });
  const collectedQuery = useQuery('collected', getCollectedData, {
    refetchOnWindowFocus: false
  });

  if (collectedQuery.isError || cardsQuery.isError)
    return (
      <div className="p-2 md:p-10">
        <h1 className="text-2xl font-bold text-center">GWENTcards</h1>
        <div className="text-center">Something went wrong...</div>
      </div>
    );
  if (collectedQuery.isLoading || cardsQuery.isLoading || !cardsQuery.data)
    return (
      <div className="p-2 md:p-10">
        <h1 className="text-2xl font-bold text-center">GWENTcards</h1>
        <div className="text-center">Loading...</div>
      </div>
    );

  return (
    <>
      <ExpandedImage image={imageCard} showImage={showImage} setShowImage={() => setShowImage(!showImage)} />
      <LocationsModal
        locations={cardLocations}
        showLocations={showLocations}
        setShowLocations={() => setShowLocations(!showLocations)}
      />
      <div className="p-2 md:p-10">
        <h1 className="text-2xl font-bold text-center">GWENTcards</h1>

        <div className="flex gap-4">
          <div
            onClick={() => setFilter('')}
            className="block w-full text-center text-white p-2 bg-purple-500 drop-shadow-lg my-2 cursor-pointer divide-purple-400 divide-x divide-solid"
          >
            ALl
          </div>
          <div
            onClick={() => setFilter('Monsters')}
            className="block w-full text-center text-white p-2 bg-purple-500 drop-shadow-lg my-2 cursor-pointer divide-purple-400 divide-x divide-solid"
          >
            Monsters
          </div>
          <div
            onClick={() => setFilter('Neutral')}
            className="block w-full text-center text-white p-2 bg-purple-500 drop-shadow-lg my-2 cursor-pointer divide-purple-400 divide-x divide-solid"
          >
            Neutral
          </div>
          <div
            onClick={() => setFilter('Nilfgaard')}
            className="block w-full text-center text-white p-2 bg-purple-500 drop-shadow-lg my-2 cursor-pointer divide-purple-400 divide-x divide-solid"
          >
            Nilfgaard
          </div>
          <div
            onClick={() => setFilter('Northern Realms')}
            className="block w-full text-center text-white p-2 bg-purple-500 drop-shadow-lg my-2 cursor-pointer divide-purple-400 divide-x divide-solid"
          >
            Northern Realms
          </div>
          <div
            onClick={() => setFilter("Scoia'tael")}
            className="block w-full text-center text-white p-2 bg-purple-500 drop-shadow-lg my-2 cursor-pointer divide-purple-400 divide-x divide-solid"
          >
            Scoia&apos;tael
          </div>
          <div
            onClick={() => setFilter('Skellige')}
            className="block w-full text-center text-white p-2 bg-purple-500 drop-shadow-lg my-2 cursor-pointer divide-purple-400 divide-x divide-solid"
          >
            Skellige
          </div>
        </div>

        <div>Total cards: {cardsQuery.data?.cards?.length}</div>
        <div className=" mt-2 grid lg:grid-cols-2 2xl:grid-cols-3 gap-4">
          {cardsQuery.data?.cards?.map((c: ICard) => {
            return (
              <Card
                key={c.id}
                card={c}
                setImage={(img: string) => {
                  setImageCard(img);
                  setShowImage(true);
                }}
                setLocations={(locations: ILocation[]) => {
                  setCardLocations(locations);
                  setShowLocations(true);
                }}
              />
            );
          })}
        </div>
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
