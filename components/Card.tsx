import Image from 'next/image';

import CollectButton from './CollectButton';

interface ICardProps {
  card: {
    id: string;
    image: string;
    name: string;
    deck: "Scoia'tael" | 'Monsters';
    strength?: number;
    row?: 'close' | 'agile' | 'ranged' | 'siege' | 'leader';
  };
  setImage: any;
}

interface IColumnProps {
  type: string;
  value: string | number;
  span?: number;
}

const Card = ({ card, setImage }: ICardProps): JSX.Element => {
  const { id, image, name, deck, strength, row } = card;

  return (
    <>
      <div className="bg-gradient-to-r from-cyan-400 to-blue-400 p-3 drop-shadow-md">
        <div className="hidden md:grid grid-cols-6 justify-center items-center gap-8">
          <div onClick={() => setImage(image)} className="cursor-pointer">
            <Image src={image} alt={`${name} card`} width="75" height="142" />
          </div>
          <Column type="Card" value={name} span={2} />
          <Column type="Deck" value={deck} />
          {strength && <Column type="Strength" value={strength} />}
          {row && <Column type="Row" value={row.charAt(0).toUpperCase() + row.slice(1)} />}
        </div>
        <div className="grid md:hidden grid-cols-4 justify-center items-center gap-4">
          <div onClick={() => setImage(image)} className="cursor-pointer">
            <Image src={image} alt={`${name} card`} width="75" height="142" />
          </div>
          <div className="flex flex-col gap-2 col-span-2">
            <Column type="Card" value={name} />
            <Column type="Deck" value={deck} />
          </div>
          <div className="flex flex-col gap-2">
            {strength && <Column type="Strength" value={strength} />}
            {row && <Column type="Row" value={row.charAt(0).toUpperCase() + row.slice(1)} />}
          </div>
        </div>
        <CollectButton id={id} />
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
