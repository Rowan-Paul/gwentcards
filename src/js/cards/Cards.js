import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { fetchCards } from '../redux/cards/actions'
import { Card } from './components/Card'

function CardsUI(props) {
  const [cards, setCards] = useState([])
  const [page, setPage] = useState(0)
  const [pageSize] = useState(20)
  const [pagination, setPagination] = useState([])
  const [deck, setDeck] = useState('')
  const [row, setRow] = useState('')
  const [strength, setStrength] = useState('')
  const [abilities, setAbilities] = useState('')
  const [effect, setEffect] = useState('')

  useEffect(() => {
    props.fetchCards()
  }, [])

  useEffect(() => {
    const startPage = page * pageSize
    const endPage = startPage + pageSize

    const selectedCards = props.selected.slice(startPage, endPage)

    setCards(selectedCards.map((card) => <Card card={card} key={card.name} />))
  }, [props.selected, page, pageSize])

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
    setDeck(e.target.value)
    setCards([])
    setPage(0)
    props.fetchCards(e.target.value, row, strength, abilities, effect)
  }

  const rowSelected = (e) => {
    setRow(e.target.value)
    setCards([])
    setPage(0)
    props.fetchCards(deck, e.target.value, strength, abilities, effect)
  }

  const strengthSelected = (e) => {
    setStrength(e.target.value)
    setCards([])
    setPage(0)
    props.fetchCards(deck, row, e.target.value, abilities, effect)
  }

  const abilitiesSelected = (e) => {
    setAbilities(e.target.value)
    setCards([])
    setPage(0)
    props.fetchCards(deck, row, strength, e.target.value, effect)
  }

  const effectSelected = (e) => {
    setEffect(e.target.value)
    setCards([])
    setPage(0)
    props.fetchCards(deck, row, strength, abilities, e.target.value)
  }

  return (
    <div>
      <h2>Cards ({props.amount ? props.amount : '0'} cards)</h2>

      <div className="my-5 p-2 text-left grid md:grid-cols-3 lg:grid-cols-5">
        <span className="mb-3 md:mb-5 lg:mb-0">
          <label htmlFor="deck" className="mr-5 font-bold">
            Deck:
          </label>

          <select
            name="deck"
            id="deck"
            className="border-2 min-w-full md:min-w-0"
            onChange={deckSelected}
          >
            <option value="">All decks</option>
            <option value="nilfgaard">Nilfgaard</option>
            <option value="monsters">Monsters</option>
            <option value="neutral">Neutral</option>
            <option value="northern realms">Northern Realms</option>
            <option value="scoia'tael">Scoia'tael</option>
            <option value="skellige">Skellige</option>
          </select>
        </span>

        <span className="mb-3 md:mb-5 lg:mb-0">
          <label htmlFor="row" className="mr-5 font-bold">
            Row:
          </label>
          <select
            name="row"
            id="row"
            className="border-2 min-w-full md:min-w-0"
            onChange={rowSelected}
          >
            <option value="">All rows</option>
            <option value="close">Close</option>
            <option value="ranged">Ranged</option>
            <option value="siege">Siege</option>
            <option value="leader">Leader</option>
            <option value="agile">Agile</option>
          </select>
        </span>

        <span className="mb-3 md:mb-5 lg:mb-0">
          <label htmlFor="strength" className="mr-5 font-bold">
            Strength:
          </label>
          <select
            name="strength"
            id="strength"
            className="border-2 min-w-full md:min-w-0"
            onChange={strengthSelected}
          >
            <option value="">All strengths</option>
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
            <option value="13">13</option>
            <option value="14">14</option>
            <option value="15">15</option>
          </select>
        </span>

        {/* TODO: add choice for multiple abilities */}
        <span className="mb-3 md:mb-0">
          <label htmlFor="abilities" className="mr-5 font-bold">
            Abilities:
          </label>
          <select
            name="abilities"
            id="abilities"
            className="border-2 min-w-full md:min-w-0"
            onChange={abilitiesSelected}
          >
            <option value="">All abilities</option>
            <option value="agile">Agile</option>
            <option value="hero">Hero</option>
            <option value="medic">Medic</option>
            <option value="morale boost">Morale Boost</option>
            <option value="muster">Muster</option>
            <option value="spy">Spy</option>
            <option value="tight bond">Tight Bond</option>
          </select>
        </span>

        <span className="mb-0">
          <label htmlFor="effect" className="mr-5 font-bold">
            Effect:
          </label>
          <select
            name="effect"
            id="effect"
            className="border-2 min-w-full md:min-w-0"
            onChange={effectSelected}
          >
            <option value="">All effect</option>
            <option value="weather">Weather</option>
            <option value="decoy">Decoy</option>
            <option value="commander's horn">Commander's Horn'</option>
            <option value="scorch">Scorch</option>
            <option value="summon avenger">Summon Avenger</option>
            <option value="mardroeme">Mardroeme</option>
            <option value="berserker">Berserker</option>
          </select>
        </span>
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
  fetchCards: (deck, row, strength, abilities, effect) =>
    dispatch(fetchCards(deck, row, strength, abilities, effect)),
})

export const Cards = connect(mapStateToProps, mapDispatchToProps)(CardsUI)
