// use for storage API inside the main window
// communicates with storageManager_out.js

// the event listener below is in real-time and concurrently fires with `chrome.storage.onChanged` in storageManager_out.js
const DEBUG = true;
const PREFIX = 'Storage Manager_in |';

window.addEventListener("message", (e) => {
    if (e.source !== window || !e.data || typeof e.data.action !== 'string') {
        return;
    }
    if (e.data.action === "updatedStorage") {
        const packet = e.data.packet;

        if (packet !== undefined || null) {
            if (e.data.initial) {
                if (DEBUG) console.log(`${PREFIX} Initial storage update successful.`);
            }
    
            // globally expose config (for backup or direct access by other parts of the app)
            window.config = packet;
            if (DEBUG) console.log(`${PREFIX} Updated window.config:\n${JSON.stringify(packet)}`);
    
            // custom event:
            // passing the updated config using a custom event
            // this allows other tools to use the custom event to get the updated config in real-time!
            // guide: https://youtu.be/DzZXRvk3EGg?si=LXZTjb5iix5mfboj&t=390
            const event = new CustomEvent('utilsStateUpdated', { detail: packet });
            document.dispatchEvent(event);

        } else{
            console.warn(`${PREFIX} The configuration has been corrupted. Rebuilding... \n${JSON.stringify(config) || config}`);
		    window.rebuildConfig();
        }
    }
});

// ===[For Upcoming Utils]===
/* writes an object (key-value pairs) to the existing 'config' in storage.
this will merge the object into the current config. */
window.writeToStorage = (object) => {
    if (DEBUG) console.log(`${PREFIX} Request to write to storage:\n${JSON.stringify(object, null, 2)}`);
    window.postMessage({ action: "writeToStorage", packet: object }, "*");
};

/* requests to read the current 'config' from storage.
the result will be received via the 'updatedStorage' message in the event listener above. */
window.readFromStorage = () => {
    if (DEBUG) console.log(`${PREFIX} Request to read from storage.`);
    window.postMessage({ action: "readFromStorage" }, "*");
};