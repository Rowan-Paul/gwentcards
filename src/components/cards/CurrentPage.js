import { useEffect, useState } from 'react'
import { connect } from 'react-redux'

import { Card } from '../card/Card'

function CurrentPageUI(props) {
  const [cards, setCards] = useState([])

  useEffect(() => {
    const startPage = props.page * props.pageSize
    const endPage = startPage + props.pageSize

    const selectedCards = props.selected.slice(startPage, endPage)

    setCards(selectedCards.map((card) => <Card card={card} key={card.name} />))
  }, [props.selected, props.page, props.pageSize])

  return <div className="grid md:grid-cols-2 lg:grid-cols-4">{cards}</div>
}

const mapStateToProps = (state) => ({
  selected: state.cards.selected,
  pageSize: state.cards.pageSize,
  page: state.cards.page,
})

const mapDispatchToProps = (dispatch) => ({})

export const CurrentPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(CurrentPageUI)
