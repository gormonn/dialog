import { model } from '../utils'
import { Messages as InitialState } from './messages'
import { NEW_MESSAGE } from '../const'

export const reducer = model(
	{
		...InitialState
	},
	{
		[NEW_MESSAGE](state, { stage, i, author }) {
			const { key } = author
			if (!!stage && !!key) {
				const props = {
					[key]: {
						...state[key],
						[stage]: {
							...state[key][stage],
							[i]: {
								...state[key][stage][i],
								used: true
							}
						}
					}
				}
				return {
					...state,
					...props
				}
			}
			return { ...state }
		}
	}
)

export default reducer
