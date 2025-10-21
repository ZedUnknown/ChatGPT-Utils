const DEBUG = false;
const PREFIX = 'GPTU-UIC-R |';

const ID = 'GPTU-UIC-R';
const GPTU_UIC_R = document.createElement('div');

const THEME = {
	'dark': {
		'bg': '#303030',
		'color': '#b4b4b4',
		'border-color': '#363636',
		'boxShadow': 'none',
	},
	'light': {
		'bg': '#ffffff',
		'color': '#5d5d5d',
		'border-color': '#000000',
		'boxShadow': '1px -1px 1px 0px rgba(0,0,0,0.1)',
	}
};

// update theme
let currentTheme = window.currentTheme;
window.addEventListener('themeChanged', (e) => {
    currentTheme = e.detail.theme;
});

let userInputContainer = null
window.get_GPTU_UIC_R = function () {
	return new Promise((resolve, reject) => {
		let elapsed = 0
		const interval = 500
		const timeout = 5000
	
		const parentInterval = setInterval(async () => {
			userInputContainer = await window.getUserInputContainer()
			if (userInputContainer) {
				clearInterval(parentInterval)
				if (DEBUG) console.log(`${PREFIX} Found userInputContainer:`, userInputContainer);
				
				// ===[Initial Styles for userInputContainer]===
				userInputContainer.style.setProperty('transition', 'border-radius 0.2s ease-in-out', 'important');

				// ===[Initial Styles for GPTU-UIC-R]===
				const initialBorderRadius = window.getStylesSnapshot(userInputContainer, ['borderRadius']).borderRadius

				// update theme if exists
				if (document.getElementById(ID)) {
					if (DEBUG) console.log(`${PREFIX} Updating the ${ID} theme to: ${currentTheme}.`);
					GPTU_UIC_R.style.backgroundColor = THEME[currentTheme]['bg'];
					GPTU_UIC_R.style.color = THEME[currentTheme]['color'];
					GPTU_UIC_R.style.boxShadow = THEME[currentTheme]['boxShadow'];
					resolve({id: ID, container: GPTU_UIC_R});
				} else {
					// try..!!! to create a new
					if (DEBUG) console.log(`${PREFIX} Attempting to create the ${ID}...`);
					GPTU_UIC_R.id = ID;
					GPTU_UIC_R.style.display = 'flex';
					GPTU_UIC_R.style.flexDirection = 'column-reverse';
					GPTU_UIC_R.style.position = 'absolute';
					/* this puts the new container to the top
					while allowing it to exapnd to the top */
					GPTU_UIC_R.style.bottom = '5px';
					GPTU_UIC_R.style.right = '0';
					GPTU_UIC_R.style.padding = '0.8rem 0.8rem 0.8rem 0.8rem';
					GPTU_UIC_R.style.zIndex = '-1';
					GPTU_UIC_R.style.borderRadius = initialBorderRadius;
					GPTU_UIC_R.style.fontSize = '0.8rem';
					GPTU_UIC_R.style.overflow = 'hidden';
					GPTU_UIC_R.style.fontFamily = 'monospace';
					GPTU_UIC_R.style.color = THEME[currentTheme]['color'];
					GPTU_UIC_R.style.backgroundColor = THEME[currentTheme]['bg'];
					GPTU_UIC_R.style.boxShadow = THEME[currentTheme]['boxShadow'];
					GPTU_UIC_R.style.pointerEvents = 'none';
	
					GPTU_UIC_R.style.minWidth = '120px';
					GPTU_UIC_R.style.maxWidth = '800px';
					GPTU_UIC_R.style.minHeight = '45px';
	
					GPTU_UIC_R.style.border = '1px solid ' + THEME[currentTheme]['border-color'];
					GPTU_UIC_R.style.borderBottom = 'none';
					GPTU_UIC_R.style.opacity = '1';
	
					// transition animation
					GPTU_UIC_R.style.transition = 'all 0.2s ease-in-out';
	
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