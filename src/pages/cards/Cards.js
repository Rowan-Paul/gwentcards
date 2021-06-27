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
      <p className="text-xl">
        You have collected{' '}
        {props.collectedCards ? props.collectedCards?.length : '0'} out of{' '}
        {props.amount ? props.amount : '0'} selected cards.
      </p>
      <GridView />
      <ListView />
    </div>
  )
}

const mapStateToProps = (state) => ({
  selected: state.cards.selected,
  filters: state.cards.filters,
  pageSize: state.cards.pageSize,
  amount: state.cards.amount,
  collectedCards: state.cards.collectedCards,
})

const mapDispatchToProps = (dispatch) => ({
  fetchCards: () => dispatch(fetchCards()),
  fetchCollectedCards: () => dispatch(fetchCollectedCards()),
})

export const Cards = connect(mapStateToProps, mapDispatchToProps)(CardsUI)
