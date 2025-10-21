/*
observe an element for removal from the DOM and trigger a callback when it's detached.
it automatically disconnects the observer after the element is removed to prevent memory leaks.
this is used to check if any original elements in the DOM have been changed, 
which prevents invalid element references caused by dynamic styling from the original website.

* [This MUST be used for every grand container] *
*/

const DEBUG = false;
const PREFIX = 'Observer Element Change |';

window.observeElementChange = function (element, callback) {
    const observer = new MutationObserver(() => {
        if (!element) {
            if (DEBUG) console.warn(`${PREFIX} Cannot observe: element is null, undefined, or invalid.`);
            return;
        }
        if (!document.contains(element)) {
            observer.disconnect();
            if (DEBUG) console.log(`${PREFIX} Element change detected. Observer stopped.`);
            setTimeout(callback, 100);
        }
    });
    observer.observe(document.body, { childList: true, subtree: true });
}
