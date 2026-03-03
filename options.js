function getSyncStorage(key, callback) {
    if (typeof browser !== 'undefined' && browser.storage?.sync) {
        browser.storage.sync.get(key)
            .then(callback)
            .catch((error) => {
                console.error('[Trimwise] Failed to load settings', error);
                callback({});
            });
        return;
    }

    chrome.storage.sync.get(key, callback);
}

function setSyncStorage(data, callback) {
    if (typeof browser !== 'undefined' && browser.storage?.sync) {
        browser.storage.sync.set(data)
            .then(callback)
            .catch((error) => {
                console.error('[Trimwise] Failed to save settings', error);
            });
        return;
    }

    chrome.storage.sync.set(data, callback);
}

document.addEventListener('DOMContentLoaded', () => {
    const batchSizeRange = document.getElementById('batchSizeRange');
    const batchSizeValue = document.getElementById('batchSizeValue');
    const saveButton = document.getElementById('saveButton');

    // Load and apply saved settings
    getSyncStorage('batchSize', (data) => {
        if (data.batchSize) {
            batchSizeRange.value = data.batchSize;
            batchSizeValue.textContent = `${data.batchSize} messages`;
        }
    });

    // Update displayed value when range input changes
    batchSizeRange.addEventListener('input', () => {
        batchSizeValue.textContent = `${batchSizeRange.value} messages`;
    });

    // Save settings when button is clicked
    saveButton.addEventListener('click', () => {
        const selectedSize = batchSizeRange.value;
        setSyncStorage({ batchSize: selectedSize }, () => {
            alert('Settings saved. Please reload the chat page for changes to take effect.');
        });
    });
});
