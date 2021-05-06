import { connect } from 'react-redux'
import { setFilters, fetchCards } from '../../redux/cards/actions'
import { Filter } from './Filter'

function DeckFilterUI(props) {
  const handleOnChange = (filter) => {
    let tempFilters = props.filters
    tempFilters[filter.name] = filter.values

    props.setFilters(tempFilters)
    props.fetchCards()
  }

  return (
    <Filter
      name="deck"
      handleOnChange={handleOnChange}
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

const mapStateToProps = (state) => ({
  filters: state.cards.filters,
  reset: state.cards.reset,
})

const mapDispatchToProps = (dispatch) => ({
  setFilters: (filters) => dispatch(setFilters(filters)),
  fetchCards: () => dispatch(fetchCards()),
})

export const DeckFilter = connect(
  mapStateToProps,
  mapDispatchToProps
)(DeckFilterUI)
