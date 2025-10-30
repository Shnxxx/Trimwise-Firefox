/**
 * Trimwise Background Service Worker
 * Handles messages from content script
 */

'use strict';

// Listen for messages from content script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'openOptions') {
        // Open the options page in a new tab
        chrome.runtime.openOptionsPage();
    }
});
