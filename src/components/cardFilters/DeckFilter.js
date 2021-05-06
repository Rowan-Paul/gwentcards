import { Filter } from './Filter'

function DeckFilterUI(props) {
  return (
    <Filter
      name="deck"
      handleOnChange={props.handleFilterOnChange}
      options={[
        { label: 'Nilfgaard', value: 'nilfgaard' },
        { label: 'Monsters', value: 'monsters' },
        { label: 'Neutral', value: 'neutral' },
        { label: 'Northern Realms', value: 'northern realms' },
        { label: "Scoia'tael", value: "scoia'tael" },
        { label: 'Skellige', value: 'skellige' },
      ]}
      reset={props.reset}
    />
  )
}

export const DeckFilter = DeckFilterUI
