// background.js
// Service worker for handling messages and cloud eval API calls

// Listen for messages from other parts of the extension
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message === 'eval') {
        // Call the cloud eval API
        callEvalAPI(request.data)
            .then(response => sendResponse({status: 'success', data: response}))
            .catch(error => sendResponse({status: 'error', data: error}));
        return true; // Keep the message channel open for sendResponse
    }
});

function callEvalAPI(data) {
    return new Promise((resolve, reject) => {
        fetch('https://your-cloud-eval-api-endpoint', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => resolve(data))
        .catch(error => reject(error));
    });
}
