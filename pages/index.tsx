import { useQuery, useQueryClient } from 'react-query';
import { useState } from 'react';

import Card, { ICard, ILocation } from '../components/Card';
import ExpandedImage from '../components/ExpandedImage';
import LocationsModal from '../components/LocationsModal';
import Button from '../components/Button';
import DeckFilter from '../components/DeckFilter';

interface ICards {
  cards: ICard[];
}

const Home = (): JSX.Element => {
  const [imageCard, setImageCard] = useState('');
  const [showImage, setShowImage] = useState(false);
  const [showLocations, setShowLocations] = useState(false);
  const [cardLocations, setCardLocations] = useState<ILocation[] | undefined>();
  const [filter, setFilter] = useState<string[]>([]);

  const getCollectedData = () => {
    try {
      return JSON.parse(localStorage.collected);
    } catch {
      return { collected: [] };
    }
  };

  const getCards = async () => {
    const data: any = await fetchCards();

    console.log('get cards');

    if (filter.length > 0) {
      return { cards: data.cards.filter((card: ICard) => filter.includes(card.deck) && card) };
    }

    return data;
  };

  const cardsQuery = useQuery<ICards, Error>(['cards', filter], getCards, {
    refetchOnWindowFocus: false
  });
  const collectedQuery = useQuery('collected', getCollectedData, {
    refetchOnWindowFocus: false
  });

  if (collectedQuery.isError || cardsQuery.isError) {
    return (
      <div className="p-2 md:p-10">
        <h1 className="text-2xl font-bold text-center">GWENTcards</h1>
        <div className="text-center">Something went wrong...</div>
      </div>
    );
  }
  if (collectedQuery.isLoading || cardsQuery.isLoading || !cardsQuery.data) {
    return (
      <div className="p-2 md:p-10">
        <h1 className="text-2xl font-bold text-center">GWENTcards</h1>
        <div className="text-center">Loading...</div>
      </div>
    );
  }

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

        <div className="grid grid-cols-2 md:flex md:flex-wrap gap-4 m-4 justify-center">
          <Button onClick={() => setFilter([])} title="Reset" />
          <DeckFilter setFilter={(f: string[]) => setFilter(f)} title="Monsters" filter={filter} />
          <DeckFilter setFilter={(f: string[]) => setFilter(f)} title="Neutral" filter={filter} />
          <DeckFilter setFilter={(f: string[]) => setFilter(f)} title="Nilfgaard" filter={filter} />
          <DeckFilter setFilter={(f: string[]) => setFilter(f)} title="Northern Realms" filter={filter} />
          <DeckFilter setFilter={(f: string[]) => setFilter(f)} title="Scoia'tael" filter={filter} />
          <DeckFilter setFilter={(f: string[]) => setFilter(f)} title="Skellige" filter={filter} />
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
