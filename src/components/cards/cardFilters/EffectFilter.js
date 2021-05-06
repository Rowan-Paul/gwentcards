import { connect } from 'react-redux'
import { setFilters, fetchCards } from '../../../redux/cards/actions'
import { Filter } from './Filter'

function EffectFilterUI(props) {
  const handleOnChange = (filter) => {
    let tempFilters = props.filters
    tempFilters[filter.name] = filter.values

    props.setFilters(tempFilters)
    props.fetchCards()
  }

  return (
    <Filter
      name="effect"
      handleOnChange={handleOnChange}
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

const mapStateToProps = (state) => ({
  filters: state.cards.filters,
  reset: state.cards.reset,
})

const mapDispatchToProps = (dispatch) => ({
  setFilters: (filters) => dispatch(setFilters(filters)),
  fetchCards: () => dispatch(fetchCards()),
})

export const EffectFilter = connect(
  mapStateToProps,
  mapDispatchToProps
)(EffectFilterUI)
