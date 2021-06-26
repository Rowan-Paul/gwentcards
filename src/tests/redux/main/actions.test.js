import * as actionTypes from '../../../redux/main/actions'
import * as types from '../../../redux/main/types'

describe('Main actions', () => {
  it('Creates a ADDED_NOTICE action', () => {
    const parameters = {
      message: 'Email has been verified',
      type: 'success',
    }
    const expected = {
      type: types.ADDED_NOTICE,
      payload: {
        message: 'Email has been verified',
        type: 'success',
      },
    }

    expect(actionTypes.setNotice(parameters)).toEqual(expected)
  })
})
