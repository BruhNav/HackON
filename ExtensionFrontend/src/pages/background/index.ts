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
    console.log("hey i got it")
    if (request.type==='background') {
        // Call the getChatGPTResponse function with the prompt as the argument
        // const response = await getChatGPTResponse(request);

        // Send the response back to popup.js
        console.log(request.message)

        sendResponse({ type: 'response', response: 'this is the response from background.js' });
    }
    if(request.type==='content'){
        console.log("i got content script message")
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
          chrome.tabs.sendMessage(tabs[0].id, { data: request.data });
    });
    }
});