console.log('content loaded from my extension!');

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log("i got it")
      // Do something with the received data from the popup
      console.log(request.data);
});

// ()=>{
//   const elementsWithAriaLabel = document.querySelectorAll('[aria-label="Android 10.0"]');

//   // Loop through the found elements and navigate to the anchor's href
//   elementsWithAriaLabel.forEach(element => {
//       const anchorTag = element.querySelector('a');
//       if (anchorTag) {
//           window.location.href = anchorTag.href;
//       }
//   });
// }

/**
 * @description
 * Chrome extensions don't support modules in content scripts.
 */
// import('./components/Demo');
