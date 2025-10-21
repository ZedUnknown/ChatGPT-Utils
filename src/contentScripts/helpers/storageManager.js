(function () {

const DEBUG = false;
const PREFIX = 'StorageManager |';

// continue passing any storage updates upon a change
chrome.storage.onChanged.addListener((changes, namespace) => {
    for (const [_key, { oldValue, newValue }] of Object.entries(changes)) {
        const isValid = (
            newValue !== null &&
            newValue !== undefined &&
            (typeof newValue !== "object" || Object.keys(newValue).length > 0)
        );

        if (isValid) {
            if (DEBUG) console.log(`${PREFIX} Change detected in key "${_key}" (namespace: ${namespace})`);

            // post the updated key and the new value for inject scripts
            window.postMessage({
                action: "updatedStorage",
                key: _key,
                packet: newValue
            }, "*");

            // post the updated key and the new value for content scripts
            const event = new CustomEvent('updatedStorage', {
                detail: {
                    key: _key,
                    packet: newValue
                }
            });
            window.dispatchEvent(event);

        } else {
            if (DEBUG) console.warn(`${PREFIX} Invalid or empty value for key: "${_key}"`);
        }
    }
});

// initial update
window.sendInitialUpdate = async function (_key = 'config', _namespace='sync') {
    const storageArea = _namespace === 'sync' ? chrome.storage.sync : chrome.storage.local;
    storageArea.get(_key, (data) => {
        window.postMessage({
            action: "updatedStorage",
            key: _key,
            packet: data[_key],
            initial: true
        }, "*");

        const event = new CustomEvent('updatedStorage', {
            detail: {
                key: _key,
                packet: data[_key],
                initial: true
            }
        });
        window.dispatchEvent(event);
    });
}

// ==========[Functions For Content Scripts]==========
// write an object to storage under a key
window.writeToStorage = async function (key, object, namespace='sync') {
    const storageArea = namespace === 'sync' ? chrome.storage.sync : chrome.storage.local;
    return new Promise((resolve) => {
        storageArea.set({ [key]: object }); // [key] = value given by key parameter
        if (DEBUG) console.log(`${PREFIX} ${key} was successfully written to the storage ${namespace}.`);
        resolve(true);
    })
}

// currently, the entire overlay config is stored under a single key called 'config'
// chrome returns it as an object with the key as the property, e.g., data = { config: { entire_config } }
window.readFromStorage = async function (key, namespace='sync') {
    const storageArea = namespace === 'sync' ? chrome.storage.sync : chrome.storage.local;
    return new Promise((resolve) => {
        storageArea.get(key, (data) => {
            resolve(data[key]);
        });
    })
}

// ==========[Listeners for Injected Scripts]==========
window.addEventListener("message", async (event) => {
    if (event.data?.action === "writeToStorage") {
        const key = event.data.key;

        // prevent config from being written by utils directly
        if (key === "config") {
            if (DEBUG) console.warn(`${PREFIX} Aborting writeToStorage for key "config"!`);
            return;
        }
        const object = event.data.packet;
        const namespace = event.data.namespace || 'sync';
        await window.writeToStorage(key, object, namespace);
    }

    if (event.data?.action === "readFromStorage") {
        const key = event.data.key;

        // prevent config from being read by utils directly
        if (key === "config") {
            if (DEBUG) console.warn(`${PREFIX} Aborting readFromStorage for key "config"!`);
            return;
        }
        const namespace = event.data.namespace;
        const data = await window.readFromStorage(key, namespace);
        window.postMessage({
            action: "readFromStorage",
            packet: data // data without key included, managed by readFromStorage
        }, "*");
    }
});

})();