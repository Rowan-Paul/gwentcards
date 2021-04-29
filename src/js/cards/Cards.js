import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { fetchCards } from '../redux/cards/actions'
import { Card } from './components/Card'
import ReactPaginate from 'react-paginate'

function CardsUI(props) {
  const [offset, setOffset] = useState(0)
  const [data, setData] = useState([])
  const [perPage] = useState(20)
  const [pageCount, setPageCount] = useState(0)

  useEffect(() => {
    props.fetchCards()
    // eslint-disable-next-line
  }, [])

  const getData = async () => {
    const data = props.selected
    const slice = data.slice(offset, offset + perPage)
    const postData = slice.map((card) => <Card card={card} key={card.name} />)
    setData(postData)
    setPageCount(Math.ceil(data.length / perPage))
  }

  const handlePageClick = (e) => {
    const selectedPage = e.selected
    setOffset(selectedPage + 1)
  }

  // const handleDeckSelected = (e) => {
  //   const deck = e.target.value
  //   console.log(deck)
  //   props.fetchCards(deck)
  // }

  useEffect(() => {
    getData()
    // eslint-disable-next-line
  }, [offset, props.selected])

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
          // onChange={handleDeckSelected}
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
          ? 'Showing ' + data.length + '/' + props.amount + ' cards'
          : 'No cards found'}
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-4">{data}</div>
      <ReactPaginate
        previousLabel={'prev'}
        nextLabel={'next'}
        breakLabel={'...'}
        breakClassName={'break-me'}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={'pagination'}
        subContainerClassName={'pages pagination'}
        activeClassName={'active'}
      />
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
