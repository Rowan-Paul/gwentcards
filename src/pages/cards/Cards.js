import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { fetchCards, fetchUserCards } from '../../redux/cards/actions'
import { Card } from '../../components/card/Card'

import { DeckFilter } from '../../components/cardFilters/DeckFilter'
import { PageSizeFilter } from '../../components/cardFilters/PageSizeFilter'
import { AbilitiesFilter } from '../../components/cardFilters/AbilitiesFilter'
import { RowFilter } from '../../components/cardFilters/RowFilter'
import { StrengthFilter } from '../../components/cardFilters/StrengthFilter'
import { EffectFilter } from '../../components/cardFilters/EffectFilter'
import { ResetFilters } from '../../components/cardFilters/ResetFilters'

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
    props.fetchUserCards()
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    const startPage = page * pageSize
    const endPage = startPage + pageSize

    const selectedCards = props.selected.slice(startPage, endPage)

    setCards(selectedCards.map((card) => <Card card={card} key={card.name} />))
  }, [props.selected, page, pageSize])

  useEffect(() => {
    if (props.selected) {
      const pageAmount = Math.ceil(props.selected.length / pageSize)
      const tempArray = []

      for (let i = 0; i < pageAmount; i++) {
        let classes = 'mr-5 cursor-pointer inline-block'
        if (i === page) {
          classes = 'mr-5 cursor-pointer inline-block underline'
        }

        tempArray.push(
          <span
            onClick={(e) => setPage(i)}
            className={classes}
            key={`page${i}`}
          >
            {i + 1}
          </span>
        )
      }
      setPagination(tempArray)
    }
  }, [props.selected, pageSize, page])

  const handleReset = () => {
    const tempFilters = {
      deck: [],
      row: [],
      strength: [],
      abilities: [],
      effect: [],
    }
    setFilters(tempFilters)
    setReset(true)
    props.fetchCards(tempFilters)
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

  const handlePageSize = (e) => {
    setPageSize(e.target.value)
    setPage(0)
    setCards([])
    props.fetchCards(filters)
  }

  return (
    <div>
      <h2>Cards ({props.amount ? props.amount : '0'} cards)</h2>

      <div className="my-5 p-2 text-left grid md:grid-cols-3 lg:grid-cols-5">
        <PageSizeFilter handlePageSize={handlePageSize} />

        <DeckFilter handleFilterOnChange={handleFilterOnChange} reset={reset} />
        <AbilitiesFilter
          handleFilterOnChange={handleFilterOnChange}
          reset={reset}
        />
        <RowFilter handleFilterOnChange={handleFilterOnChange} reset={reset} />
        <StrengthFilter
          handleFilterOnChange={handleFilterOnChange}
          reset={reset}
        />
        <EffectFilter handleFilterOnChange={handleFilterOnChange} />

        <ResetFilters handleReset={handleReset} />
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
  signedIn: state.auth.signedIn,
})

const mapDispatchToProps = (dispatch) => ({
  fetchCards: (filters) => dispatch(fetchCards(filters)),
  fetchUserCards: () => dispatch(fetchUserCards()),
})

export const Cards = connect(mapStateToProps, mapDispatchToProps)(CardsUI)