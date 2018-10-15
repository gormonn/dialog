import { NEW_GAME, NEW_MESSAGE } from '../../const'

export function newGame() {
	return {
		type: NEW_GAME
	}
}

export function sendMessage(props) {
	const { text, author, ...rest } = props || {}
	//console.log('sendMessage', { text, author, ...rest })
	return {
		type: NEW_MESSAGE,
		text,
		author,
		...rest
	}
}
