import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'

import { titleCase, randomId } from '../../utils'

function ListViewUI(props) {
  const [nilfgaard, setNilfgaard] = useState([])
  const [skellige, setSkellige] = useState([])
  const [northernRealms, setNorthernRealms] = useState([])
  const [monsters, setMonsters] = useState([])
  const [scoiatael, setScoiatael] = useState([])

  useEffect(() => {
    if (cards.length !== props.selected?.length) {
      setNilfgaard([])
      setSkellige([])
      setNorthernRealms([])
      setMonsters([])
      setScoiatael([])

      props.selected.forEach((card) => {
        let tempLocations = []
        card.locations.forEach((location) => {
          // Creates a cardname with a # at the end
          // if there is already a card with that name
          // and no location for the card
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

          switch (card.deck) {
            case 'nilfgaard':
              setNilfgaard((oldArray) => [
                ...oldArray,
                <div key={cardName + randomId}>
                  <input
                    type="checkbox"
                    id={cardName}
                    name={cardName}
                    defaultChecked={false}
                    className="mr-2 mb-2"
                  />
                  <label htmlFor={cardName}>{titleCase(cardName)}</label>
                </div>,
              ])
              break

            case "scoia'tael":
              setScoiatael((oldArray) => [
                ...oldArray,
                <div key={cardName + randomId}>
                  <input
                    type="checkbox"
                    id={cardName}
                    name={cardName}
                    defaultChecked={false}
                    className="mr-2 mb-2"
                  />
                  <label htmlFor={cardName}>{titleCase(cardName)}</label>
                </div>,
              ])
              break

            case 'skellige':
              setSkellige((oldArray) => [
                ...oldArray,
                <div key={cardName + randomId}>
                  <input
                    type="checkbox"
                    id={cardName}
                    name={cardName}
                    defaultChecked={false}
                    className="mr-2 mb-2"
                  />
                  <label htmlFor={cardName}>{titleCase(cardName)}</label>
                </div>,
              ])
              break

            case 'monsters':
              setMonsters((oldArray) => [
                ...oldArray,
                <div key={cardName + randomId}>
                  <input
                    type="checkbox"
                    id={cardName}
                    name={cardName}
                    defaultChecked={false}
                    className="mr-2 mb-2"
                  />
                  <label htmlFor={cardName}>{titleCase(cardName)}</label>
                </div>,
              ])
              break

            case 'northern realms':
              setNorthernRealms((oldArray) => [
                ...oldArray,
                <div key={cardName + randomId}>
                  <input
                    type="checkbox"
                    id={cardName}
                    name={cardName}
                    defaultChecked={false}
                    className="mr-2 mb-2"
                  />
                  <label htmlFor={cardName}>{titleCase(cardName)}</label>
                </div>,
              ])
              break
          }
        })
      })
    }
  }, [props.selected])

  return (
    <div className="text-left grid md:grid-cols-2 lg:grid-cols-3 gap-5">
      <div>
        <h3>Nilfgaard ({nilfgaard.length})</h3>
        {nilfgaard}
      </div>
      <div>
        <h3>Scoia&apos;tael ({scoiatael.length})</h3>
        {scoiatael}
      </div>
      <div>
        <h3>Skellige ({skellige.length})</h3>
        {skellige}
      </div>
      <div>
        <h3>Monsters ({monsters.length})</h3>
        {monsters}
      </div>
      <div>
        <h3>Northern Realms ({northernRealms.length})</h3>
        {northernRealms}
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  selected: state.cards.selected,
})

export const ListView = connect(mapStateToProps, null)(ListViewUI)
