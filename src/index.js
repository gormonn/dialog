import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Chat } from './chat'
import ReactJson from 'react-json-view'
import { Messages } from './dialog/messages'

function App() {
	let { store } = require('./store')
	return (
		<Provider store={store}>
			<div className="App">
				<Chat />
				{/*<ReactJson src={Messages} displayDataTypes={false} displayObjectSize={false} />*/}
			</div>
		</Provider>
	)
}

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)
