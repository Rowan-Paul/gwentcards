import { useQuery, useQueryClient } from 'react-query';
import { useEffect, useState } from 'react';

import Card, { ICard, ILocation } from '../components/Card';
import ExpandedImage from '../components/ExpandedImage';
import LocationsModal from '../components/LocationsModal';
import { MultiSelect } from 'react-multi-select-component';
import Button from '../components/Button';
import ReactSwitch from 'react-switch';

interface ICards {
  cards: ICard[];
}

interface IMultiSelect {
  value: string | number;
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
  const [strengthFilter, setStrengthFilter] = useState<IMultiSelect[]>([]);
  const [abilitiesFilter, setAbilitiesFilter] = useState<IMultiSelect[]>([]);
  const [hideDLC, setHideDLC] = useState<boolean>(false);
  const [filterValues, setFilterValues] = useState<any[]>([]);

  useEffect(() => {
    setFilterValues(
      [...deckFilter, ...expansionFilter, ...rowFilter, ...effectFilter, ...strengthFilter, ...abilitiesFilter].map(
        (item) => item.value
      )
    );
  }, [deckFilter, expansionFilter, rowFilter, effectFilter, strengthFilter, abilitiesFilter]);

  const resetFilters = () => {
    setDeckFilter([]);
    setExpansionFilter([]);
    setRowFilter([]);
    setEffectFilter([]);
    setStrengthFilter([]);
    setAbilitiesFilter([]);
    setFilterValues([]);
    setHideDLC(false);
  };

  const getCollectedData = () => {
    try {
      return JSON.parse(localStorage.collected);
    } catch {
      return { collected: [] };
    }
  };

  const getCards = async () => {
    const data: any = await fetchCards();

    if (filterValues.length > 0 || hideDLC) {
      return {
        cards: data.cards.filter((card: ICard) => {
          if (
            filterValues.includes(card.deck) ||
            filterValues.includes(card?.expansion as string) ||
            filterValues.includes(card?.row as string) ||
            filterValues.includes(card?.effect as string) ||
            filterValues.includes(card?.strength as number) ||
            card?.abilities?.some((ability) => filterValues.includes(ability)) ||
            (hideDLC && !card?.isDLC)
          )
            return card;
        })
      };
    }

    return data;
  };

  const cardsQuery = useQuery<ICards, Error>(['cards', filterValues, hideDLC], getCards, {
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
          <div>
            <span className="font-bold">Deck:</span>
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
          </div>
          <div>
            <span className="font-bold">Abilities:</span>
            <MultiSelect
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
              disableSearch
            />
          </div>
          <div>
            <span className="font-bold">Row:</span>
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
          </div>
          <div>
            <span className="font-bold">Strength:</span>
            <MultiSelect
              options={[
                { label: '1', value: 1 },
                { label: '2', value: 2 },
                { label: '3', value: 3 },
                { label: '4', value: 4 },
                { label: '5', value: 5 },
                { label: '6', value: 6 },
                { label: '7', value: 7 },
                { label: '8', value: 8 },
                { label: '9', value: 9 },
                { label: '10', value: 10 },
                { label: '11', value: 11 },
                { label: '12', value: 12 },
                { label: '13', value: 13 },
                { label: '14', value: 14 },
                { label: '15', value: 15 }
              ]}
              value={strengthFilter}
              onChange={setStrengthFilter}
              labelledBy="Select strength"
              disableSearch
            />
          </div>
          <div>
            <span className="font-bold">Effect:</span>
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
          </div>
          <div>
            <span className="block font-bold">Hide DLC cards:</span>
            <ReactSwitch
              onChange={() => setHideDLC(!hideDLC)}
              checked={hideDLC}
              onColor="#86d3ff"
              uncheckedIcon={false}
              checkedIcon={false}
              boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
              activeBoxShadow="0px 0px 1px 5px rgba(0, 0, 0, 0.2)"
              disabled={expansionFilter.length > 0}
              height={20}
              width={48}
              className="m-2"
            />
          </div>
          <div>
            <span className="font-bold">Expansion:</span>
            <MultiSelect
              options={[
                { label: 'Hearts of Stone', value: 'hearts of stone' },
                { label: 'Blood and Wine', value: 'blood and wine' }
              ]}
              value={expansionFilter}
              onChange={setExpansionFilter}
              labelledBy="Select abilities"
              disableSearch
              disabled={hideDLC}
            />
          </div>
          <div className="flex justify-center">
            <Button title="Reset filters" onClick={resetFilters} />
          </div>
        </div>

        {collectedQuery.isLoading || cardsQuery.isLoading || cardsQuery.isFetching ? (
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
