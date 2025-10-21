const DEBUG = false;
const PREFIX = 'Selection Change |';

let selectionListenerAdded = false;

// add the global event listener only once
if (!selectionListenerAdded) {
    selectionListenerAdded = true;

    document.addEventListener('selectionchange', (event) => {
        const selectedText = window.getSelection().toString();
        if (DEBUG) console.log(`${PREFIX} User selected: "${selectedText}"`);

        const selectionEvent = new CustomEvent('getSelection', {
            detail: { selection: selectedText }
        });
        window.dispatchEvent(selectionEvent);

    });

    if (DEBUG) console.log(`${PREFIX} Global selectionchange listener added.`);
}
