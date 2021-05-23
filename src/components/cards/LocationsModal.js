import { connect } from 'react-redux'

import { setLocationModal } from '../../redux/cards/actions'

function LocationsModalUI(props) {
  const crossIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24px"
      viewBox="0 0 24 24"
      width="24px"
      fill="#000000"
    >
      <path d="M0 0h24v24H0V0z" fill="none" />
      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
    </svg>
  )
  let locations = []

  props.card.locations.forEach((location) => {
    locations.push(
      <p key={Math.random().toString(36).substr(2, 9)}>Type: {location.type}</p>
    )
  })

  return (
    <div
      className={`${
        props.showLocationModal ? 'fixed' : 'hidden'
      } inset-0 mx-5 lg:mx-72 my-20 p-5 overflow-auto rounded bg-white shadow border-2`}
    >
      <span
        className="block text-center ml-5 float-right cursor-pointer sticky top-0 right-0"
        onClick={() => props.setLocationModal()}
      >
        {crossIcon}
      </span>

      <div className="block p-5">
        <h1>Locations</h1>
        {locations}
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  showLocationModal: state.cards.showLocationModal,
})

const mapDispatchToProps = (dispatch) => ({
  setLocationModal: () => dispatch(setLocationModal()),
})

export const LocationsModal = connect(
  mapStateToProps,
  mapDispatchToProps
)(LocationsModalUI)
