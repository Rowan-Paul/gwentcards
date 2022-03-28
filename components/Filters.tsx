import { useEffect, useState } from 'react';
import { MultiSelect } from 'react-multi-select-component';
import ReactSwitch from 'react-switch';
import Button from './Button';

interface IMultiSelect {
  value: string | number;
  label: string;
}

interface IFilterComponentProps {
  setFilterValues: any;
  setHideDLC: any;
  setShowCollected: any;
  hideDLC: boolean;
  showCollected: boolean;
}

const FiltersComponent = ({
  setFilterValues,
  setHideDLC,
  setShowCollected,
  hideDLC,
  showCollected
}: IFilterComponentProps) => {
  const [deckFilter, setDeckFilter] = useState<IMultiSelect[]>([]);
  const [expansionFilter, setExpansionFilter] = useState<IMultiSelect[]>([]);
  const [rowFilter, setRowFilter] = useState<IMultiSelect[]>([]);
  const [effectFilter, setEffectFilter] = useState<IMultiSelect[]>([]);
  const [strengthFilter, setStrengthFilter] = useState<IMultiSelect[]>([]);
  const [abilitiesFilter, setAbilitiesFilter] = useState<IMultiSelect[]>([]);
  const [display, setDisplay] = useState('hidden');

  useEffect(() => {
    setFilterValues(
      [...deckFilter, ...expansionFilter, ...rowFilter, ...effectFilter, ...strengthFilter, ...abilitiesFilter].map(
        (item) => item.value
      )
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deckFilter, expansionFilter, rowFilter, effectFilter, strengthFilter, abilitiesFilter]);

  const resetFilters = () => {
    setDeckFilter([]);
    setExpansionFilter([]);
    setRowFilter([]);
    setEffectFilter([]);
    setStrengthFilter([]);
    setAbilitiesFilter([]);
    setFilterValues([]);
    setHideDLC(false);
    setShowCollected(false);
  };

  const handleOnClick = () => {
    if (display === 'hidden') {
      setDisplay('grid');
    } else {
      setDisplay('hidden');
    }
  };

  return (
    <>
      <div className=" my-4 md:hidden">
        <Button onClick={handleOnClick} title={display === 'hidden' ? 'Show filters' : 'Hide filters'} />
      </div>
      <div className={`my-4 md:grid md:grid-cols-3 lg:grid-cols-5 gap-4 ${display}`}>
        <div>
          <span className="font-bold">Deck:</span>
          <MultiSelect
            options={[
              { label: 'Monsters', value: 'Monsters' },
              { label: 'Neutral', value: 'Neutral' },
              { label: 'Nilfgaard', value: 'Nilfgaard' },
              { label: 'Northern Realms', value: 'Northern Realms' },
              { label: "Scoia'tael", value: "Scoia'tael" },
              { label: 'Skellige', value: 'Skellige' }
            ]}
            value={deckFilter}
            onChange={setDeckFilter}
            labelledBy="Select deck"
            disableSearch
          />
        </div>
        <div>
          <span className="font-bold">Abilities:</span>
          <MultiSelect
            options={[
              { label: 'Hero', value: 'Hero' },
              { label: 'Medic', value: 'Medic' },
              { label: 'Morale boost', value: 'Morale boost' },
              { label: 'Muster', value: 'Muster' },
              { label: 'Spy', value: 'Spy' },
              { label: 'Tight bond', value: 'Tight bond' }
            ]}
            value={abilitiesFilter}
            onChange={setAbilitiesFilter}
            labelledBy="Select ability"
            disableSearch
          />
        </div>
        <div>
          <span className="font-bold">Row:</span>
          <MultiSelect
            options={[
              { label: 'Close', value: 'close' },
              { label: 'Agile', value: 'agile' },
              { label: 'Ranged', value: 'ranged' },
              { label: 'Siege', value: 'siege' },
              { label: 'Leader', value: 'leader' }
            ]}
            value={rowFilter}
            onChange={setRowFilter}
            labelledBy="Select row"
            disableSearch
          />
        </div>
        <div>
          <span className="font-bold">Strength:</span>
          <MultiSelect
            options={[
              { label: '1', value: 1 },
              { label: '2', value: 2 },
              { label: '3', value: 3 },
              { label: '4', value: 4 },
              { label: '5', value: 5 },
              { label: '6', value: 6 },
              { label: '7', value: 7 },
              { label: '8', value: 8 },
              { label: '9', value: 9 },
              { label: '10', value: 10 },
              { label: '11', value: 11 },
              { label: '12', value: 12 },
              { label: '13', value: 13 },
              { label: '14', value: 14 },
              { label: '15', value: 15 }
            ]}
            value={strengthFilter}
            onChange={setStrengthFilter}
            labelledBy="Select strength"
            disableSearch
          />
        </div>
        <div>
          <span className="font-bold">Effect:</span>
          <MultiSelect
            options={[
              { label: 'Scorch', value: 'scorch' },
              { label: 'Weather', value: 'weather' },
              { label: "Commander's horn", value: "commander's horn" },
              { label: 'Summon avenger', value: 'summon avenger' },
              { label: 'Mardroeme', value: 'mardroeme' },
              { label: 'Decoy', value: 'decoy' }
            ]}
            value={effectFilter}
            onChange={setEffectFilter}
            labelledBy="Select effect"
            disableSearch
          />
        </div>
        <div>
          <label>
            <span className="block font-bold">Hide DLC cards:</span>
            <ReactSwitch
              onChange={() => setHideDLC(!hideDLC)}
              checked={hideDLC}
              onColor="#86d3ff"
              uncheckedIcon={false}
              checkedIcon={false}
              boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
              activeBoxShadow="0px 0px 1px 5px rgba(0, 0, 0, 0.2)"
              disabled={expansionFilter.length > 0}
              height={20}
              width={48}
              className="m-2"
            />
          </label>
        </div>
        <div>
          <span className="font-bold">Expansion:</span>
          <MultiSelect
            options={[
              { label: 'Hearts of Stone', value: 'hearts of stone' },
              { label: 'Blood and Wine', value: 'blood and wine' }
            ]}
            value={expansionFilter}
            onChange={setExpansionFilter}
            labelledBy="Select abilities"
            disableSearch
            disabled={hideDLC}
          />
        </div>
        <div>
          <label>
            <span className="block font-bold">Show only collected cards:</span>
            <ReactSwitch
              onChange={() => setShowCollected(!showCollected)}
              checked={showCollected}
              onColor="#86d3ff"
              uncheckedIcon={false}
              checkedIcon={false}
              boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
              activeBoxShadow="0px 0px 1px 5px rgba(0, 0, 0, 0.2)"
              // disabled={expansionFilter.length > 0}
              height={20}
              width={48}
              className="m-2"
            />
          </label>
        </div>
        <div className="flex justify-center">
          <Button title="Reset filters" onClick={resetFilters} />
        </div>
      </div>
    </>
  );
};

export default FiltersComponent;
