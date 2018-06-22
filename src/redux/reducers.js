import { combineReducers } from 'redux'
import userReducer from './modules/user'
import musicReducer from './modules/music'

const rootReducer = combineReducers({
	user: userReducer,
	music: musicReducer
})

export default rootReducer