import React from 'react'
import { randomId } from '../../../utils'
import { LocationDesktop } from './LocationDesktop'
import { LocationMobile } from './LocationMobile'
import { titleCase } from '../../../utils'

function LocationsModalUI(props) {
  const locations = []
  const locationsMobile = []

  props.card.locations.forEach((location) => {
    locations.push(
      <LocationDesktop
        id={location._id}
        type={location.type}
        territory={location.territory}
        location={location.location}
        character={location.character}
        key={randomId()}
      />
    )
    locationsMobile.push(
      <LocationMobile
        id={location._id}
        type={location.type}
        territory={location.territory}
        location={location.location}
        character={location.character}
        key={randomId()}
      />
    )
  })

  return (
    <div
      className={`${
        props.showLocationModal ? 'fixed' : 'hidden'
      } z-10 inset-0 overflow-y-auto text-black`}
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          aria-hidden="true"
        ></div>

        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>

        <div className="min-w-3/4 md:min-w-0 inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3
                  className="text-lg leading-6 font-medium text-gray-900"
                  id="modal-title"
                >
                  Locations for {titleCase(props.card.name)}
                </h3>
                <div className="mt-2">
                  <table className="hidden md:table table-auto my-0 mx-auto">
                    <thead>
                      <tr className="bg-black text-white">
                        <td>Type</td>
                        <td>Territory</td>
                        <td>Location</td>
                        <td>Character</td>
                        <td>Collected</td>
                      </tr>
                    </thead>
                    <tbody>{locations}</tbody>
                  </table>
                  <span className="flex flex-wrap md:hidden">
                    {locationsMobile}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={() => props.setLocationModal()}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export const LocationsModal = LocationsModalUI
