const DEBUG = false;
const PREFIX = 'trig_GPTU-UIC-B |';

// ===[Containers]===
let userInputContainer = null;
let GPTU_UIC_B_ID = null;
let GPTU_UIC_B_CONTAINER = null;

// ===[Handlers]===
let clickHandler = null;

// ===[Snapshots]===
let userInputContainerStyles = null;

// ===[Init]===
let attempts = 0;
function init() {
	if (DEBUG) console.log(`${PREFIX} init called...`);

	// taking userinput container to animate it's coners in this case
	window.getUserInputContainer().then((container) => {
		userInputContainer = container;

		if (userInputContainer) {
			if (DEBUG) console.log(`${PREFIX} Found userInputContainer:`, userInputContainer);

			// attach observer to grand container to detect changes
			window.observeElementChange(userInputContainer, () => {
				if (DEBUG) console.log(`${PREFIX} userInputContainer changed...`);
				window.getUserInputContainer().then((container) => {
					userInputContainer = container;
				})
			})
			// copy only required styles
			userInputContainerStyles = window.getStylesSnapshot(userInputContainer, ['width', 'height', 'left', 'top', 'right', 'bottom', 'borderRadius']);
			
			/*
			* take the GPTU_UIC_B_CONTAINER and run:
			*    - create_method
			*    - triggerSetUp
			*/
			window.get_GPTU_UIC_B().then(({id, container}) => {
				if (DEBUG) console.log(`${PREFIX} Found parentContainer:`, container);
				GPTU_UIC_B_ID = id;
				GPTU_UIC_B_CONTAINER = container;
	
				try {
					if (window.__registry__[window.PROMPT_COMPRESSOR_ID].methods.create_method) window.__registry__[window.PROMPT_COMPRESSOR_ID].methods.create_method();
				} catch (e) {
					if (DEBUG) console.error(`${PREFIX} Error creating utils: ${e}`);
				}

				// put the container to forward after the animation
				setTimeout(() => {
					GPTU_UIC_B_CONTAINER.style.zIndex = 0;
				}, 2300); // almost match to transition time in main.css

				// trigger It! :D
				triggerSetUp();
			})
			.catch ((err) => {
				if (DEBUG) console.error(`${PREFIX} Error getting GPTU_UIC_B_CONTAINER: ${err}`);
			});
		} else {
			if (DEBUG) console.log(`${PREFIX} userInputContainer not found.`);
			if (attempts < 5) {
				init();
				attempts++;
			}
		}
	});
}
init();

// ===[Trigger SetUp]===
function triggerSetUp() {
	if (DEBUG) console.log(`${PREFIX} triggerSetUp initialized.`);

	const wait = setInterval(() => {
		if (window.__registry__) {
			clearInterval(wait);
			if (DEBUG) console.log(`${PREFIX} All utils found.`);

			if (clickHandler) return;

			clickHandler = (event) => {
				const parentId = event.detail.element.parentElement.id;

				if (parentId === window.PROMPT_COMPRESSOR_ID) {
					const compressionMethod = event.detail.id;
					const textArea = document.getElementById('prompt-textarea');
					const textElements = textArea.querySelectorAll('p');

					let collectedText = '';
					textElements.forEach((element) => {
						if (!element.textContent) return;
						collectedText += element.textContent;
					})
					if (collectedText === '') return;
					const compressedText = window.__registry__[window.PROMPT_COMPRESSOR_ID].methods.toggle_method(compressionMethod, collectedText);
					textArea.innerHTML = `<p>${compressedText}</p>`
				}
			}
			// === Apply grandparent container styles ===
			// window.observeElementChange(userInputContainer, () => {
			// 	if (DEBUG) console.log(`${PREFIX} userInputContainer changed...`);
			// 	init()
			// })

			window.addEventListener('getClick', clickHandler);
			// reset everything on a page change (reinitialize after page change)
			window.observePageChange([reset]);

		} else {
			if (DEBUG) console.log(`${PREFIX} Waiting for GPTU-UIC-B utils registry...`);
		}
	}, 800);
}

// ===[Reset Entire GPTU-UIC-B]===
function reset() {
	if (DEBUG) console.log(`${PREFIX} Resetting UI containers and utils...`);

	// 1) Kill each util
    try {
        window.__registry__[window.PROMPT_COMPRESSOR_ID].methods.kill_method();
    } catch (e) {
        if (DEBUG) console.error(`${PREFIX} Error while killing utils: ${e}`);
    }

    // 2) kill GPTU-UIC-B
    try {
        if (typeof window.kill_GPTU_UIC_B === 'function') window.kill_GPTU_UIC_B();
    } catch (e) {
        if (DEBUG) console.error(`${PREFIX} Error while killing GPTU_UIC_B: ${e}`);
    }
	
    // 3) clear references and styles
	if (GPTU_UIC_B_CONTAINER) GPTU_UIC_B_CONTAINER.style.zIndex = -1;
    userInputContainer = null;
    GPTU_UIC_B_CONTAINER = null;

    // 4) reinitialize
    setTimeout(init, 50);
}