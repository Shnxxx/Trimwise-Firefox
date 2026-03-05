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
    getLocalStorage('trimwiseOptionsTheme', (data) => {
        if (data.trimwiseOptionsTheme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
        } else if (data.trimwiseOptionsTheme === 'light') {
            document.documentElement.setAttribute('data-theme', 'light');
        }
    });

    const batchSizeInput = document.getElementById('batchSizeInput');
    const saveButton = document.getElementById('saveButton');

    getSyncStorage('batchSize', (data) => {
        const value = parseInt(data.batchSize, 10);
        if (Number.isInteger(value) && value > 0) {
            batchSizeInput.value = String(value);
        } else {
            batchSizeInput.value = '10';
        }
    });

    saveButton.addEventListener('click', () => {
        const value = parseInt(batchSizeInput.value, 10);

        if (!Number.isInteger(value) || value <= 0) {
            alert('Please enter a positive integer.');
            batchSizeInput.focus();
            return;
        }

        setSyncStorage({ batchSize: String(value) }, () => {
            alert('Settings saved. Please reload the chat page for changes to take effect.');
        });
    });
});
