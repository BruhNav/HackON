import React, { useEffect } from 'react';
import '@pages/popup/Popup.css';
// import withSuspense from '@src/shared/hoc/withSuspense';
// import withErrorBoundary from '@src/shared/hoc/withErrorBoundary';
import { IoSend } from 'react-icons/io5';

const Popup = () => {

	const [message, setMessage] = React.useState('');
	const [filterList, setFilterList] = React.useState({});
	const [chatHistory, setChatHistory] = React.useState([{message: 'Hi, what do you want to buy ?', type: 'bot1'}]); // [{message: '', type: 'user'},{message: '', type: 'bot'}
	
	const handleSubmit = (e: { preventDefault: () => void; }) => {
		e.preventDefault();
		if(message !== '') {
			setChatHistory([...chatHistory, {message: message, type: 'user'}]);
		}
		chrome.runtime.sendMessage( {type:'background', data : message} , (response) => {
			if(response) console.log(response.response);

			// setFilterList(response.response);

			// setChatHistory([...chatHistory, {message: response.response, type: 'bot'}]);
		});
		setMessage('');
    }

	useEffect(() => {
		chrome.runtime.sendMessage( {type:'content', data : filterList});
	}, [filterList]);
  

	return (
		<div className="p-1">
			<div className="h-auto my-2 mx-2 overflow-hidden flex flex-col gap-2">
				{ chatHistory.map((item, index) => {
					if(item.type === 'user') {
						return (
							<div key={index} className={`transition duration-100 linear w-max flex flex-start ml-auto text-white px-2 py-2 border-none rounded-md bg-violet-800 hover:-translate-x-0.5`}>
								{item.message}
							</div>
						);
					}
					else {
						return (
							<div key={index} className={`transition duration-100 linear w-max flex items-start text-white px-2 py-2 overflow-hidden border-none rounded-md bg-gray-800 hover:translate-x-0.5`}>
								{item.message}
							</div>
						);
					}
				}) }
			</div>
			<div className="flex w-full fixed bottom-2">
				<input
					type="text"
					className="p-2 mr-1 rounded w-full outline-none"
					placeholder="Hi how can i help"
					value={message}
					onChange={(e)=>{setMessage(e.target.value)}}
				/>
				<button 
					className="bg-blue-300 font-bold p-1 rounded mr-2" 
					onClick={handleSubmit}
				>
					<IoSend size={20}/>
				</button>
			</div>
		</div>
	);
};

// export default withErrorBoundary(withSuspense(Popup, <div> Loading ... </div>), <div> Error Occur </div>);
export default Popup;

