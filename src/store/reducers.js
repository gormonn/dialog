import { combineReducers } from 'redux'
import chat from '../chat/model'
import dialog from '../dialog/model'

let commonReducers = {
	chat,
	dialog
}

const reducer = combineReducers(commonReducers)
export default reducer
