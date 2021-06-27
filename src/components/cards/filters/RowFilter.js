import React from 'react'
import { connect } from 'react-redux'
import { setFilters, fetchCards } from '../../../redux/cards/actions'
import { Filter } from './Filter'

function RowFilterUI(props) {
  const handleOnChange = (filter) => {
    const tempFilters = props.filters
    tempFilters[filter.name] = filter.values

    props.setFilters(tempFilters)
    props.fetchCards()
  }

  return (
    <Filter
      name="row"
      handleOnChange={handleOnChange}
      options={[
        { label: 'Close', value: 'close' },
        { label: 'Ranged', value: 'ranged' },
        { label: 'Siege', value: 'siege' },
        { label: 'Leader', value: 'leader' },
        { label: 'Agile', value: 'agile' },
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

export const RowFilter = connect(
  mapStateToProps,
  mapDispatchToProps
)(RowFilterUI)
