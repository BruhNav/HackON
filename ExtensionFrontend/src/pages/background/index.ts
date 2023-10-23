// Import the necessary libraries
import axios from 'axios';

// Define a function to make the API call to ChatGPT
async function getChatGPTResponse(prompt: string): Promise<string> {
    // Define the API endpoint
    const endpoint = 'https://api.openai.com/v1/engines/davinci-codex/completions';

    const OPENAI_API_KEY = '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';
    // Define the request headers
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
    };

    // Define the request data
    const data = {
        prompt: prompt,
        max_tokens: 50,
        temperature: 0.7
    };

    // Make the API call and return the response
    const response = await axios.post(endpoint, data, { headers: headers });
    return response.data.choices[0].text;
}

// Listen for a message from popup.js
chrome.runtime.onMessage.addListener( (request, sender, sendResponse) => {
    // Check if the message is a prompt
    if (request.type === 'prompt') {
        // Call the getChatGPTResponse function with the prompt as the argument
        // const response = await getChatGPTResponse(request);

        // Send the response back to popup.js
        console.log(request)
        sendResponse({ type: 'response', response: 'this is the response from background.js' });
    }
});
