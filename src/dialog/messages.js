import {
	NORMAL,
	AGGRO,
	UPPERCASE,
	UNDERSCORE,
	UNDERSCORE_ALL,
	GAME_OVER,
	GAME_WIN,
	A,
	B,
	COMMON,
	START,
	HAVE_WE_SOURCES,
	CAN_WE_REVIEW_SOURCES,
	HAVENT_SOURCES,
	WE_CANT_REVIEW_SOURCES,
	RETRY,
	RETRY_REPLY
} from '../const'
import { shuffle } from '../utils'

const Mods = (...mods) => ({ mods })
const Actions = (...actions) => ({ actions })

const Indexed = (index, props) => ({
	[index]: {
		index,
		...props
	}
})

const NewMessage = (text = '', ...props) => {
	const _props = Object.assign({}, ...props)
	const { mods = [NORMAL], ...rest } = _props
	return {
		used: false,
		text,
		mods,
		...rest
	}
}

const NewAuthor = (author, stages) => Indexed(author, { ...stages })
const NewStage = (stage, ...messages) =>
	Indexed(stage, {
		...messages,
		random_ids: shuffle(Object.keys(messages)),
		used_ids: []
	})
const C = 'C'
// todo: generate static file
export const Messages = {
	...NewAuthor(A, {
		...NewStage(
			START,
			NewMessage('Ты ведь понимаешь, что в движке могут быть настолько фундаментальные вещи, которые едва-ли удастся обойти?'),
			NewMessage('Ты же понимаешь, что в движке есть настолько фундаментальные вещи, которые вряд-ли получится обойти?')
		),
		...NewStage(
			HAVE_WE_SOURCES,
			NewMessage('Да, исходники лежат на GitHub уже около 2 лет. Они в открытом доступе.'),
			NewMessage('Да, ***, у нас есть исходники! Не понимаю, к чему ты клонишь?!', Mods(AGGRO)),
			NewMessage('Нет, черт возьми, у нас нет исходников! Что ты предлагаешь?'),
			NewMessage(
				'Нет ***, у нас нет исходников! Может хватит страдать херней? Зачем ты вообще придумал ввести в игру эту механику? Какого черта?!',
				Mods(AGGRO)
			)
		),
		...NewStage(
			CAN_WE_REVIEW_SOURCES,
			NewMessage('Дерзай! Только имей ввиду, что по плану мы не можем позволить себе более 30 часов!', Actions(GAME_WIN)),
			NewMessage('Хорошо! Только не забудь, что у нас осталось всего 10 итераций и куча другой работы.', Actions(GAME_WIN)),
			NewMessage('Нет! У нас нет на это времени!')
		),
		...NewStage(
			HAVENT_SOURCES,
			NewMessage('Хорошо, как скажешь.', Actions(GAME_WIN)),
			NewMessage('Нет, мы не можем себе этого позволить.'),
			NewMessage('Нет, есть другое решение?')
		)
	}),
	...NewAuthor(B, {
		...NewStage(
			HAVE_WE_SOURCES,
			NewMessage('Я понимаю, не торопись. Послушай, у нас есть доступ к исходному коду?'),
			NewMessage('******, я прекрасно это понимаю. Лучше скажи, у нас есть доступ к исходному коду?')
		),
		...NewStage(
			CAN_WE_REVIEW_SOURCES,
			NewMessage('Я могу привлечь свободных разработчиков из команды, пусть оценятся по срокам. Мы ведь можем себе это позволить?'),
			NewMessage('Позволь мне покопаться в коде, я оценюсь по времени и напишу, ок?')
		),
		...NewStage(
			WE_CANT_REVIEW_SOURCES,
			NewMessage('Я могу привлечь свободных разработчиков из команды, пусть оценятся по срокам. Мы ведь можем себе это позволить?'),
			NewMessage('Позволь мне покопаться в коде, я оценюсь по времени и напишу, ок?')
		),
		...NewStage(
			HAVENT_SOURCES,
			NewMessage('Мы должны перейти на другую технологию.'),
			NewMessage('Если ты хочешь, чтобы мы сделали качественный продукт, мы должны обсудить выбор другой технологии на ближайшем собрании.')
		)
	}),
	...NewAuthor(COMMON, {
		...NewStage(
			RETRY,
			NewMessage('Я тебя не понимаю, перефразируй пожалуйста.'),
			NewMessage('Повтори пожалуйста, что ты сказал?'),
			NewMessage('Ты хрень какую-то написал! Перефразируй!', Mods(AGGRO)),
			NewMessage('А человеческим языко не судьба написать?'),
			NewMessage('Я НИЧЕРТА НЕ ПОНЯЛ!', Mods(AGGRO, UPPERCASE)),
			NewMessage('Слушай, я с тобой нормально разговариваю, можешь повторить так, чтобы я понял?'),
			NewMessage('Не понял!?', Mods(AGGRO)),
			NewMessage('Блин, похоже встроенный транслятор сломался, можешь повторить?'),
			NewMessage('Я__Н_И_Ч_Е_Г_О__Н_Е__П_О_Н_Я_Л__П_О_В_Т_О_Р_И__П_О_Ж_А_Л_У_Й_С_Т_А', Mods(AGGRO, UPPERCASE, UNDERSCORE_ALL)),
			NewMessage('нифига_не_понятно_можешь_повторить?', Mods(UNDERSCORE))
		),
		...NewStage(
			RETRY_REPLY,
			NewMessage('Ты издеваешься? Отвечай на вопрос!', Mods(AGGRO)),
			NewMessage('Да все ты понял! Не нервируй меня!', Mods(AGGRO)),
			NewMessage('Не тупи, черт тебя бери!', Mods(AGGRO)),
			NewMessage('Выше читай!', Mods(AGGRO)),
			NewMessage('АФК'),
			NewMessage('Пошел *****!', Actions(GAME_OVER)),
			NewMessage('**** ты ***** ******* ***!', Actions(GAME_OVER))
			//NewMessage('Иди нахер!', Mods(GAME_OVER))
		)
	})
}
