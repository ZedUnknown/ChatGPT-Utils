const DEBUG = false;
const PREFIX = 'Observer Page Change |';

// re-run, recreate added elements: treating URL changes as a page reload
(function () {

    if (!window.GPTU_PAGE_CHANGE_OBSERVER) {
        if (DEBUG) console.log(`${PREFIX} Initializing shared observer...`);

        let lastUrl = location.href;
        const callbacks = new Set();

        const observer = new MutationObserver(() => {
            const currentUrl = location.href;
            if (currentUrl === lastUrl) return;

            if (DEBUG) console.log(`${PREFIX} Page changed from ${lastUrl} → ${currentUrl}`);
            lastUrl = currentUrl;

            const ignoreUrls = ["settings", "pricing"];
            const hash = currentUrl.split("#")[1];
            if (hash && ignoreUrls.includes(hash)) {
                if (DEBUG) console.log(`${PREFIX} Ignored URL change.`);
                return;
            }

            for (const callback of callbacks) {
                try {
                    callback();
                } catch (err) {
                    console.error(`${PREFIX} Error in callback:`, err);
                }
            }
        });

        observer.observe(document, { subtree: true, childList: true });

        window.GPTU_PAGE_CHANGE_OBSERVER = { observer, callbacks };
        if (DEBUG) console.log(`${PREFIX} Shared MutationObserver active.`);
    } else if (DEBUG) {
        if (DEBUG) console.log(`${PREFIX} Reusing shared MutationObserver instance.`);
    }

    // ===[Main callable function]===
    function observePageChange(newCallbacks = []) {
        const store = window.GPTU_PAGE_CHANGE_OBSERVER;

        if (!Array.isArray(newCallbacks)) newCallbacks = [newCallbacks];

        for (const callback of newCallbacks) {
            if (typeof callback === "function") {
                store.callbacks.add(callback);
                if (DEBUG) console.log(`${PREFIX} Added callback. Total: ${store.callbacks.size}`);
            }
        }
    }

    // ===[Remove callbacks]===
    observePageChange.remove = function (targetCb) {
        const store = window.GPTU_PAGE_CHANGE_OBSERVER;
        if (!targetCb) {
            store.callbacks.clear();
            if (DEBUG) console.log(`${PREFIX} All callbacks cleared.`);
        } else {
            store.callbacks.delete(targetCb);
            if (DEBUG) console.log(`${PREFIX} Callback removed.`);
        }
    };
    window.observePageChange = observePageChange;

})();
