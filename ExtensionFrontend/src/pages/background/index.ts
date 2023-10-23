import reloadOnUpdate from 'virtual:reload-on-update-in-background-script';

reloadOnUpdate('pages/background');

/**
 * Extension reloading is necessary because the browser automatically caches the css.
 * If you do not use the css of the content script, please delete it.
 */

console.log('background loaded');

chrome.runtime.onMessage.addListener( function(request, sender, sendResponse){

    if (request.type==='background') {
        
        console.log(request.data)

        sendResponse({ type: 'response', response: 'this is the response from background.js' });
    }

    if(request.type==='content'){
        // console.log("i got content script message")
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
          chrome.tabs.sendMessage(tabs[0].id, { data: request });
    });
    }
});
