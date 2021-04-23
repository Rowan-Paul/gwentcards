import { useEffect } from 'react'
import { connect } from 'react-redux'
import { fetchCards } from '../redux/cards/actions'
import { Card } from './components/Card'

function CardsUI(props) {
  useEffect(() => {
    props.fetchCards()
    // eslint-disable-next-line
  }, [])

  const cards = props.selected.map((card) => (
    <Card card={card} key={card.name} />
  ))

  return (
    <div>
      <h2>Cards ({props.amount})</h2>
      <div className="grid lg:grid-cols-3">{cards}</div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  selected: state.cards.selected,
  amount: state.cards.amount,
})

const mapDispatchToProps = (dispatch) => ({
  fetchCards: () => dispatch(fetchCards()),
})

export const Cards = connect(mapStateToProps, mapDispatchToProps)(CardsUI)
