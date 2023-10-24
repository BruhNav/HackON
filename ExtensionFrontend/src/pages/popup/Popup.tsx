import React, { useEffect } from 'react';
import '@pages/popup/Popup.css';
// import withSuspense from '@src/shared/hoc/withSuspense';
// import withErrorBoundary from '@src/shared/hoc/withErrorBoundary';
import { IoSend } from 'react-icons/io5';

const Popup = () => {

	const [message, setMessage] = React.useState('');
	const [filterList, setFilterList] = React.useState({});
	const [chatHistory, setChatHistory] = React.useState([]); // [{message: '', type: 'user'},{message: '', type: 'bot'}
	
	const handleSubmit = (e: { preventDefault: () => void; }) => {
		e.preventDefault();
		chrome.runtime.sendMessage( {type:'background', data : message} , (response) => {
			if(response) console.log(response.response);
			//setFilterList(response.response);
		});
		setMessage('');
    }

  useEffect(() => {
    chrome.runtime.sendMessage( {type:'content', data : filterList});
  }, [filterList]);
  

	return (
		<div className="p-1">
			<div>
				
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

