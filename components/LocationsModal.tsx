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
    (event: any) => {
      if (event.key === 'Escape' && showLocations) {
        setShowLocations(false);
      }
    },
    [showLocations, setShowLocations]
  );

  const handleClickOutside = useCallback(
    (event: any) => {
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
        className="fixed z-50 w-3/4 max-h-screen overflow-auto transform -translate-x-1/2 -translate-y-1/2 md:w-2/3 lg:w-1/2 top-1/2 left-1/2"
        ref={wrapperRef}
      >
        <div className="px-10 py-5 text-white bg-indigo-400 rounded bg-gradient-to-r">
          <div className="mb-2 text-xl font-bold">Locations</div>
          {locations?.map((l, i) => (
            <div key={i} className="mb-4">
              <div className="font-bold">Location {i + 1}</div>
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
    <div className="gap-8 mb-2 md:flex">
      <span>{type} </span>
      <br className="md:hidden"></br>
      <span className="ml-auto text-right ">{value}</span>
    </div>
  );
};

export default LocationsModal;
