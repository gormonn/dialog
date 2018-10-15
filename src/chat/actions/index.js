import { NEW_GAME, NEW_MESSAGE } from '../../const'

export function newGame() {
	return {
		type: NEW_GAME
	}
}

export function sendMessage({ text, author, ...rest }) {
	//console.log('sendMessage', { text, author, ...rest })
	return {
		type: NEW_MESSAGE,
		text,
		author,
		...rest
	}
}
