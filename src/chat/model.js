import { model, now } from '../utils'
import uniqid from 'uniqid'
import { NEW_MESSAGE, NEW_GAME, ITEM_GENERATE } from '../const'

const HistoryMessage = ({ text, author }) => [{ time: now(), text, author }]
export const reducer = model(
	{
		history: [],
		agrro: 0
	},
	{
		[NEW_MESSAGE](state, { text, author }) {
			//console.log(author)
			return { ...state, history: HistoryMessage({ text, author: author.name, id: uniqid() }) }
		},
		[ITEM_GENERATE](state, { size }) {
			return { ...state, array: size }
		}
	}
)

export default reducer
