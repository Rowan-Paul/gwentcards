import createMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import * as actionTypes from '../../../redux/cards/actions'
import * as types from '../../../redux/cards/types'

const mws = [thunk]
const mockStore = createMockStore(mws)
const store = mockStore({})

describe('Cards actions', () => {
  beforeEach(() => {
    store.clearActions()
  })

  it('Dispatches FETCHED_COLLECTED_CARDS', () => {
    expect.assertions(2)

    const expectedResponse = {
      amount: 20,
      collected: [],
    }
    const mResponse = {
      json: jest.fn().mockResolvedValueOnce(expectedResponse),
      status: 200,
    }
    global.fetch = jest.fn().mockResolvedValueOnce(mResponse)

    const expectedActions = [
      {
        type: types.FETCHED_COLLECTED_CARDS,
        payload: expectedResponse,
      },
    ]

    return store.dispatch(actionTypes.fetchCollectedCards()).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
      expect(global.fetch).toBeCalledWith('/api/v1/users/cards')
    })
  })

  it('Creates PAGE_SIZE_SET action', () => {
    const parameters = 200
    const expected = {
      type: types.PAGE_SIZE_SET,
      payload: parameters,
    }

    expect(actionTypes.setPageSize(parameters)).toEqual(expected)
  })

  it('Creates FILTERS_SET action', () => {
    const parameters = { afilter: 20 }
    const expected = {
      type: types.FILTERS_SET,
      payload: parameters,
    }

    expect(actionTypes.setFilters(parameters)).toEqual(expected)
  })

  it('Creates PAGE_SET action', () => {
    const parameters = 1
    const expected = {
      type: types.PAGE_SET,
      payload: parameters,
    }

    expect(actionTypes.setPage(parameters)).toEqual(expected)
  })

  it('Creates RESET action', () => {
    const parameters = true
    const expected = {
      type: types.RESET,
      payload: parameters,
    }

    expect(actionTypes.setReset(parameters)).toEqual(expected)
  })

  it('Creates REMOVED_CARDS action', () => {
    const expected = {
      type: types.REMOVED_CARDS,
    }

    expect(actionTypes.removeCards()).toEqual(expected)
  })
})
