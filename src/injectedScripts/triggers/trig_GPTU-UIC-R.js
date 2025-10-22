const DEBUG = false;
const PREFIX = 'trig_GPTU-UIC-R |';

// ===[Containers]===
let userInputContainer = null;
let GPTU_UIC_R_ID = null;
let GPTU_UIC_R_CONTAINER = null;

// ===[Handlers]===
let selectionHandler = null;

// ===[Snapshots]===
let userInputContainerStyles = null;
let GPTU_UIC_R_CONTAINER_STYLES = null;

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
			* take the GPTU_UIC_R_CONTAINER and run:
			*    - create_method
			*    - triggerSetUp
			*/
			window.get_GPTU_UIC_R().then(({id, container}) => {
				if (DEBUG) console.log(`${PREFIX} Found parentContainer:`, container);
				GPTU_UIC_R_ID = id;
				GPTU_UIC_R_CONTAINER = container;
				// copy only required styles
				GPTU_UIC_R_CONTAINER_STYLES = window.getStylesSnapshot(GPTU_UIC_R_CONTAINER, ['width', 'height', 'left', 'top', 'right', 'bottom', 'borderRadius']);
				
				try {
					// prevent recreation if util is disabled in initial storage update in 'utilsConfigUpdate'
					if (window.__registry__[window.TOKEN_COUNTER_ID].configs.enable) window.__registry__[window.TOKEN_COUNTER_ID].methods.create_method();
					if (window.__registry__[window.WORD_COUNTER_ID].configs.enable) window.__registry__[window.WORD_COUNTER_ID].methods.create_method();
				} catch (e) {
					if (DEBUG) console.error(`${PREFIX} Error creating utils: ${e}`);
				}
	
				// trigger It! :D
				triggerSetUp();
			})
			.catch ((err) => {
				if (DEBUG) console.error(`${PREFIX} Error getting GPTU_UIC_R_CONTAINER: ${err}`);
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

			// prevent multiple listeners
			if (selectionHandler) return;

			// callback function for 'getSelection'
			selectionHandler = (event) => {

				// If all utils are disabled, do nothing (deprecate in future ??)
				if (Object.values(window.__registry__).every(value => value?.configs?.enable === false)) {
					if (DEBUG) console.log(`${PREFIX} All utils are disabled.`);
					return;
				};

				const selection = event.detail.selection;
				const isTextSelected = Boolean(selection);

				// === Apply grandparent container styles ===
				window.observeElementChange(userInputContainer, () => {
					if (DEBUG) console.log(`${PREFIX} userInputContainer changed...`);
					init()
				})

				const border = isTextSelected ? '28px 0px 28px 28px' : '28px 28px 28px 28px';
				userInputContainer.style.setProperty('border-radius', border, 'important');
				userInputContainer.style.borderRadius = border;

				// === Apply parent container styles ===
				GPTU_UIC_R_CONTAINER.style.bottom = isTextSelected ? '100%' : '0';
				GPTU_UIC_R_CONTAINER.style.marginBottom = isTextSelected ? '0' : '5px';
				GPTU_UIC_R_CONTAINER.style.borderRadius = isTextSelected ? "18px 18px 0px 0px" : userInputContainerStyles.borderRadius;
				GPTU_UIC_R_CONTAINER.style.opacity = isTextSelected ? 1 : 0;

				// ===[Toggle all utils]===
				if (isTextSelected) {
					if (DEBUG) console.log(`${PREFIX} Showing.`);
						if (window.__registry__[window.TOKEN_COUNTER_ID].configs.enable) window.__registry__[window.TOKEN_COUNTER_ID].methods.toggle_method(false, selection);
						if (window.__registry__[window.WORD_COUNTER_ID].configs.enable) window.__registry__[window.WORD_COUNTER_ID].methods.toggle_method(false, selection);
				} else {
					if (DEBUG) console.log(`${PREFIX} Hiding.`);
						window.__registry__[window.TOKEN_COUNTER_ID].methods.toggle_method(true);
						window.__registry__[window.WORD_COUNTER_ID].methods.toggle_method(true);
				}
			};
			window.addEventListener('getSelection', selectionHandler);

			// reset everything on a page change (reinitialize after page change)
			window.observePageChange([reset]);
		} else {
			if (DEBUG) console.log(`${PREFIX} Waiting for GPTU-UIC-R utils registry...`);
		}
	}, 800);
}

// ===[Reset Entire GPTU-UIC-R]===
function reset() {
	if (DEBUG) console.log(`${PREFIX} Resetting UI containers and utils...`);

	// 1) Kill each util
    try {
        window.__registry__[window.TOKEN_COUNTER_ID].methods.kill_method();
		window.__registry__[window.WORD_COUNTER_ID].methods.kill_method();
    } catch (e) {
        if (DEBUG) console.error(`${PREFIX} Error while killing utils: ${e}`);
    }

    // 2) kill GPTU-UIC-R
    try {
        if (typeof window.kill_GPTU_UIC_R === 'function') window.kill_GPTU_UIC_R();
    } catch (e) {
        if (DEBUG) console.error(`${PREFIX} Error while killing GPTU_UIC_R: ${e}`);
    }

    // 3) clear references and snapshots
    userInputContainer = null;
    GPTU_UIC_R_CONTAINER = null;
    userInputContainerStyles = null;
    GPTU_UIC_R_CONTAINER_STYLES = null;

    // 4) reinitialize
    setTimeout(init, 50);
}