import React, { useEffect, useState, Fragment } from 'react'
import { connect } from 'react-redux'

import { Card } from './Card'
import { Pagination } from './Pagination'

function GridViewUI(props) {
  const [cards, setCards] = useState([])

  useEffect(() => {
    const pageSize = parseInt(props.pageSize)

    const startPage = props.page * pageSize
    const endPage = startPage + pageSize

    const selectedCards = props.selected?.slice(startPage, endPage)

    setCards(selectedCards?.map((card) => <Card card={card} key={card.name} />))
  }, [props.selected, props.page, props.pageSize])

  return (
    <Fragment>
      <Pagination />
      <div>
        <p className="text-left text-sm mt-1">
          {props.amount
            ? `Showing ${cards.length}/${props.amount} cards`
            : 'No cards found'}
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-4">{cards}</div>
      </div>
      <Pagination />
    </Fragment>
  )
}

const mapStateToProps = (state) => ({
  selected: state.cards.selected,
  pageSize: state.cards.pageSize,
  page: state.cards.page,
  reset: state.cards.reset,
  amount: state.cards.amount,
})

export const GridView = connect(mapStateToProps, null)(GridViewUI)
