import { useCallback, useEffect, useRef } from 'react';
import { ILocation } from './Card';

interface ILocationsModalProps {
  locations: ILocation[] | undefined;
  showLocations: boolean;
  setShowLocations: any;
}

interface IRowProps {
  type: string;
  value: string;
}

const LocationsModal = ({ locations, showLocations, setShowLocations }: ILocationsModalProps): JSX.Element => {
  const wrapperRef: any = useRef(null);

  const escFunction = useCallback(
    (event) => {
      if (event.key === 'Escape' && showLocations) {
        setShowLocations(false);
      }
    },
    [showLocations, setShowLocations]
  );

  const handleClickOutside = useCallback(
    (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target) && showLocations) {
        setShowLocations(false);
      }
    },
    [showLocations, setShowLocations]
  );

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', escFunction, false);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', escFunction, false);
    };
  }, [wrapperRef, handleClickOutside, escFunction]);

  useEffect(() => {
    if (showLocations) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [showLocations]);

  return (
    <div
      className={showLocations ? 'fixed backdrop-blur w-screen h-screen z-40' : 'hidden'}
      onKeyPress={() => setShowLocations(false)}
    >
      <div
        className="overflow-auto max-h-screen w-3/4 md:w-2/3 lg:w-1/2 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50"
        ref={wrapperRef}
      >
        <div className="py-5 px-10 rounded bg-gradient-to-r text-white bg-indigo-400">
          <div className="font-bold text-lg mb-2">Locations</div>
          {locations?.map((l, i) => (
            <div key={i} className="mb-4">
              <div>Location {i + 1}</div>
              <Row type="Type" value={l.type.charAt(0).toUpperCase() + l.type.slice(1)} />
              {l.territory && <Row type="Territory" value={l.territory} />}
              {l.location && <Row type="Location" value={l.location} />}
              {l.character && <Row type="Character" value={l.character} />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Row = ({ type, value }: IRowProps): JSX.Element => {
  return (
    <div className="md:flex gap-8 mb-2">
      <span className="font-bold">{type} </span>
      <br className="md:hidden"></br>
      <span className=" ml-auto text-right">{value}</span>
    </div>
  );
};

export default LocationsModal;
