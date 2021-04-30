import { Filter } from './Filter'

function AbilitiesFilterUI(props) {
  return (
    <Filter
      name="abilities"
      handleOnChange={props.handleFilterOnChange}
      options={[
        { label: 'Hero', value: 'hero' },
        { label: 'Medic', value: 'medic' },
        { label: 'Moral boost', value: 'morale boost' },
        { label: 'Muster', value: 'muster' },
        { label: 'Spy', value: 'spy' },
        { label: 'Tight bond', value: 'tight bond' },
      ]}
      reset={props.reset}
    />
  )
}

export const AbilitiesFilter = AbilitiesFilterUI
