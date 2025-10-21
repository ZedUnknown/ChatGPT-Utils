/*  
handles messages between the main window and storageManager.js,  
updates config in realtime, and provides functions to read/write storage data.  
*/

const DEBUG = false;
const PREFIX = 'Storage Mediator |';

window.addEventListener("message", (e) => {
    if (e.source !== window || !e.data || typeof e.data.action !== 'string') {
        return;
    }
    if (e.data.action === "updatedStorage") {
        /* ¯\_(ツ)_/¯
        e.data = messageEvent from window.postMessage
        e.detail = customEvent from window.dispatchEvent
        */
        const _packet = e.data.packet;
        const _key = e.data.key;

        if (_packet !== undefined || null) {
            if (e.data.initial) {
                if (DEBUG) console.log(`${PREFIX} Initial storage received successfully.`);
            }

            /* custom events:
            passing the updated config using a custom event
            this allows other tools to use the custom event to get the updated config in real-time!
            guide: https://youtu.be/DzZXRvk3EGg?si=LXZTjb5iix5mfboj&t=390 */
            
            // custom events for each keys' initial update
            if (_key === 'config') {
                // globally expose config (for backup)
                window.__config__ = _packet;
                const event = new CustomEvent('configUpdated', { 
                    detail: {
                        packet: _packet
                    } 
                });
                document.dispatchEvent(event);
            }
        }
    }
});

// ===[For Upcoming Utils]===
/* writes an object (key-value pairs) to a key except 'config'
this will merge the object into the current config. */
window.writeToStorage = (_key, _object, _namespace='sync') => {
    if (DEBUG) console.log(`${PREFIX} Request to write to storage:\n${JSON.stringify(object, null, 2)}`);
    window.postMessage({ 
        action: "writeToStorage",
        key: _key,
        packet: _object,
        namespace: _namespace,
    }, "*");
};

/* requests to read a key except 'config'
the result will be received via the 'updatedStorage' message in the event listener above. */
window.readFromStorage = (_key, _namespace='sync') => {
    if (DEBUG) console.log(`${PREFIX} Request to read from storage.`);
    window.postMessage({
        action: "readFromStorage",
        key: _key,
        namespace: _namespace
    }, "*");
};