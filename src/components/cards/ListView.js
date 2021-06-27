import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'

import { titleCase } from '../../utils'

function ListViewUI(props) {
  const [cards, setCards] = useState([])

  useEffect(() => {
    if (cards.length !== props.selected?.length) {
      let temp = []
      let tempLocations = []

      props.selected.forEach((card) => {
        card.locations.forEach((location) => {
          // Creates a cardname with a # at the end
          // if there is already a card with that name
          let cardName = `${card.name}`

          let amount = 0
          for (let i = 0; i < tempLocations.length; i++) {
            if (tempLocations[i] === card.name) {
              amount++
            }
          }
          tempLocations.push(card.name)
          if (amount > 0) {
            cardName = `${card.name} ${
              location.location ? ' - ' + location.location : `#${amount + 1}`
            }`
          }

          temp.push(
            <div>
              <input
                type="checkbox"
                id={cardName}
                name={cardName}
                defaultChecked={false}
                className="mr-2 mb-2"
              />
              <label htmlFor={cardName}>{titleCase(cardName)}</label>
            </div>
          )
        })
      })
      if (temp.length > 0) setCards(temp)
    }
  }, [props.selected])

  return <div className="text-left m-auto w-1/2">{cards}</div>
}

const mapStateToProps = (state) => ({
  selected: state.cards.selected,
})

export const ListView = connect(mapStateToProps, null)(ListViewUI)
