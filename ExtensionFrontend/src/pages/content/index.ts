console.log('content loaded from my extension!');

function applyFilter({filter}){
  console.log("run run run")
  const elementsWithAriaLabel = document.querySelectorAll(`[aria-label="${filter}"]`);

  // Loop through the found elements and navigate to the anchor's href
  elementsWithAriaLabel.forEach(element => {
      const anchorTag = element.querySelector('a');
      if (anchorTag) {
          window.location.href = anchorTag.href;
      }
  });
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log("i got it")
      // Do something with the received data from the popup
      const data = request.data;
      // Apply the filter
      for( const key in data ){
          applyFilter(data[key]);
      }
});




/**
 * @description
 * Chrome extensions don't support modules in content scripts.
 */
// import('./components/Demo');
