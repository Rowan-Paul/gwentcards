import React, { useEffect, useState } from 'react'
import Switch from 'react-switch'
import { connect } from 'react-redux'

import { setFilters, fetchCards } from '../../../redux/cards/actions'

function HideCollectedCardsFilterUI(props) {
  const [checked, setChecked] = useState(false)

  const handleChange = () => {
    const tempFilters = props.filters
    tempFilters.hideCollectedCards = !checked

    props.setFilters(tempFilters)
    setChecked(!checked)
    props.fetchCards()
  }

  useEffect(() => {
    if (props.reset) {
      const tempFilters = props.filters
      tempFilters.hideCollectedCards = false

      props.setFilters(tempFilters)
      setChecked(false)
      props.fetchCards()
    }
  }, [props])

  return (
    <span className="mb-3 md:mb-0 lg:mb-3 p-3">
      <label htmlFor="UserCardsFilter" className="mr-5 font-bold">
        Hide collected cards
      </label>

      <Switch
        checked={checked}
        onChange={handleChange}
        onColor="#86d3ff"
        uncheckedIcon={false}
        checkedIcon={false}
        boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
        activeBoxShadow="0px 0px 1px 5px rgba(0, 0, 0, 0.2)"
        disabled={props.filters.showCollectedCards}
        height={20}
        width={48}
        className="w-full my-2 mx-5"
        id="hideCollectedcards"
      />
    </span>
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

export const HideCollectedCardsFilter = connect(
  mapStateToProps,
  mapDispatchToProps
)(HideCollectedCardsFilterUI)
