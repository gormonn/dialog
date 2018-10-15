import { createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'
import middleware from './middleware'
import reducers from './reducers'
const composeEnhancers = composeWithDevTools({
	// options like actionSanitizer, stateSanitizer
})

export const store = createStore(reducers, composeEnhancers(middleware))
