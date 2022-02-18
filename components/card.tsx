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
    <div className="bg-gradient-to-r from-cyan-400 to-blue-400 hidden md:block p-3">
      <div className="md:grid grid-cols-6 justify-center items-center gap-8">
        <div>
          <Image src={image} alt={`${name} card`} width="75" height="142" />
        </div>
        <Column type="Card" value={name} span={2} />
        <Column type="Deck" value={deck} />
        <Column type="Strength" value={strength} />
        <Column type="Row" value={row} />
      </div>
      <CollectButton />
    </div>
  );
};

const MobileCard = ({ image, name, deck, strength, row }: ICardProps) => {
  return (
    <div className="bg-gradient-to-r from-cyan-400 to-blue-400 md:hidden p-3">
      <div className="grid grid-cols-4 justify-center items-center gap-4">
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
      <CollectButton />
    </div>
  );
};

const CollectButton = () => {
  return (
    <button className="text-center w-full bg-indigo-400 drop-shadow-lg p-2 my-2 hover:bg-indigo-300">Collect</button>
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
