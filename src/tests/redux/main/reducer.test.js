import { mainReducer } from '../../../redux/main/reducer'
import * as types from '../../../redux/main/types'

describe('Main reducer', () => {
  const INITIAL_STATE = {
    notice: {
      message: null,
      type: null,
    },
  }

  it('Should return the initial state', () => {
    expect(mainReducer(undefined, {})).toEqual(INITIAL_STATE)
  })

  it('Should handle ADDED_NOTICE', () => {
    const dispatchedData = {
      type: types.ADDED_NOTICE,
      payload: {
        message: 'Email has been verified',
        type: 'success',
      },
    }

    expect(mainReducer([], dispatchedData)).toEqual({
      notice: {
        message: 'Email has been verified',
        type: 'success',
      },
    })
  })
})
