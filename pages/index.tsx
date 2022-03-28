import { useQuery } from 'react-query';
import { useEffect, useState } from 'react';
import Link from 'next/link';

import Card, { ICard, ILocation } from '../components/Card';
import ExpandedImage from '../components/ExpandedImage';
import LocationsModal from '../components/LocationsModal';
import FiltersComponent from '../components/Filters';

interface ICards {
  cards: ICard[];
}

const Home = (): JSX.Element => {
  const [imageCard, setImageCard] = useState('');
  const [showImage, setShowImage] = useState(false);
  const [showLocations, setShowLocations] = useState(false);
  const [cardLocations, setCardLocations] = useState<ILocation[] | undefined>();
  const [filterValues, setFilterValues] = useState<any[]>([]);
  const [hideDLC, setHideDLC] = useState<boolean>(false);
  const [showCollected, setShowCollected] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [pagination, setPagination] = useState<any[]>([]);

  const getCollectedData = () => {
    try {
      return JSON.parse(localStorage.collected);
    } catch {
      return { collected: [] };
    }
  };

  const getCards = async () => {
    const data: any = await fetchCards();
    setPage(1);

    if (filterValues.length > 0 || hideDLC || showCollected) {
      return {
        cards: data.cards.filter((card: ICard) => {
          const locations = card.locations.map((l, i) => card.id + i);

          if (
            filterValues.includes(card.deck) ||
            filterValues.includes(card?.expansion as string) ||
            filterValues.includes(card?.row as string) ||
            filterValues.includes(card?.effect as string) ||
            filterValues.includes(card?.strength as number) ||
            card?.abilities?.some((ability) => filterValues.includes(ability)) ||
            (hideDLC && !card?.isDLC) ||
            (showCollected && collectedQuery.data.collected.some((id: string) => locations.includes(id)))
          )
            return card;
        })
      };
    }

    return data;
  };

  const cardsQuery = useQuery<ICards, Error>(['cards', filterValues, hideDLC, showCollected], getCards, {
    refetchOnWindowFocus: false
  });
  const collectedQuery = useQuery('collected', getCollectedData, {
    refetchOnWindowFocus: false
  });

  useEffect(() => {
    const pageAmount = Math.ceil((cardsQuery.data?.cards.length || 0) / 21);
    const tempArray = [];

    for (let i = 0; i < pageAmount; i++) {
      let classes = 'md:mr-5 p-2 cursor-pointer inline-block';
      if (i === page - 1) {
        classes = 'md:mr-5 p-2 cursor-pointer inline-block underline';
      }

      tempArray.push(
        <Link href="#" key={i}>
          <a>
            <span onClick={() => setPage(i + 1)} className={classes}>
              {i + 1}
            </span>
          </a>
        </Link>
      );
    }
    setPagination(tempArray);
  }, [cardsQuery.data?.cards, page]);

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
      <div className="flex flex-col min-h-screen">
        <div className="p-2 md:p-10">
          <h1 className="text-2xl font-bold text-center">GWENTcards</h1>

          <FiltersComponent
            setFilterValues={(f: any) => setFilterValues(f)}
            setHideDLC={(f: boolean) => setHideDLC(f)}
            setShowCollected={(f: boolean) => setShowCollected(f)}
            hideDLC={hideDLC}
            showCollected={showCollected}
          />

          {collectedQuery.isLoading || cardsQuery.isLoading || cardsQuery.isFetching ? (
            <div className="text-center">Loading...</div>
          ) : (
            <>
              <div className="flex gap-4 p-4 flex-wrap justify-center">{pagination}</div>
              <div>Total cards: {cardsQuery.data?.cards?.length}</div>
              <div className=" mt-2 grid lg:grid-cols-2 2xl:grid-cols-3 gap-4">
                {getPaginatedCards(cardsQuery.data?.cards || [], page).map((c: ICard, i) => {
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
              <div className="flex gap-4 p-4 flex-wrap justify-center">{pagination}</div>
            </>
          )}
        </div>
        <div className="mt-auto my-4 text-center">
          Made with ❤ by{' '}
          <span className="underline">
            <a href="https://rowanpaulflynn.com/" target="_blank" rel="noreferrer">
              Rowan Paul Flynn
            </a>
          </span>
        </div>
      </div>
    </>
  );
};

const getPaginatedCards = (dataSet: any[], page: number) => {
  let index, offSet;
  const perPage = 21;

  if (page == 1 || page <= 0) {
    index = 0;
    offSet = perPage;
  } else if (page > dataSet.length) {
    index = page - 1;
    offSet = dataSet.length;
  } else {
    index = page * perPage - perPage;
    offSet = index + perPage;
  }

  return dataSet.slice(index, offSet);
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
