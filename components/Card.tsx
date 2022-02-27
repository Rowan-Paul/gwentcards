import Image from 'next/image';

import CollectButton from './CollectButton';

interface ICardProps {
  card: ICard;
  setImage: any;
}

interface IColumnProps {
  type: string;
  value: string | number;
  span?: number;
}

export interface ICard {
  id: string;
  image: string;
  name: string;
  deck: "Scoia'tael" | 'Monsters';
  strength?: number;
  row?: 'close' | 'agile' | 'ranged' | 'siege' | 'leader';
  locations: {
    type: string;
    location?: string;
    territory?: string;
    character?: string;
  }[];
  notes?: any;
  abilities?: any[];
  isDLC?: boolean;
  expansion?: 'hearts of stone' | 'blood and wine';
  effect?: 'scorch' | 'weather' | "commander's horn" | 'summon avenger' | 'berserker' | 'mardroeme';
}

const Card = ({ card, setImage }: ICardProps): JSX.Element => {
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
              <Image src="/blood-and-wine.png" alt="Blood and wine icon" width="72" height="72" />
            ) : (
              expansion === 'hearts of stone' && (
                <Image src="/hearts-of-stone.png" alt="Hearts of stone icon" width="72" height="72" />
              )
            )}
          </div>
        </div>
        <div className="flex gap-4">
          {locations.map((l: any, i: number) => (
            <CollectButton key={`${id}-${i}`} id={id + i} location={`${i + 1}`} />
          ))}
        </div>
      </div>
    </>
  );
};

const Column = ({ type, value, span }: IColumnProps) => {
  return (
    <div className={`flex flex-col col-span-${span || 1}`}>
      <span className="font-bold">{type}</span>
      <span>{value}</span>
    </div>
  );
};

export default Card;
