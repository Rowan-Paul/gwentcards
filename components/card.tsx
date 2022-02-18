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
    <>
      <DesktopCard image={image} name={name} deck={deck} strength={strength} row={row} />
      <MobileCard image={image} name={name} deck={deck} strength={strength} row={row} />
    </>
  );
};

const DesktopCard = ({ image, name, deck, strength, row }: ICardProps) => {
  return (
    <div className="bg-gradient-to-r from-cyan-400 to-blue-400 hidden md:grid grid-cols-7 justify-center items-center gap-8 p-3">
      <div>
        <Image src={image} alt={`${name} card`} width="75" height="142" />
      </div>
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

const MobileCard = ({ image, name, deck, strength, row }: ICardProps) => {
  return (
    <div className="bg-gradient-to-r from-cyan-400 to-blue-400 md:hidden grid grid-cols-4 justify-center items-center gap-4 p-3">
      <div>
        <Image src={image} alt={`${name} card`} width="75" height="142" />
      </div>
      <div className="flex flex-col gap-2 col-span-2">
        <Column type="Card" value={name} />
        <Column type="Deck" value={deck} />
      </div>
      <div className="flex flex-col gap-2">
        <Column type="Strength" value={strength} />
        <Column type="Row" value={row} />
      </div>
    </div>
  );
};

const Column = ({ type, value, span }: IColumnProps): JSX.Element => {
  return (
    <div className={`flex flex-col col-span-${span || 1}`}>
      <span className="font-bold">{type}</span>
      <span>{value}</span>
    </div>
  );
};

export default Card;
