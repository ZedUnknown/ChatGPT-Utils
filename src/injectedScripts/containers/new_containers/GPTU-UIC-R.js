const DEBUG = false;
const PREFIX = 'GPTU-UIC-R |';

const ID = 'GPTU-UIC-R';
const GPTU_UIC_R = document.createElement('div');

// update theme
window.addEventListener('themeChanged', (e) => {
	window.get_GPTU_UIC_R();
});

let userInputContainer = null
window.get_GPTU_UIC_R = function () {
	return new Promise((resolve, reject) => {
		let elapsed = 0
		const interval = 500
		const timeout = 5000
	
		const parentInterval = setInterval(async () => {
			userInputContainer = await window.getUserInputContainer()
			if (userInputContainer || userInputContainer instanceof Element) {
				clearInterval(parentInterval)
				if (DEBUG) console.log(`${PREFIX} Found userInputContainer:`, userInputContainer);
				
				// ===[Initial Styles for userInputContainer]===
				userInputContainer.style.setProperty('transition', 'border-radius 0.2s ease-in-out', 'important');

				// ===[Initial Styles for GPTU-UIC-R]===
				const initialBorderRadius = window.getStylesSnapshot(userInputContainer, ['borderRadius']).borderRadius

				// update theme if exists
				if (document.getElementById(ID)) {
					if (DEBUG) console.log(`${PREFIX} Updating the ${ID} theme to: ${window.currentTheme}.`);
                    const isDark = (window.currentTheme === 'dark');
                    GPTU_UIC_R.classList.toggle('dark', isDark);
					resolve({id: ID, container: GPTU_UIC_R});
				} else {
					// try..!!! to create a new
					if (DEBUG) console.log(`${PREFIX} Attempting to create the ${ID}...`);
					GPTU_UIC_R.id = ID;
					GPTU_UIC_R.style.borderRadius = initialBorderRadius;
					if (DEBUG) console.log(`${PREFIX} The ${ID} has been created successfully.`);
	
					// append to PARENT_CONTAINER and return
					userInputContainer.appendChild(GPTU_UIC_R);
					if (DEBUG) console.log(`${PREFIX} The ${ID} has been inserted to ${userInputContainer} successfully.`);
					resolve({id: ID, container: GPTU_UIC_R});
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

window.kill_GPTU_UIC_R = function () {
	if (DEBUG) console.log(`${PREFIX} 🪦 Killing the ${ID}...`);
	const _GPTU_UIC_R = document.getElementById(ID) || null;
	if (GPTU_UIC_R) _GPTU_UIC_R.remove();
}