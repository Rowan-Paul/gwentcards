import { useEffect } from 'react'
import { connect } from 'react-redux'

import { CurrentPage } from '../../components/cards/CurrentPage'
import { Filters } from '../../components/cards/Filters'
import { Pagination } from '../../components/cards/Pagination'
import { fetchCards, fetchCollectedCards } from '../../redux/cards/actions'

function CardsUI(props) {
  useEffect(() => {
    props.fetchCards()
    props.fetchCollectedCards()
    // eslint-disable-next-line
  }, [props.filters, props.pageSize, props.reset])

  return (
    <div id="cards">
      <Filters />
      <Pagination />
      <CurrentPage />
      <Pagination />
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
