function getLocalStorage(key, callback) {
    browser.storage.local.get(key)
        .then(callback)
        .catch((error) => {
            console.error('[Trimwise] Failed to load local settings', error);
            callback({});
        });
}

function getSyncStorage(key, callback) {
    browser.storage.sync.get(key)
        .then(callback)
        .catch((error) => {
            console.error('[Trimwise] Failed to load settings', error);
            callback({});
        });
}

function setSyncStorage(data, callback) {
    browser.storage.sync.set(data)
        .then(callback)
        .catch((error) => {
            console.error('[Trimwise] Failed to save settings', error);
        });
}

document.addEventListener('DOMContentLoaded', () => {
    // Apply theme preference passed from chat page
    getLocalStorage('trimwiseOptionsTheme', (data) => {
        if (data.trimwiseOptionsTheme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
        } else if (data.trimwiseOptionsTheme === 'light') {
            document.documentElement.setAttribute('data-theme', 'light');
        }
    });

    const batchSizeRange = document.getElementById('batchSizeRange');
    const batchSizeValue = document.getElementById('batchSizeValue');
    const saveButton = document.getElementById('saveButton');

    getSyncStorage('batchSize', (data) => {
        if (data.batchSize) {
            batchSizeRange.value = data.batchSize;
            batchSizeValue.textContent = `${data.batchSize} messages`;
        }
    });

    batchSizeRange.addEventListener('input', () => {
        batchSizeValue.textContent = `${batchSizeRange.value} messages`;
    });

    saveButton.addEventListener('click', () => {
        const selectedSize = batchSizeRange.value;
        setSyncStorage({ batchSize: selectedSize }, () => {
            alert('Settings saved. Please reload the chat page for changes to take effect.');
        });
    });
});
