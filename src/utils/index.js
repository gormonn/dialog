export function model(model = {}, actionMap) {
	return function(state = model, action) {
		const reduceFn = actionMap[action && action.type]
		if (reduceFn) {
			return reduceFn(state, action)
		}
		return state
	}
}

export function effects(actionFns) {
	return store => next => action => {
		if (action) {
			actionFns[action.type] && actionFns[action.type](store, action)
		}

		return next(action)
	}
}

export function now() {
	return new Date().toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, '$1$3')
}

export function randomInteger(min, max) {
	var rand = min + Math.random() * (max + 1 - min)
	rand = Math.floor(rand)
	return rand
}

export function shuffle(array) {
	var i = array.length,
		j = 0,
		temp

	while (i--) {
		j = Math.floor(Math.random() * (i + 1))

		// swap randomly chosen element with current element
		temp = array[i]
		array[i] = array[j]
		array[j] = temp
	}

	return array
}
