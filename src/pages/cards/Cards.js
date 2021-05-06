import { useEffect } from 'react'

import { connect } from 'react-redux'
import { CurrentPage } from '../../components/cards/CurrentPage'
import { fetchCards } from '../../redux/cards/actions'

function CardsUI(props) {
  useEffect(() => {
    props.fetchCards()
  }, [])

  return (
    <div>
      <CurrentPage />
    </div>
  )
}

const mapStateToProps = (state) => ({
  selected: state.cards.selected,
})

const mapDispatchToProps = (dispatch) => ({
  fetchCards: () => dispatch(fetchCards()),
})

export const Cards = connect(mapStateToProps, mapDispatchToProps)(CardsUI)
