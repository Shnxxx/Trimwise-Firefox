/**
 * Trimwise Background Service Worker
 * Handles messages from content script
 */

'use strict';

const extensionApi = typeof browser !== 'undefined' ? browser : chrome;

function setLocalStorage(data) {
    if (typeof browser !== 'undefined' && browser.storage?.local) {
        return browser.storage.local.set(data).catch((error) => {
            console.error('[Trimwise] Failed to save local settings', error);
        });
    }

    return new Promise((resolve) => {
        chrome.storage.local.set(data, () => {
            const runtimeError = chrome.runtime.lastError;
            if (runtimeError) {
                console.error('[Trimwise] Failed to save local settings', runtimeError);
            }
            resolve();
        });
    });
}

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
        const theme = request.theme === 'dark' ? 'dark' : 'light';

        setLocalStorage({ trimwiseOptionsTheme: theme }).finally(() => {
            // Open the options page in a new tab
            openOptionsPage();
        });
    }
});
