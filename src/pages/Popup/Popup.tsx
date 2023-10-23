import React from 'react';
import '@pages/popup/Popup.css';
import withSuspense from '@src/shared/hoc/withSuspense';
import withErrorBoundary from '@src/shared/hoc/withErrorBoundary';
import { IoSend } from 'react-icons/io5';

const Popup = () => {
	const [message, setMessage] = React.useState<string>('');
	const [chatHistory, setChatHistory] = React.useState<{ message: string; isUser: boolean }[]>([]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setMessage(e.target.value);
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setChatHistory([...chatHistory, { message, isUser: true }]);
		const response = await fetch('https://api.example.com/chatbot', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ message }),
		});
		const data = await response.json();
		setChatHistory([...chatHistory, { message, isUser: true }, { message: data.response, isUser: false }]);
		setMessage('');
	};

	return (
		<div className="p-1">
			<div className="message">
				{chatHistory.map((chat, index) => (
					<div key={index} className={chat.isUser ? 'user-message' : 'bot-message'}>
						{chat.message}
					</div>
				))}
			</div>
			<div className="chat-history"></div>
			<div className="w-full fixed bottom-2">
				<form onSubmit={handleSubmit} className="flex">
					<input
						type="text"
						className="p-2 mr-1 rounded w-full outline-none"
						placeholder="Hi how can i help"
						value={message}
						onChange={handleChange}
					/>
					<button className="bg-blue-300 font-bold p-1 rounded mr-2" type="submit">
						<IoSend size={20}/>
					</button>
				</form>
			</div>
		</div>
	);
};

export default withErrorBoundary(withSuspense(Popup, <div> Loading ... </div>), <div> Error Occur </div>);
