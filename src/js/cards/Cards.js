import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { fetchCards } from '../redux/cards/actions'
import { Card } from './components/Card'

function CardsUI(props) {
  const [cards, setCards] = useState([])
  const [page, setPage] = useState(0)
  const [pageSize] = useState(20)
  const [pagination, setPagination] = useState([])

  useEffect(() => {
    props.fetchCards()
  }, [])

  useEffect(() => {
    const selectedCards = getPage(props.selected)

    setCards(selectedCards.map((card) => <Card card={card} key={card.name} />))
  }, [props.selected, page])

  useEffect(() => {
    const pageAmount = Math.ceil(props.selected.length / pageSize)
    const tempArray = []

    for (let i = 0; i < pageAmount; i++) {
      let classes = 'mr-5 cursor-pointer'
      if (i === page) {
        classes = 'mr-5 cursor-pointer underline'
      }

      tempArray.push(
        <span onClick={(e) => setPage(i)} className={classes} key={`page${i}`}>
          {i + 1}
        </span>
      )
    }
    setPagination(tempArray)
  }, [props.selected.length, pageSize, page])

  const deckSelected = (e) => {
    const deck = e.target.value
    setCards([])
    setPage(0)
    props.fetchCards(deck)
  }

  function getPage(data) {
    const startPage = page * pageSize
    const endPage = startPage + pageSize

    return data.slice(startPage, endPage)
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
          onChange={deckSelected}
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
      <p className="text-left text-sm mt-1">
        {props.amount
          ? 'Showing ' + cards.length + '/' + props.amount + ' cards'
          : 'No cards found'}
      </p>

      <p>{pagination}</p>

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
