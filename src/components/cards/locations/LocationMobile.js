import { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import { titleCase } from '../../../utils'
import { collectCard, uncollectCard } from '../../../redux/cards/actions'

function LocationMobileUI(props) {
  const [isCollected, setIsCollected] = useState(false)
  const plusIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24px"
      viewBox="0 0 24 24"
      width="24px"
      fill="#000000"
      className="mx-auto my-0 cursor-pointer"
      onClick={() => props.collectCard(props.id)}
    >
      <path d="M0 0h24v24H0V0z" fill="none" />
      <path d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
    </svg>
  )
  const collectedIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24px"
      viewBox="0 0 24 24"
      width="24px"
      fill="#000000"
      className="mx-auto my-0 cursor-pointer"
      onClick={() => props.uncollectCard(props.id)}
    >
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
    </svg>
  )

  useEffect(() => {
    if (props.collectedCards?.includes(props.id)) {
      setIsCollected(true)
    }
  }, [props.id, props.collectedCards])

  return (
    <div className="block md:hidden rounded my-5 bg-white shadow  mx-auto border-2 z-0">
      <header className="p-2">Location</header>

      <section className="text-left p-5">
        <p>
          <span className="font-bold">Type: </span>
          <br></br>
          {titleCase(props.type)}
        </p>

        <p>
          <span className={`${props.territory ? '' : 'hidden'} font-bold`}>
            Territory:{' '}
          </span>
          <br></br>
          {titleCase(props.territory ? props.territory : '')}
        </p>

        <p>
          <span className={`${props.location ? '' : 'hidden'} font-bold`}>
            Location:{' '}
          </span>
          <br></br>
          {titleCase(props.location ? props.location : '')}
        </p>

        <p>
          <span className={`${props.character ? '' : 'hidden'} font-bold`}>
            Character:{' '}
          </span>
          <br></br>
          {titleCase(props.character ? props.character : '')}
        </p>

        <p>{isCollected ? collectedIcon : plusIcon}</p>
      </section>
    </div>
  )
}

const mapStateToProps = (state) => ({
  collectedCards: state.cards.collectedCards,
})

const mapDispatchToProps = (dispatch) => ({
  collectCard: (card) => dispatch(collectCard(card)),
  uncollectCard: (card) => dispatch(uncollectCard(card)),
})

export const LocationMobile = connect(
  mapStateToProps,
  mapDispatchToProps
)(LocationMobileUI)
