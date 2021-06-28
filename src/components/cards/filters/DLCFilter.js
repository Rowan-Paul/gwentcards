import React from 'react'
import { connect } from 'react-redux'
import { setFilters, fetchCards } from '../../../redux/cards/actions'
import { Filter } from './Filter'

function DLCFilterUI(props) {
  const handleOnChange = (filter) => {
    const tempFilters = props.filters
    tempFilters[filter.name] = filter.values

    props.setFilters(tempFilters)
    props.fetchCards()
  }

  return (
    <Filter
      name="dlc"
      handleOnChange={handleOnChange}
      options={[
        { label: 'Blood and Wine', value: 'blood and wine' },
        { label: 'Hearts of Stone', value: 'hearts of stone' },
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

export const DLCFilter = connect(
  mapStateToProps,
  mapDispatchToProps
)(DLCFilterUI)
