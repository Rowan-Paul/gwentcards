import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';

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
}

interface IColumnProps {
  type: string;
  value: string | number;
  span?: number;
}

const Card = ({ card }: ICardProps) => {
  const { id, image, name, deck, strength, row } = card;
  const [showImage, setShowImage] = useState(false);
  const wrapperRef: any = useRef(null);

  const handleClose = useCallback(
    (event) => {
      if (event.key === 'Escape' && showImage) {
        setShowImage(false);
      }
      if (wrapperRef.current && !wrapperRef.current.contains(event.target) && showImage) {
        setShowImage(false);
      }
    },
    [showImage]
  );

  useEffect(() => {
    document.addEventListener('mousedown', handleClose);
    document.addEventListener('keydown', handleClose, false);
    return () => {
      document.removeEventListener('mousedown', handleClose);
      document.removeEventListener('keydown', handleClose, false);
    };
  }, [wrapperRef, handleClose]);

  useEffect(() => {
    if (showImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [showImage]);

  useEffect(() => {
    return () => {};
  }, []);

  return (
    <>
      <div className="bg-gradient-to-r from-cyan-400 to-blue-400 p-3 drop-shadow-md">
        <div className="hidden md:grid grid-cols-6 justify-center items-center gap-8">
          <div onClick={() => setShowImage(true)}>
            <Image src={image} alt={`${name} card`} width="75" height="142" />
          </div>
          <Column type="Card" value={name} span={2} />
          <Column type="Deck" value={deck} />
          {strength && <Column type="Strength" value={strength} />}
          {row && <Column type="Row" value={row.charAt(0).toUpperCase() + row.slice(1)} />}
        </div>
        <div className="grid md:hidden grid-cols-4 justify-center items-center gap-4">
          <div onClick={() => setShowImage(true)}>
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
      <div
        className={showImage ? 'fixed backdrop-blur w-screen h-screen z-40 -mt-10' : 'hidden'}
        onKeyPress={() => setShowImage(false)}
      >
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50" ref={wrapperRef}>
          <Image src={image} alt={`${name} card`} width="250" height="500" />
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
