import Image from 'next/image';

import CollectButton from './CollectButton';

interface ICardProps {
  card: ICard;
  setImage: any;
  setLocations: any;
}

export interface ICard {
  id: string;
  image: string;
  name: string;
  deck: "Scoia'tael" | 'Monsters' | 'Nilfgaard' | 'Northern Realms' | 'Neutral' | 'Skellige';
  strength?: number;
  row?: 'close' | 'agile' | 'ranged' | 'siege' | 'leader';
  locations: ILocation[];
  notes?: any;
  abilities?: ['Hero' | 'Medic' | 'Moral boost' | 'Muster' | 'Spy' | 'Tight bond'];
  isDLC?: boolean;
  expansion?: 'hearts of stone' | 'blood and wine';
  effect?: 'scorch' | 'weather' | "commander's horn" | 'summon avenger' | 'berserker' | 'mardroeme' | 'decoy';
}

export interface ILocation {
  type: string;
  location?: string;
  territory?: string;
  character?: string;
}

const Card = ({ card, setImage, setLocations }: ICardProps): JSX.Element => {
  const { id, image, name, deck, strength, row, locations, notes, abilities, isDLC, expansion, effect } = card;

  return (
    <>
      <div className="bg-gradient-to-r from-cyan-400 to-blue-400 p-3 drop-shadow-md">
        <div className="flex gap-8">
          <div onClick={() => setImage(image)} className="cursor-pointer">
            <Image src={image} alt={`${name} card`} width="75" height="142" />
          </div>
          <div>
            <div className="font-bold h-12">{name}</div>
            <div>{deck} deck</div>
            {strength ? <div>{strength} strength</div> : <div className="italic text-sm h-6">No strength</div>}
            {row ? (
              <div>{row.charAt(0).toUpperCase() + row.slice(1)} row</div>
            ) : (
              <div className="italic text-sm h-6">Not on a row</div>
            )}
            {effect ? (
              <div>{effect.charAt(0).toUpperCase() + effect.slice(1)} effect</div>
            ) : (
              <div className="italic text-sm h-6">No effects</div>
            )}
            {abilities ? (
              <div>Abilities: {abilities.toString()}</div>
            ) : (
              <div className="italic text-sm h-6">No abilities</div>
            )}
          </div>
          <div className="ml-auto">
            {isDLC && expansion === 'blood and wine' ? (
              <Image
                src="/blood-and-wine.png"
                alt="Blood and wine icon"
                width="72"
                height="72"
                title="Blood and Wine DLC"
              />
            ) : (
              expansion === 'hearts of stone' && (
                <Image
                  src="/hearts-of-stone.png"
                  alt="Hearts of stone icon"
                  width="72"
                  height="72"
                  title="Hearts of Stone DLC"
                />
              )
            )}
          </div>
        </div>
        <div className={locations.length > 1 ? 'md:grid grid-cols-2 gap-4 my-2' : 'my-2'}>
          {locations.map((l: ILocation, i: number) => (
            <CollectButton
              key={`${id}-${i}`}
              id={id + i}
              location={
                locations.length > 1 ? `#${i + 1} ${l.type.charAt(0).toUpperCase() + l.type.slice(1)}` : 'Collect card'
              }
              setShowLocations={() => setLocations(locations)}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Card;
