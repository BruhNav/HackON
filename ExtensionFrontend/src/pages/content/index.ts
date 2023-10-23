console.log('content loaded');

/**
 * @description
 * Chrome extensions don't support modules in content scripts.
 */
import('./components/Demo');

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log("i got it")
    if (request) {
      // Do something with the received data from the popup
      console.log(request);
    }
  });
