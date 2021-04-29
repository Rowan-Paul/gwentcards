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

  function deckSelected(deck) {
    props.fetchCards(deck)
  }

  return (
    <div>
      <h2>Cards ({props.amount ? props.amount : '0'} cards)</h2>

      <div className="my-5 p-2 text-left">
        <label htmlFor="deck" className="mr-5 font-bold">
          Deck:
        </label>

        <select
          name="deck"
          id="deck"
          className="border-2"
          onChange={(e) => deckSelected(e.target.value)}
        >
          <option value="">All decks</option>
          <option value="nilfgaard">Nilfgaard</option>
          <option value="monsters">Monsters</option>
          <option value="neutral">Neutral</option>
          <option value="northern%20realms">Northern Realms</option>
          <option value="scoia'tael">Scoia'tael</option>
          <option value="skellige">Skellige</option>
        </select>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4">{cards}</div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  selected: state.cards.selected,
  amount: state.cards.amount,
})

const mapDispatchToProps = (dispatch) => ({
  fetchCards: (deck) => dispatch(fetchCards(deck)),
})

export const Cards = connect(mapStateToProps, mapDispatchToProps)(CardsUI)
