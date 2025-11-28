const DEBUG = false;
const PREFIX = 'On Click |';

let clickListenerAdded = false;

if (!clickListenerAdded) {
    clickListenerAdded = true;

    document.addEventListener('click', (event) => {
        const box = event.target.closest('.clickable');
        if (!box) return;
        if (DEBUG) console.log(`${PREFIX} User clicked div: "${box.id}"`, box);

        const clickEvent = new CustomEvent('getClick', {
            detail: { element: box, id: box.id}
        });

        window.dispatchEvent(clickEvent);
    });

    if (DEBUG) console.log(`${PREFIX} Global click listener added.`);
}
