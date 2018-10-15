import React from 'react'
import { now } from '../utils'
import { connect } from 'react-redux'
import { sendMessage, newGame } from './actions'
import './font-awesome.min.css'
import './styles.scss'

const ONLINE = 'online'
const AFK = mins => `left ${mins} mins ago`
const contact = (name, avatar, status) => ({ name, avatar, status })
const contacts = [
	contact('Vincent Porter', 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_01.jpg', ONLINE),
	contact('Aiden Chavez', 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_02.jpg', AFK(7)),
	contact('Aiden Chavez', 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_02.jpg', AFK(10)),
	contact('Aiden Chavez', 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_02.jpg', AFK(30))
]
const ContactsList = () => <ul className="list">{contacts.map(item => <Contact {...item} />)}</ul>
const Contact = ({ name, avatar, status }) => (
	<li className="clearfix">
		<img src={avatar} alt="avatar" />
		<div className="about">
			<div className="name">{name}</div>
			<div className="status">
				<i className={`fa fa-circle ${status === ONLINE ? 'online' : 'offline'}`} /> {status}
			</div>
		</div>
	</li>
)

const mstp = (state, props) => ({
	history: state.chat.history
})
const mdtp = {
	sendMessage,
	newGame
}

class ChatApp extends React.Component {
	constructor(props) {
		super(props)
		this.textarea = React.createRef()
	}
	componentDidMount() {
		const { newGame } = this.props
		newGame()
	}
	addMessage = () => {
		const { sendMessage } = this.props
		const text = this.textarea.current.value
		sendMessage(text)
	}
	addMessageEnter = event => {
		if (event.keyCode === 13) {
			this.addMessage()
		}
	}
	render() {
		const { history, newGame } = this.props
		return (
			<div className="container clearfix">
				<div className="people-list" id="people-list">
					<div className="search">
						<input type="text" placeholder="search" />
						<i className="fa fa-search" />
					</div>
					<ContactsList />
				</div>
				<div className="chat">
					<ChatHeader />
					<div className="chat-history">
						<ul>
							{history.map(msg => {
								if (msg.author === ME) {
									//todo: задать нормальные ключи
									return <Message key={msg.id} {...msg} />
								} else {
									return <Response key={msg.id} {...msg} />
								}
							})}
						</ul>
					</div>
					<div className="chat-message clearfix">
						<textarea ref={this.textarea} onKeyUp={this.addMessageEnter} name="message-to-send" placeholder="Наберите ваше сообщение" rows="3" />
						<button onClick={this.addMessage}>Отправить</button>
						<button onClick={newGame}>Начать сначала</button>
					</div>
				</div>
			</div>
		)
	}
}

const Chat = connect(
	mstp,
	mdtp
)(ChatApp)

export { Chat }
const ME = 'Дмитрий'
const Time = ({ time }) => <span className="message-data-time">{time}, Сегодня</span>
const Message = ({ time, text, author }) => {
	return (
		<li className="clearfix">
			<div className="message-data align-right">
				<Time {...{ time }} /> &nbsp; &nbsp;
				<span className="message-data-name">{author}</span> <i className="fa fa-circle me" />
			</div>
			<div className="message other-message float-right">{text}</div>
		</li>
	)
}
const Response = ({ time, text, author }) => (
	<li>
		<div className="message-data">
			<span className="message-data-name">
				<i className="fa fa-circle online" /> {author}
			</span>
			<Time {...{ time }} />
		</div>
		<div className="message my-message">{text}</div>
	</li>
)
const ChatHeader = () => (
	<div className="chat-header clearfix">
		<img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_01_green.jpg" alt="avatar" />
		<div className="chat-about">
			<div className="chat-with">Chat with Vincent Porter</div>
			<div className="chat-num-messages">already 1 902 messages</div>
		</div>
		<i className="fa fa-star" />
	</div>
)
