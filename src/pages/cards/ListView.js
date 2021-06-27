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
  const [collectedScoiatael, setCollectedScoiatael] = useState(0)
  const [collectedNilfgaard, setCollectedNilfgaard] = useState(0)
  const [collectedNorthernRealms, setCollectedNorthernRealms] = useState(0)
  const [collectedMonsters, setCollectedMonsters] = useState(0)
  const [collectedSkellige, setCollectedSkellige] = useState(0)
  const [collectedNeutral, setCollectedNeutral] = useState(0)

  useEffect(() => {
    if (cards.length !== props.selected?.length) {
      setNilfgaard([])
      setSkellige([])
      setNorthernRealms([])
      setMonsters([])
      setScoiatael([])
      setNeutral([])
      setCollectedScoiatael(0)
      setCollectedNilfgaard(0)
      setCollectedNorthernRealms(0)
      setCollectedMonsters(0)
      setCollectedSkellige(0)
      setCollectedNeutral(0)

      props.selected.forEach((card) => {
        card.locations.forEach((location) => {
          let tempLocations = []
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
              if (props.collectedCards?.includes(location._id)) {
                setCollectedNilfgaard(collectedNilfgaard + 1)
              }

              setNilfgaard((oldArray) => [
                ...oldArray,
                <div key={cardName + randomId()} className="mb-2 last:mb-0">
                  <input
                    type="checkbox"
                    id={cardName}
                    name={cardName}
                    checked={
                      props.collectedCards?.includes(location._id)
                        ? true
                        : false
                    }
                    onChange={() =>
                      props.collectedCards?.includes(location._id)
                        ? props.uncollectCard(location._id)
                        : props.collectCard(location._id)
                    }
                    className="mr-2"
                  />
                  <label htmlFor={cardName}>{titleCase(cardName)}</label>
                </div>,
              ])
              break

            case "scoia'tael":
              if (props.collectedCards?.includes(location._id)) {
                setCollectedScoiatael(collectedScoiatael + 1)
              }

              setScoiatael((oldArray) => [
                ...oldArray,
                <div key={cardName + randomId()} className="mb-2 last:mb-0">
                  <input
                    type="checkbox"
                    id={cardName}
                    name={cardName}
                    checked={
                      props.collectedCards?.includes(location._id)
                        ? true
                        : false
                    }
                    onChange={() =>
                      props.collectedCards?.includes(location._id)
                        ? props.uncollectCard(location._id)
                        : props.collectCard(location._id)
                    }
                    className="mr-2"
                  />
                  <label htmlFor={cardName}>{titleCase(cardName)}</label>
                </div>,
              ])
              break

            case 'skellige':
              if (props.collectedCards?.includes(location._id)) {
                setCollectedSkellige(collectedSkellige + 1)
              }

              setSkellige((oldArray) => [
                ...oldArray,
                <div key={cardName + randomId()} className="mb-2 last:mb-0">
                  <input
                    type="checkbox"
                    id={cardName}
                    name={cardName}
                    checked={
                      props.collectedCards?.includes(location._id)
                        ? true
                        : false
                    }
                    onChange={() =>
                      props.collectedCards?.includes(location._id)
                        ? props.uncollectCard(location._id)
                        : props.collectCard(location._id)
                    }
                    className="mr-2"
                  />
                  <label htmlFor={cardName}>{titleCase(cardName)}</label>
                </div>,
              ])
              break

            case 'monsters':
              if (props.collectedCards?.includes(location._id)) {
                setCollectedMonsters(collectedMonsters + 1)
              }

              setMonsters((oldArray) => [
                ...oldArray,
                <div key={cardName + randomId()} className="mb-2 last:mb-0">
                  <input
                    type="checkbox"
                    id={cardName}
                    name={cardName}
                    checked={
                      props.collectedCards?.includes(location._id)
                        ? true
                        : false
                    }
                    onChange={() =>
                      props.collectedCards?.includes(location._id)
                        ? props.uncollectCard(location._id)
                        : props.collectCard(location._id)
                    }
                    className="mr-2"
                  />
                  <label htmlFor={cardName}>{titleCase(cardName)}</label>
                </div>,
              ])
              break

            case 'northern realms':
              if (props.collectedCards?.includes(location._id)) {
                setCollectedNorthernRealms(collectedMonsters + 1)
              }

              setNorthernRealms((oldArray) => [
                ...oldArray,
                <div key={cardName + randomId()} className="mb-2 last:mb-0">
                  <input
                    type="checkbox"
                    id={cardName}
                    name={cardName}
                    checked={
                      props.collectedCards?.includes(location._id)
                        ? true
                        : false
                    }
                    onChange={() =>
                      props.collectedCards?.includes(location._id)
                        ? props.uncollectCard(location._id)
                        : props.collectCard(location._id)
                    }
                    className="mr-2"
                  />
                  <label htmlFor={cardName}>{titleCase(cardName)}</label>
                </div>,
              ])
              break

            case 'neutral':
              if (props.collectedCards?.includes(location._id)) {
                setCollectedNeutral(collectedNeutral + 1)
              }

              setNeutral((oldArray) => [
                ...oldArray,
                <div key={cardName + randomId()} className="mb-2 last:mb-0">
                  <input
                    type="checkbox"
                    id={cardName}
                    name={cardName}
                    checked={
                      props.collectedCards?.includes(location._id)
                        ? true
                        : false
                    }
                    onChange={() =>
                      props.collectedCards?.includes(location._id)
                        ? props.uncollectCard(location._id)
                        : props.collectCard(location._id)
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
    <div>
      <p className="text-left text-sm mt-1">
        {props.amount ? `Showing ${props.amount} cards` : 'No cards found'}
      </p>
      <div
        className={`${
          props.filters.listView ? 'inherit' : 'hidden'
        } text-left grid md:grid-cols-2 lg:grid-cols-3 gap-5`}
      >
        <div>
          <h3>Nilfgaard ({`${collectedNilfgaard}/${nilfgaard.length}`})</h3>
          {nilfgaard}
        </div>
        <div>
          <h3>
            Scoia&apos;tael ({`${collectedScoiatael}/${scoiatael.length}`})
          </h3>
          {scoiatael}
        </div>
        <div>
          <h3>Skellige ({`${collectedSkellige}/${skellige.length}`})</h3>
          {skellige}
        </div>
        <div>
          <h3>Monsters ({`${collectedMonsters}/${monsters.length}`})</h3>
          {monsters}
        </div>
        <div>
          <h3>
            Northern Realms (
            {`${collectedNorthernRealms}/${northernRealms.length}`})
          </h3>
          {northernRealms}
        </div>
        <div>
          <h3>Neutral ({`${collectedNeutral}/${neutral.length}`})</h3>
          {neutral}
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  selected: state.cards.selected,
  collectedCards: state.cards.collectedCards,
  filters: state.cards.filters,
  amount: state.cards.amount,
})

const mapDispatchToProps = (dispatch) => ({
  collectCard: (card) => dispatch(collectCard(card)),
  uncollectCard: (card) => dispatch(uncollectCard(card)),
})

export const ListView = connect(mapStateToProps, mapDispatchToProps)(ListViewUI)
