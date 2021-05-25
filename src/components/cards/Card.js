import { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Image } from 'cloudinary-react'

import { LocationsModal } from './LocationsModal'
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
  const heartIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24px"
      viewBox="0 0 24 24"
      width="24px"
      fill="#000000"
      className="h-6 w-6 float-right mr-3 mb-5 cursor-pointer"
    >
      <path d="M0 0h24v24H0V0z" fill="none" />
      <path d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z" />
    </svg>
  )

  const card = props.card
  let abilities = []

  card.abilities?.forEach((ability) => {
    abilities.push(titleCase(ability))
  })

  useEffect(() => {
    setLocationsAmount(card.locations?.length)
    let amount = 0

    card.locations.forEach((location) => {
      if (props.collectedCards.includes(location._id)) {
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
      <div className="relative rounded my-5 bg-white shadow max-w-md min-w-full mx-auto border-2 z-0">
        <header className="p-2">
          <h3 className="text-lg font-bold">{titleCase(card.name)}</h3>
          <p className="text-sm text-gray-600">
            {titleCase(card.deck)}
            <br></br> Strength: &nbsp;
            {card.strength ? card.strength : '-'}
          </p>
        </header>

        <section>
          <Image
            public-id={'/gwentcards/' + encodeURIComponent(card.name)}
            width="205"
            height="387"
            fetchFormat="auto"
            crop="scale"
            loading="lazy"
            alt={'Card with ' + card.name}
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
          <span className="text-sm hover:underline mr-5 cursor-pointer">
            Notes
          </span>

          {heartIcon}
          <span
            className="h-6 w-6 float-right mr-5 mb-5 relative text-sm hover:underline cursor-pointer"
            onClick={() => setShowLocationModal(!showLocationModal)}
          >
            {placeIcon}
            <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1 py-0.5 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded">
              {locationsCollected + '/' + locationsAmount}
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

const mapDispatchToProps = (dispatch) => ({})

export const Card = connect(mapStateToProps, mapDispatchToProps)(CardUI)
