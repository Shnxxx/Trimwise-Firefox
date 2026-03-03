/**
 * Trimwise Background Service Worker
 * Handles messages from content script
 */

'use strict';

const extensionApi = typeof browser !== 'undefined' ? browser : chrome;

function openOptionsPage() {
    if (typeof browser !== 'undefined' && browser.runtime?.openOptionsPage) {
        browser.runtime.openOptionsPage().catch((error) => {
            console.error('[Trimwise] Failed to open options page', error);
        });
        return;
    }

    chrome.runtime.openOptionsPage();
}

// Listen for messages from content script
extensionApi.runtime.onMessage.addListener((request) => {
    if (request.action === 'openOptions') {
        // Open the options page in a new tab
        openOptionsPage();
    }
});
