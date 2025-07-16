// use for storage API inside the chrome.runtime (can access main window since this is a content script)
// communicates with storageManager_in.js
const DEBUG = true;
const PREFIX = 'Storage Manager_out |';

window.addEventListener("message", async (e) => {
    if (e.source !== window || !e.data || !e.data.action) return;

    const action = e.data.action || null;
    const packet = e.data.packet || {};
    let config;

    // write keys to config
    if (action === "writeToStorage") {
        config = getConfig();
        const updates = packet;

        for (const [key, value] of Object.entries(updates)) {
            config[key] = value;
            if (DEBUG) console.log(`${PREFIX} Writing "${key}" to config...`);
        }

        if (DEBUG) console.log(`${PREFIX} Updated config:\n${JSON.stringify(config)}`);
        setConfig(config);

        // the updated config will catch from storageManager_in
        postUpdatedStorage(config);
    }

    else if (action === "readFromStorage") {
        if (DEBUG) console.log(`${PREFIX} Read config:\n${JSON.stringify(config)}`);

        config = getConfig();
        // the config will catch from storageManager_in
        postUpdatedStorage(config);
    }
});

// continue passing the config to storageManager_in upon a change (not if the config is empty, which is not possible in regular case)
chrome.storage.onChanged.addListener((changes, namespace) => {
  for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
    const isValid = (
        newValue !== null &&
        newValue !== undefined &&
        (typeof newValue !== 'object' || Object.keys(newValue).length > 0)
    );
    if (isValid) {
        window.postMessage({
          action: "updatedStorage",
          packet: newValue
        }, "*");
      }
    }
});

// ===[Helpers]===
async function getConfig() {
    const result = await chrome.storage.sync.get('config');
    return result.config || {};
}

async function setConfig(config) {
    await chrome.storage.sync.set({ config });
}

function postUpdatedStorage(packet, isInitial = false) {
    window.postMessage({
        action: "updatedStorage",
        packet: packet,
        initial: isInitial
    }, "*");
}