const DEBUG = false;
const PREFIX = 'GPTU-UIC-B |';

const ID = 'GPTU-UIC-B';
const GPTU_UIC_B = document.createElement('div');

// update theme
let currentTheme = window.currentTheme;
window.addEventListener('themeChanged', (e) => {
    currentTheme = e.detail.theme;
	// window.get_GPTU_UIC_B(); <-- not needed as all utils will call this when they detect a theme update
});

let userInputContainer = null
window.get_GPTU_UIC_B = function () {
	return new Promise((resolve, reject) => {
		let elapsed = 0
		const interval = 500
		const timeout = 5000
	
		const parentInterval = setInterval(async () => {
			userInputContainer = await window.getUserInputContainer()
			if (userInputContainer) {
				clearInterval(parentInterval)
				if (DEBUG) console.log(`${PREFIX} Found userInputContainer:`, userInputContainer);
				
				// update theme if exists
				if (document.getElementById(ID)) {
					if (DEBUG) console.log(`${PREFIX} Updating the ${ID} theme to: ${currentTheme}.`);
                    const isDark = (window.currentTheme === 'dark');
                    GPTU_UIC_B.classList.toggle('dark', isDark);
					resolve({id: ID, container: GPTU_UIC_B});
				} else {
					// try..!!! to create a new
					if (DEBUG) console.log(`${PREFIX} Attempting to create the ${ID}...`);
					GPTU_UIC_B.id = ID;;
					if (DEBUG) console.log(`${PREFIX} The ${ID} has been created successfully.`);
	
					// append to PARENT_CONTAINER and return
					userInputContainer.appendChild(GPTU_UIC_B);
					if (DEBUG) console.log(`${PREFIX} The ${ID} has been inserted to ${userInputContainer} successfully.`);
					resolve({id: ID, container: GPTU_UIC_B});
				}
			} else {
				if (DEBUG) console.log(`${PREFIX} Waiting for ${userInputContainer}...`);
				
				elapsed += interval
				if (elapsed >= timeout) {
					clearInterval(parentInterval);
					reject(new Error(`${PREFIX} Timed out after ${timeout}ms while waiting for ${userInputContainer}.`));
				}
			}
		}, interval);
	})
}

window.kill_GPTU_UIC_B = function () {
	if (DEBUG) console.log(`${PREFIX} 🪦 Killing the ${ID}...`);
	const _GPTU_UIC_B = document.getElementById(ID) || null;
	if (GPTU_UIC_B) _GPTU_UIC_B.remove();
}