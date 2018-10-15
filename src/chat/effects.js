import { effects, randomInteger } from '../utils'
import { NEW_GAME, START } from '../const'
import { sendMessage } from './actions'
import _ from 'lodash'

const newMessage = (text, author, i, stage) => ({ text, author, i, stage })
//const randomKey = (obj, stage) => (obj.hasOwnProperty(stage) && obj[stage].length > 0 ? randomInteger(0, obj[stage].length - 1) : 0)
const randomKey = (obj, stage) => {
	//const unusedMessages = _.filter(obj[stage], { used: false })
	/*
	console.log('unusedMessages', unusedMessages)
	if (unusedMessages.length > 0) {
		return randomInteger(0, unusedMessages.length - 1)
	} else if (obj[stage].length > 0) {
		console.log('rand2', ...obj[stage])
		return randomInteger(0, obj[stage].length - 1)
	}*/
	const randKey = randomInteger(0, obj[stage].length - 1)
	//console.log()
	return randKey
}
const getRandomMessage = (obj, stage, i = randomKey(obj, stage)) =>
	obj.hasOwnProperty(stage) ? newMessage(obj[stage][i].text, obj.author, i, stage) : newMessage('Текст не найден!', 'Ошибка!')

const getRandomMessage2

export default effects({
	[NEW_GAME]({ getState, dispatch }) {
		const message = getRandomMessage2(getState().dialog.A, START)
		dispatch(sendMessage(message))
	}
})
