import { connect } from 'react-redux'
import { setFilters, fetchCards } from '../../redux/cards/actions'
import { Filter } from './Filter'

function AbilitiesFilterUI(props) {
  const handleOnChange = (filter) => {
    let tempFilters = props.filters
    tempFilters[filter.name] = filter.values

    props.setFilters(tempFilters)
    props.fetchCards()
  }

  return (
    <Filter
      name="abilities"
      handleOnChange={handleOnChange}
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

const mapStateToProps = (state) => ({
  filters: state.cards.filters,
  reset: state.cards.reset,
})

const mapDispatchToProps = (dispatch) => ({
  setFilters: (filters) => dispatch(setFilters(filters)),
  fetchCards: () => dispatch(fetchCards()),
})

export const AbilitiesFilter = connect(
  mapStateToProps,
  mapDispatchToProps
)(AbilitiesFilterUI)
