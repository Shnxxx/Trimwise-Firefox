/**
 * Trimwise Background Script (Firefox)
 * Handles messages from content script
 */

'use strict';

function setLocalStorage(data) {
    return browser.storage.local.set(data).catch((error) => {
        console.error('[Trimwise] Failed to save local settings', error);
    });
}

function openOptionsPage() {
    browser.runtime.openOptionsPage().catch((error) => {
        console.error('[Trimwise] Failed to open options page', error);
    });
}

browser.runtime.onMessage.addListener((request) => {
    if (request.action === 'openOptions') {
        const theme = request.theme === 'dark' ? 'dark' : 'light';

        setLocalStorage({ trimwiseOptionsTheme: theme }).finally(() => {
            openOptionsPage();
        });
    }
});
