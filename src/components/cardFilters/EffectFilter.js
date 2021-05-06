import { Filter } from './Filter'

function EffectFilterUI(props) {
  return (
    <Filter
      name="effect"
      handleOnChange={props.handleFilterOnChange}
      options={[
        { label: 'Weather', value: 'weather' },
        { label: 'Decoy', value: 'decoy' },
        { label: "Commander's horn", value: "commander's horn" },
        { label: 'Scorch', value: 'scorch' },
        { label: 'Summon Avenger', value: 'summon avenger' },
        { label: 'Mardroeme', value: 'mardroeme' },
        { label: 'Berserker', value: 'berserker' },
      ]}
      reset={props.reset}
    />
  )
}

export const EffectFilter = EffectFilterUI
