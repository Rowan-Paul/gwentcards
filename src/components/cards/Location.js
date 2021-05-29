import { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import { titleCase } from '../../utils'
import { collectCard, uncollectCard } from '../../redux/cards/actions'

function LocationUI(props) {
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
    <tr>
      <td>{titleCase(props.type)}</td>
      <td>{titleCase(props.territory ? props.territory : '')}</td>
      <td>{titleCase(props.location ? props.location : '')}</td>
      <td>{titleCase(props.character ? props.character : '')}</td>
      <td>{isCollected ? collectedIcon : plusIcon}</td>
    </tr>
  )
}

const mapStateToProps = (state) => ({
  collectedCards: state.cards.collectedCards,
})

const mapDispatchToProps = (dispatch) => ({
  collectCard: (card) => dispatch(collectCard(card)),
  uncollectCard: (card) => dispatch(uncollectCard(card)),
})

export const Location = connect(mapStateToProps, mapDispatchToProps)(LocationUI)
