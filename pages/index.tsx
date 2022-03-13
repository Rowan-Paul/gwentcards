import { useQuery, useQueryClient } from 'react-query';
import { useEffect, useState } from 'react';

import Card, { ICard, ILocation } from '../components/Card';
import ExpandedImage from '../components/ExpandedImage';
import LocationsModal from '../components/LocationsModal';
import { MultiSelect } from 'react-multi-select-component';

interface ICards {
  cards: ICard[];
}

interface IMultiSelect {
  value: string;
  label: string;
}

const Home = (): JSX.Element => {
  const [imageCard, setImageCard] = useState('');
  const [showImage, setShowImage] = useState(false);
  const [showLocations, setShowLocations] = useState(false);
  const [cardLocations, setCardLocations] = useState<ILocation[] | undefined>();
  const [deckFilter, setDeckFilter] = useState<IMultiSelect[]>([]);
  const [expansionFilter, setExpansionFilter] = useState<IMultiSelect[]>([]);
  const [rowFilter, setRowFilter] = useState<IMultiSelect[]>([]);
  const [effectFilter, setEffectFilter] = useState<IMultiSelect[]>([]);
  const [filterValues, setFilterValues] = useState<string[]>([]);

  useEffect(() => {
    setFilterValues([...deckFilter, ...expansionFilter, ...rowFilter, ...effectFilter].map((item) => item.value));
  }, [deckFilter, expansionFilter, rowFilter, effectFilter]);

  const getCollectedData = () => {
    try {
      return JSON.parse(localStorage.collected);
    } catch {
      return { collected: [] };
    }
  };

  const getCards = async () => {
    const data: any = await fetchCards();

    if (filterValues.length > 0) {
      return {
        cards: data.cards.filter((card: ICard) => {
          if (
            filterValues.includes(card.deck) ||
            filterValues.includes(card?.expansion as string) ||
            filterValues.includes(card?.row as string) ||
            filterValues.includes(card?.effect as string)
          )
            return card;
        })
      };
    }

    return data;
  };

  const cardsQuery = useQuery<ICards, Error>(['cards', filterValues], getCards, {
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

        <div className="my-4 md:grid md:grid-cols-3 lg:grid-cols-5 gap-4">
          <MultiSelect
            options={[
              { label: 'Monsters', value: 'Monsters' },
              { label: 'Neutral', value: 'Neutral' },
              { label: 'Nilfgaard', value: 'Nilfgaard' },
              { label: 'Northern Realms', value: 'Northern Realms' },
              { label: "Scoia'tael", value: "Scoia'tael" },
              { label: 'Skellige', value: 'Skellige' }
            ]}
            value={deckFilter}
            onChange={setDeckFilter}
            labelledBy="Select deck"
            disableSearch
          />
          <MultiSelect
            options={[
              { label: 'Hearts of Stone', value: 'hearts of stone' },
              { label: 'Blood and Wine', value: 'blood and wine' }
            ]}
            value={expansionFilter}
            onChange={setExpansionFilter}
            labelledBy="Select abilities"
            disableSearch
          />
          <MultiSelect
            options={[
              { label: 'Close', value: 'close' },
              { label: 'Agile', value: 'agile' },
              { label: 'Ranged', value: 'ranged' },
              { label: 'Siege', value: 'siege' },
              { label: 'Leader', value: 'leader' }
            ]}
            value={rowFilter}
            onChange={setRowFilter}
            labelledBy="Select row"
            disableSearch
          />
          <MultiSelect
            options={[
              { label: 'Scorch', value: 'scorch' },
              { label: 'Weather', value: 'weather' },
              { label: "Commander's horn", value: "commander's horn" },
              { label: 'Summon avenger', value: 'summon avenger' },
              { label: 'Mardroeme', value: 'mardroeme' },
              { label: 'Decoy', value: 'decoy' }
            ]}
            value={effectFilter}
            onChange={setEffectFilter}
            labelledBy="Select effect"
            disableSearch
          />
          {/* <MultiSelect
            options={[
              { label: 'Hero', value: 'Hero' },
              { label: 'Medic', value: 'Medic' },
              { label: 'Moral boost', value: 'Moral boost' },
              { label: 'Muster', value: 'Muster' },
              { label: 'Spy', value: 'Spy' },
              { label: 'Tight bond', value: 'Tight bond' }
            ]}
            value={abilitiesFilter}
            onChange={setAbilitiesFilter}
            labelledBy="Select ability"
          /> */}
        </div>

        {collectedQuery.isLoading || cardsQuery.isLoading ? (
          <div className="text-center">Loading...</div>
        ) : (
          <>
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
          </>
        )}
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
