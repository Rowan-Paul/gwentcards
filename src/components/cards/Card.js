import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Image } from 'cloudinary-react'

import { LocationsModal } from './locations/LocationsModal'
import { titleCase } from '../../utils'

function CardUI(props) {
  const [showLocationModal, setShowLocationModal] = useState(false)
  const [locationsCollected, setLocationsCollected] = useState(0)
  const [locationsAmount, setLocationsAmount] = useState(0)

  const placeIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24px"
      viewBox="0 0 24 24"
      width="24px"
      fill="#000000"
    >
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
    </svg>
  )

  const { card } = props
  const abilities = []

  card.abilities?.forEach((ability) => {
    abilities.push(titleCase(ability))
  })

  useEffect(() => {
    setLocationsAmount(card.locations?.length)
    let amount = 0

    card.locations.forEach((location) => {
      if (props.collectedCards?.includes(location._id)) {
        amount++
      }
    })

    setLocationsCollected(amount)
  }, [
    props.collectedCards,
    card.locations,
    locationsCollected,
    locationsAmount,
  ])

  return (
    <span>
      <LocationsModal
        showLocationModal={showLocationModal}
        setLocationModal={() => setShowLocationModal(!showLocationModal)}
        card={card}
      />
      <div className="dark:bg-gray-400 dark:text-black relative rounded my-5 bg-white shadow max-w-md min-w-full mx-auto border-2 z-0">
        <header className="p-2">
          <h3 className="text-lg font-bold">{titleCase(card.name)}</h3>
          <p className="text-sm text-gray-600">
            {titleCase(card.deck)}
            <br /> Strength: &nbsp;
            {card.strength ? card.strength : '-'}
          </p>
        </header>

        <section>
          <Image
            public-id={`/gwentcards/${encodeURIComponent(card.name)}`}
            width="205"
            height="387"
            fetchFormat="auto"
            crop="scale"
            loading="lazy"
            alt={`Card with ${card.name}`}
            style={{ margin: 'auto' }}
          />
          <p className="p-4">
            <span className="block">
              Row: {card.row ? titleCase(card.row) : '-'}
            </span>

            <span className="block">
              Effect: {card.effect ? titleCase(card.effect) : '-'}
            </span>

            <span className="block">
              Abilities: {card.abilities ? abilities.toString() : '-'}
            </span>
          </p>
        </section>

        <footer className="p-4">
          <span>&nbsp;</span>
          {/**Aligns the locations correctly */}

          <span
            className="h-6 w-6 float-right mr-5 mb-5 relative text-sm hover:underline cursor-pointer"
            onClick={() => setShowLocationModal(!showLocationModal)}
          >
            {placeIcon}
            <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1 py-0.5 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded">
              {`${locationsCollected}/${locationsAmount}`}
            </span>
          </span>
        </footer>
      </div>
    </span>
  )
}

const mapStateToProps = (state) => ({
  collectedCards: state.cards.collectedCards,
})

export const Card = connect(mapStateToProps, null)(CardUI)
