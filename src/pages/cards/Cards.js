import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { GridView } from './GridView'
import { ListView } from './ListView'
import { Filters } from '../../components/cards/Filters'
import { fetchCards, fetchCollectedCards } from '../../redux/cards/actions'

function CardsUI(props) {
  useEffect(() => {
    props.fetchCards()
    props.fetchCollectedCards()
  }, [props.filters, props.pageSize, props.reset])

  return (
    <div id="cards">
      <Filters />
      <GridView />
      <ListView />
    </div>
  )
}

const mapStateToProps = (state) => ({
  selected: state.cards.selected,
  filters: state.cards.filters,
  pageSize: state.cards.pageSize,
})

const mapDispatchToProps = (dispatch) => ({
  fetchCards: () => dispatch(fetchCards()),
  fetchCollectedCards: () => dispatch(fetchCollectedCards()),
})

export const Cards = connect(mapStateToProps, mapDispatchToProps)(CardsUI)
