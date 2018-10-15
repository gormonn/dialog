import { applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import chat from '../chat/effects'
import dialog from '../dialog/effects'
const commonMiddlewares = [thunk, chat, dialog]

export default applyMiddleware(...commonMiddlewares)
