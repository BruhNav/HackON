import React from 'react';
import '@pages/popup/Popup.css';
// import withSuspense from '@src/shared/hoc/withSuspense';
// import withErrorBoundary from '@src/shared/hoc/withErrorBoundary';
import { IoSend } from 'react-icons/io5';

const Popup = () => {

	function isJSONString(str: string) {
		try {
			JSON.parse(str);
		} catch (e) {
			return false;
		}
		return true;
	}


	const [message, setMessage] = React.useState('');
	const [loading, setLoading] = React.useState(true);
	const [chatHistory, setChatHistory] = React.useState([{ message: 'Hi, what do you want to buy ?', type: 'bot1' }]); // [{message: '', type: 'user'},{message: '', type: 'bot'}
	const userStyle = "h-full w-[60%] text-wrap text-white font-bold px-2 py-2 ml-auto border-none rounded-md bg-pink-800";
	const botStyle = "h-full w-[60%] text-wrap text-white font-bold px-2 py-2 border-none rounded-md bg-blue-800";

	const handleSubmit = async (e: { preventDefault: () => void; }) => {

		e.preventDefault();
		setChatHistory((prev) => [...prev, { message: message, type: 'user' }]);
		setChatHistory((prev) => [...prev, { message: 'Sure based on your provided key words following filter have been applied', type: 'bot' }]);

		fetch(`http://localhost:3000/genai/?search_entry=${message}`)
			.then((res) => res.json())
			.then((data) => {
				setLoading(false);

				const res = `${JSON.stringify(data)}`

				chrome.runtime.sendMessage({ message: data });
				setChatHistory((prev) => [...prev, { message: res, type: 'bot' }]);
			})
			.catch((error) => {
				console.error(error);
				setChatHistory([...chatHistory, { message: "Sorry, an error occurred while fetching data.", type: 'bot' }]);
			});
		
		// console.log(chatHistory);

		setMessage('');
	};

	// useEffect(() => {

	// }, [filterList]);

	return (
		<div className="w-full p-1">
			<div className="w-full my-2 mx-2 flex flex-col gap-2">
				{chatHistory.map((item, index) => {
					if (isJSONString(item.message)) {
						const data = JSON.parse(item.message);
						
						return (
							<ul key={index} className={botStyle}>
								{Object.keys(data).map((key, index) => {
									return (
										<li key={index} className="text-white font-bold">
											{key} : {data[key]}
										</li>
									);
								})}
							</ul>
						)

					} else {
						return (
							<div key={index} className={item.type === 'user' ? userStyle : botStyle}>
								{item.message}
							</div>
						);
					}
				})}
			</div>
			<div className="flex w-full fixed bottom-2">
				<input
					type="text"
					className="p-2 mr-1 rounded w-full outline-none"
					placeholder="Hi how can i help"
					value={message}
					onChange={(e) => { setMessage(e.target.value) }}
				/>
				<button
					className="bg-blue-300 font-bold p-1 rounded mr-2"
					onClick={handleSubmit}
				>
					<IoSend size={20} />
				</button>
			</div>
		</div>
	);
};

// export default withErrorBoundary(withSuspense(Popup, <div> Loading ... </div>), <div> Error Occur </div>);
export default Popup;

