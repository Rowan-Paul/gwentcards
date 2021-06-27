import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'

import { titleCase, randomId } from '../../utils'
import { collectCard, uncollectCard } from '../../redux/cards/actions'

function ListViewUI(props) {
  const [nilfgaard, setNilfgaard] = useState([])
  const [skellige, setSkellige] = useState([])
  const [northernRealms, setNorthernRealms] = useState([])
  const [monsters, setMonsters] = useState([])
  const [scoiatael, setScoiatael] = useState([])
  const [neutral, setNeutral] = useState([])

  useEffect(() => {
    if (cards.length !== props.selected?.length) {
      setNilfgaard([])
      setSkellige([])
      setNorthernRealms([])
      setMonsters([])
      setScoiatael([])
      setNeutral([])

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
                <div key={cardName + randomId()} className="mb-2 last:mb-0">
                  <input
                    type="checkbox"
                    id={cardName}
                    name={cardName}
                    checked={
                      props.collectedCards?.includes(card._id) ? true : false
                    }
                    onChange={() =>
                      props.collectedCards?.includes(card._id)
                        ? props.uncollectCard(card._id)
                        : props.collectCard(card._id)
                    }
                    className="mr-2"
                  />
                  <label htmlFor={cardName}>{titleCase(cardName)}</label>
                </div>,
              ])
              break

            case "scoia'tael":
              setScoiatael((oldArray) => [
                ...oldArray,
                <div key={cardName + randomId()} className="mb-2 last:mb-0">
                  <input
                    type="checkbox"
                    id={cardName}
                    name={cardName}
                    checked={
                      props.collectedCards?.includes(card._id) ? true : false
                    }
                    onChange={() =>
                      props.collectedCards?.includes(card._id)
                        ? props.uncollectCard(card._id)
                        : props.collectCard(card._id)
                    }
                    className="mr-2"
                  />
                  <label htmlFor={cardName}>{titleCase(cardName)}</label>
                </div>,
              ])
              break

            case 'skellige':
              setSkellige((oldArray) => [
                ...oldArray,
                <div key={cardName + randomId()} className="mb-2 last:mb-0">
                  <input
                    type="checkbox"
                    id={cardName}
                    name={cardName}
                    checked={
                      props.collectedCards?.includes(card._id) ? true : false
                    }
                    onChange={() =>
                      props.collectedCards?.includes(card._id)
                        ? props.uncollectCard(card._id)
                        : props.collectCard(card._id)
                    }
                    className="mr-2"
                  />
                  <label htmlFor={cardName}>{titleCase(cardName)}</label>
                </div>,
              ])
              break

            case 'monsters':
              setMonsters((oldArray) => [
                ...oldArray,
                <div key={cardName + randomId()} className="mb-2 last:mb-0">
                  <input
                    type="checkbox"
                    id={cardName}
                    name={cardName}
                    checked={
                      props.collectedCards?.includes(card._id) ? true : false
                    }
                    onChange={() =>
                      props.collectedCards?.includes(card._id)
                        ? props.uncollectCard(card._id)
                        : props.collectCard(card._id)
                    }
                    className="mr-2"
                  />
                  <label htmlFor={cardName}>{titleCase(cardName)}</label>
                </div>,
              ])
              break

            case 'northern realms':
              setNorthernRealms((oldArray) => [
                ...oldArray,
                <div key={cardName + randomId()} className="mb-2 last:mb-0">
                  <input
                    type="checkbox"
                    id={cardName}
                    name={cardName}
                    checked={
                      props.collectedCards?.includes(card._id) ? true : false
                    }
                    onChange={() =>
                      props.collectedCards?.includes(card._id)
                        ? props.uncollectCard(card._id)
                        : props.collectCard(card._id)
                    }
                    className="mr-2"
                  />
                  <label htmlFor={cardName}>{titleCase(cardName)}</label>
                </div>,
              ])
              break

            case 'neutral':
              setNeutral((oldArray) => [
                ...oldArray,
                <div key={cardName + randomId()} className="mb-2 last:mb-0">
                  <input
                    type="checkbox"
                    id={cardName}
                    name={cardName}
                    checked={
                      props.collectedCards?.includes(card._id) ? true : false
                    }
                    onChange={() =>
                      props.collectedCards?.includes(card._id)
                        ? props.uncollectCard(card._id)
                        : props.collectCard(card._id)
                    }
                    className="mr-2"
                  />
                  <label htmlFor={cardName}>{titleCase(cardName)}</label>
                </div>,
              ])
              break
          }
        })
      })
    }
  }, [props.selected, props.collectedCards])

  return (
    <div
      className={`${
        props.filters.listView ? 'inherit' : 'hidden'
      } text-left grid md:grid-cols-2 lg:grid-cols-3 gap-5`}
    >
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
      <div>
        <h3>Neutral ({neutral.length})</h3>
        {neutral}
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  selected: state.cards.selected,
  collectedCards: state.cards.collectedCards,
  filters: state.cards.filters,
})

const mapDispatchToProps = (dispatch) => ({
  collectCard: (card) => dispatch(collectCard(card)),
  uncollectCard: (card) => dispatch(uncollectCard(card)),
})

export const ListView = connect(mapStateToProps, mapDispatchToProps)(ListViewUI)
