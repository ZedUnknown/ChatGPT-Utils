(function () {

const DEBUG = false;
const PREFIX = 'Overlay Toggle |';

// run toggleOverlay immediately on script load
(async function toggleOverlay() {
    const overlay = document.getElementById(window.overlayId);
    if (DEBUG) console.log(`${PREFIX} overlay: ${overlay} && overlayReady: ${window.overlayReady}`);
    if (overlay && window.overlayReady) {
        // toggle visibility and update the extension icon state
        const isHidden = overlay.style.display === "none";
        overlay.style.display = isHidden ? "block" : "none";
        chrome.runtime.sendMessage({
            action: 'setIcon',
            state: isHidden ? 'active' : 'normal'
        });
        if (DEBUG) console.log(`${PREFIX} Overlay toggled to: ${isHidden ? "block" : "none"}`);
    }
})();

})();