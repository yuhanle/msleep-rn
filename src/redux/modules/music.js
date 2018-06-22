import {createAction, handleActions} from 'redux-actions'

const FETCH_MUSIC_SUCCESS = 'FETCH_MUSIC_SUCCESS'

const initialState = {}

export const fetchMusicSuccess = createAction(FETCH_MUSIC_SUCCESS)

export default musicReducer = handleActions({
  [FETCH_MUSIC_SUCCESS] (state, action) {
    return {
      ...state,
      ...action.payload
    }
  }
}, initialState)
