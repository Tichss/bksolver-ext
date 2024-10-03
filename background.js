chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message) {
        console.log(message); // Logolás a háttérszkript konzoljában
    }
});
