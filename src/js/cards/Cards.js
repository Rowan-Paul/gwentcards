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
  const [reset, setReset] = useState(false)

  useEffect(() => {
    props.fetchCards(filters)
  }, [filters, props])

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

  const handleReset = () => {
    setFilters({
      deck: [],
      row: [],
      strength: [],
      abilities: [],
      effect: [],
    })
    setReset(true)
  }

  const handleFilterOnChange = (filter) => {
    setCards([])
    setPage(0)
    setReset(false)

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
          reset={reset}
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
          reset={reset}
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
          reset={reset}
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
          reset={reset}
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
          reset={reset}
        />

        <span
          className="mb-3 md:mb-0 lg:mb-3 grid-row-auto place-self-center"
          onClick={handleReset}
        >
          <button className="text-white px-4 w-auto h-10 bg-red-600 rounded-full hover:bg-red-700 active:shadow-lg mouse shadow transition ease-in duration-200 focus:outline-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              enableBackground="new 0 0 24 24"
              height="24px"
              viewBox="0 0 24 24"
              width="24px"
              fill="#FFFFFF"
              className="w-6 h-6 inline-block mr-1"
            >
              <g>
                <path d="M0,0h24v24H0V0z" fill="none" />
              </g>
              <g>
                <g>
                  <path d="M12,5V2L8,6l4,4V7c3.31,0,6,2.69,6,6c0,2.97-2.17,5.43-5,5.91v2.02c3.95-0.49,7-3.85,7-7.93C20,8.58,16.42,5,12,5z" />
                  <path d="M6,13c0-1.65,0.67-3.15,1.76-4.24L6.34,7.34C4.9,8.79,4,10.79,4,13c0,4.08,3.05,7.44,7,7.93v-2.02 C8.17,18.43,6,15.97,6,13z" />
                </g>
              </g>
            </svg>
            <span>Reset</span>
          </button>
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
  fetchCards: (filters) => dispatch(fetchCards(filters)),
})

export const Cards = connect(mapStateToProps, mapDispatchToProps)(CardsUI)
