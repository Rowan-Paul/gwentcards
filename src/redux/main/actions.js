import * as types from './types'

// set notice
export const setNotice = (notice) => {
  return { type: types.ADDED_NOTICE, payload: notice }
}
