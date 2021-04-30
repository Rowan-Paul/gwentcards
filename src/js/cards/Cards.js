import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { fetchCards } from '../redux/cards/actions'
import { Card } from './components/Card'
import MultiSelect from 'react-multi-select-component'

function CardsUI(props) {
  const [cards, setCards] = useState([])
  const [page, setPage] = useState(0)
  const [pageSize, setPageSize] = useState(20)
  const [pagination, setPagination] = useState([])
  const [deck, setDeck] = useState('')
  const [row, setRow] = useState('')
  const [strength, setStrength] = useState('')
  const [abilities, setAbilities] = useState([])
  const [effect, setEffect] = useState('')
  const [selected, setSelected] = useState([])

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
      let classes = 'mr-5 cursor-pointer inline-block'
      if (i === page) {
        classes = 'mr-5 cursor-pointer inline-block underline'
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
    setSelected(e)
    let elements = []
    e.forEach((element) => {
      const result = element.value
      elements.push(result)
    })

    setAbilities(elements)
    setCards([])
    setPage(0)

    console.log(elements.toString())

    props.fetchCards(deck, row, strength, elements.toString(), effect)
  }

  const effectSelected = (e) => {
    setEffect(e.target.value)
    setCards([])
    setPage(0)
    props.fetchCards(deck, row, strength, abilities, e.target.value)
  }

  const pageSizeSelected = (e) => {
    setPageSize(e.target.value)
    setPage(0)
    props.fetchCards(deck, row, strength, abilities, effect)
  }

  const options = [
    { label: 'Hero', value: 'hero' },
    { label: 'Medic', value: 'medic' },
    { label: 'Moral boost', value: 'morale boost' },
    { label: 'Muster', value: 'muster' },
    { label: 'Spy', value: 'spy' },
    { label: 'Tight bond', value: 'tight bond' },
  ]

  return (
    <div>
      <h2>Cards ({props.amount ? props.amount : '0'} cards)</h2>

      <div className="my-5 p-2 text-left grid md:grid-cols-3 lg:grid-cols-5">
        <span className="mb-3 md:mb-0 lg:mb-3">
          <label htmlFor="pageSize" className="mr-5 font-bold">
            Cards per page:
          </label>
          <select
            name="pageSize"
            id="pageSize"
            className="border-2 min-w-full md:min-w-0"
            onChange={pageSizeSelected}
            defaultValue="20"
          >
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
          </select>
        </span>

        <span className="mb-3 md:mb-0 lg:mb-3">
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

        <span className="mb-3 md:mb-0 lg:mb-3">
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

        <span className="mb-3 md:mb-0 lg:mb-3">
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

        <span className="mb-3 md:mb-0 lg:mb-3">
          <label htmlFor="abilities" className="mr-5 font-bold">
            Abilities:
          </label>

          <MultiSelect
            options={options}
            value={selected}
            onChange={abilitiesSelected}
            labelledBy="Select"
            hasSelectAll={false}
            disableSearch={true}
            className="inline-block border-2 min-w-full md:min-w-0"
          />
        </span>

        <span className="mb-3 md:mb-0 lg:mb-3">
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
