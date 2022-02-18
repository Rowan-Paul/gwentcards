import Image from 'next/image';

interface ICardProps {
  image: string;
  name: string;
  deck: "scoia'tael";
  strength: number;
  row: 'close' | 'agile' | 'ranged';
}

interface IColumnProps {
  type: string;
  value: string | number;
  span?: number;
}

const Card = ({ image, name, deck, strength, row }: ICardProps): JSX.Element => {
  return (
    <div className="bg-gradient-to-r from-cyan-500 to-blue-500 grid grid-cols-7 justify-center items-center gap-8 p-3">
      <Image src={image} alt={`${name} card`} width="75" height="142" />
      <Column type="Card" value={name} span={2} />
      <Column type="Deck" value={deck} />
      <Column type="Strength" value={strength} />
      <Column type="Row" value={row} />
      <div className="text-center">
        <input type="checkbox" />
      </div>
    </div>
  );
};

const Column = ({ type, value, span }: IColumnProps): JSX.Element => {
  return (
    <div className={`flex flex-col text-center col-span-${span || 1}`}>
      <span className="font-bold">{type}</span>
      <span>{value}</span>
    </div>
  );
};

export default Card;
