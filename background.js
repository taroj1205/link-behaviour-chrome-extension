// Listen to messages from content scripts
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.action === 'getOptions') {
        // Get saved options from extension storage
        chrome.storage.sync.get(['tabType', 'height', 'width'], function (result) {
            console.log(result.tabType);
            sendResponse({
                tabType: result.tabType || 'newtab', // Default value if not set
                height: result.height || 500,
                width: result.width || 800
            });
        });
        return true; // Indicates that sendResponse will be called asynchronously
    }
});

// Initialize extension options and UI elements
chrome.runtime.onInstalled.addListener(function () {
    // Set default options when the extension is installed
    chrome.storage.sync.set({
        tabType: 'newtab', // Default tab type
        height: 500,
        width: 800
    });
});

// Inject content script into the tab when extension is installed or updated
function injectContentScript(tabId) {
    chrome.scripting.executeScript({
        target: { tabId: tabId },
        files: ['content.js']
    });
}

// Listen for DOMContentLoaded event on the tab
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (changeInfo.status === 'complete' && tab.url && tab.url.startsWith('http')) {
        injectContentScript(tabId); // Inject content.js into the tab
    }
});

// Run content.js when extension is started
chrome.runtime.onStartup.addListener(function () {
    // Get the active tab
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        if (tabs.length > 0) {
            injectContentScript(tabs[0].id); // Inject content.js into the active tab
        }
    });
});
