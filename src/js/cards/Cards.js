import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { fetchCards } from '../redux/cards/actions'
import { Card } from './components/Card'
import { Filter } from './components/Filter'

function CardsUI(props) {
  const [cards, setCards] = useState([])
  const [page, setPage] = useState(0)
  const [pageSize, setPageSize] = useState(20)
  const [pagination, setPagination] = useState([])
  const [filters, setFilters] = useState({
    deck: [],
    row: [],
    strength: [],
    abilities: [],
    effect: [],
  })

  useEffect(() => {
    props.fetchCards(filters)
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

  const handleFilterOnChange = (filter) => {
    setCards([])
    setPage(0)

    let tempFilters = filters
    tempFilters[filter.name] = filter.values
    setFilters(tempFilters)

    props.fetchCards(tempFilters)
  }

  const pageSizeSelected = (e) => {
    setPageSize(e.target.value)
    setPage(0)
    setCards([])
    props.fetchCards(filters)
  }

  //TODO: reset button
  return (
    <div>
      <h2>Cards ({props.amount ? props.amount : '0'} cards)</h2>

      <div className="my-5 p-2 text-left grid md:grid-cols-3 lg:grid-cols-5">
        <span className="mb-3 md:mb-0 lg:mb-3 p-3">
          <label htmlFor="pageSize" className="mr-5 font-bold">
            Cards per page:
          </label>
          <select
            name="pageSize"
            id="pageSize"
            className="border-2 w-full px-2 h-10"
            onChange={pageSizeSelected}
            defaultValue="20"
          >
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
          </select>
        </span>

        <Filter
          name="deck"
          handleOnChange={handleFilterOnChange}
          options={[
            { label: 'Nilfgaard', value: 'nilfgaard' },
            { label: 'Monsters', value: 'monsters' },
            { label: 'Neutral', value: 'neutral' },
            { label: 'Northern Realms', value: 'northern realms' },
            { label: "Scoia'tael", value: "scoia'tael" },
            { label: 'Skellige', value: 'skellige' },
          ]}
        />
        <Filter
          name="abilities"
          handleOnChange={handleFilterOnChange}
          options={[
            { label: 'Hero', value: 'hero' },
            { label: 'Medic', value: 'medic' },
            { label: 'Moral boost', value: 'morale boost' },
            { label: 'Muster', value: 'muster' },
            { label: 'Spy', value: 'spy' },
            { label: 'Tight bond', value: 'tight bond' },
          ]}
        />
        <Filter
          name="row"
          handleOnChange={handleFilterOnChange}
          options={[
            { label: 'Hero', value: 'hero' },
            { label: 'Close', value: 'close' },
            { label: 'Ranged', value: 'ranged' },
            { label: 'Siege', value: 'siege' },
            { label: 'Leader', value: 'leader' },
            { label: 'Agile', value: 'agile' },
          ]}
        />
        <Filter
          name="strength"
          handleOnChange={handleFilterOnChange}
          options={[
            { label: '1', value: '1' },
            { label: '2', value: '2' },
            { label: '3', value: '3' },
            { label: '4', value: '4' },
            { label: '5', value: '5' },
            { label: '6', value: '6' },
            { label: '7', value: '7' },
            { label: '8', value: '8' },
            { label: '9', value: '9' },
            { label: '10', value: '10' },
            { label: '11', value: '11' },
            { label: '12', value: '12' },
            { label: '13', value: '13' },
            { label: '14', value: '14' },
            { label: '15', value: '15' },
          ]}
        />
        <Filter
          name="effect"
          handleOnChange={handleFilterOnChange}
          options={[
            { label: 'Weather', value: 'weather' },
            { label: 'Decoy', value: 'decoy' },
            { label: "Commander's horn", value: "commander's horn" },
            { label: 'Scorch', value: 'scorch' },
            { label: 'Summon Avenger', value: 'summon avenger' },
            { label: 'Mardroeme', value: 'mardroeme' },
            { label: 'Berserker', value: 'berserker' },
          ]}
        />
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
  fetchCards: (filters) => dispatch(fetchCards(filters)),
})

export const Cards = connect(mapStateToProps, mapDispatchToProps)(CardsUI)
