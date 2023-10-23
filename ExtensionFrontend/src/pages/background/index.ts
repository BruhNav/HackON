import reloadOnUpdate from 'virtual:reload-on-update-in-background-script';

reloadOnUpdate('pages/background');

/**
 * Extension reloading is necessary because the browser automatically caches the css.
 * If you do not use the css of the content script, please delete it.
 */
reloadOnUpdate('pages/content/style.scss');

console.log('background loaded');

chrome.runtime.onMessage.addListener( function(request, sender, sendResponse){
    // Check if the message is a prompt
    if (request) {
        // Call the getChatGPTResponse function with the prompt as the argument
        // const response = await getChatGPTResponse(request);

        // Send the response back to popup.js
        console.log("hey i got it")
        console.log(request.message)

        sendResponse({ type: 'response', response: 'this is the response from background.js' });
    }
});