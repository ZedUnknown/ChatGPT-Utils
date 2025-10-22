const DEBUG = false;
const PREFIX = 'Word Counter |';

const THEME = {
	'dark': {
		'color': '#b4b4b4',
		'thresholds': {
			'low': [100, '#ffffff'],
			'medium': [500, '#50ed64'],
			'high': [720, '#f1da5a'],
			'extreme': [1000, '#ff7070'],
			'super': [2000, '#ff0000']
		}
	},
	'light': {
		'color': '#5d5d5d',
		'thresholds': {
			'low': [100, '#000000'],
			'medium': [500, '#009b14'],
			'high': [720, '#d78300'],
			'extreme': [1000, '#ff3f3f'],
			'super': [2000, '#ff0000']
		}
	}
};

// ===[Util Registry]===
// Util Registry (registering to 'PARENT_CONTAINER' container)
// containes any method, variable which need to be access from other scripts
window.registerUtil({
	[window.WORD_COUNTER_ID] : {
		methods: {
			create_method: init,
			toggle_method: toggleWordCounter,
			kill_method: killWordCounter,
		},
		configs: {
			enable: false,
		},
		variables: {}
	}
})

// ===[Init]===
let PARENT_CONTAINER = null;
let PARENT_CONTAINER_ID = null;
function init() {
	if (DEBUG) console.log(`${PREFIX} init called...`);

	// checking libraries
	checkLibraries().then((result) => {
		if (result) {
			// take the parent container and create and append the util
			window.get_GPTU_UIC_R().then(({id, container}) => {
				if (DEBUG) console.log(`${PREFIX} The PARENT_CONTAINER container was successfully located: ${id}`);
				PARENT_CONTAINER = container;
				PARENT_CONTAINER_ID = id;

				// create the word counter
				if (PARENT_CONTAINER && PARENT_CONTAINER_ID) {
					window.__registry__[window.WORD_COUNTER_ID].variables.container = PARENT_CONTAINER_ID
					createWordCounter(PARENT_CONTAINER);
				}
			});
		}
	});
}

// ===[Create Word Counter Element]===
const WordCounter_Element = document.createElement('div'); // inside GPTU_UIC_R

function createWordCounter(parentContainer) {
	// update theme if exists
	if (document.getElementById(window.WORD_COUNTER_ID)) {
		if (DEBUG) console.log(`${PREFIX} Updating the word counter theme to: ${window.currentTheme}.`);
		WordCounter_Element.style.color = THEME[window.currentTheme]['color'];
		return;
	} else {
		// try to create the word counter
		if (DEBUG) console.log(`${PREFIX} Attempting to create the word counter...`);
		if (DEBUG) console.log(`${PREFIX} The word counter has been created successfully.`);
		WordCounter_Element.id = window.WORD_COUNTER_ID;
		WordCounter_Element.style.display = 'block';
		WordCounter_Element.style.padding = '0.1rem 0.1rem 0.1rem 0.1rem';
		WordCounter_Element.style.textAlign = 'right';

		parentContainer.appendChild(WordCounter_Element);
		if (DEBUG) console.log(`${PREFIX} The word counter has been inserted successfully.`);
		createWordCounter();
	}
}

// ===[Toggle Method]===
function toggleWordCounter(hide, currentSelection='') {
	if (!WordCounter_Element) {
		createWordCounter();
	}
	if (hide) {
		if (DEBUG) console.log(`${PREFIX} Hiding the word counter.`);
        WordCounter_Element.style.top = '0rem';
        WordCounter_Element.style.opacity = '0';
	} else {
		if (DEBUG) console.log(`${PREFIX} Showing the word counter.`);
        WordCounter_Element.style.top = '0rem';
        WordCounter_Element.style.opacity = '1';
		countWords(currentSelection);
	}
}

// ===[Kill Method]===
function killWordCounter() {
    if (DEBUG) console.log(`${PREFIX} 🪦 Killing the word counter...`);
    
    if (WordCounter_Element) {
		WordCounter_Element.remove();
    }

    // remove by ID (for some reason if the element remains)
    const element = document.getElementById(window.WORD_COUNTER_ID);
    if (element) element.remove();
}

// ===[Count Words]===
function countWords(text) {
	if (DEBUG) console.log(`${PREFIX} Text to be counted: ${text}`);
	if (text) {
		let count = window.Alfaaz.countWords(text);
		showWordCount(count);
	}
}

// ===[Show Word Count]===
function showWordCount(wordCount) {
	const thresholds = THEME[currentTheme]['thresholds'];
	let color = thresholds['low'][1]; // default

	// applying color based on thresholds
	if (wordCount >= thresholds['super'][0]) {
		color = thresholds['super'][1];
	} else if (wordCount >= thresholds['extreme'][0]) {
		color = thresholds['extreme'][1];
	} else if (wordCount >= thresholds['high'][0]) {
		color = thresholds['high'][1];
	} else if (wordCount >= thresholds['medium'][0]) {
		color = thresholds['medium'][1];
	} else if (wordCount >= thresholds['low'][0]) {
		color = thresholds['low'][1];
	}

	WordCounter_Element.innerHTML = `Word count: <span style="color: ${color}">${wordCount}</span>`;
}

// checks for word counter libraries
function checkLibraries() {
	return new Promise((resolve, reject) => {
		const interval = 500;
		const timeout = 5000;
		let elapsed = 0;
		const checkLibraries = setInterval(() => {
			if (DEBUG) console.log(`${PREFIX} Checking for the required word counter libraries...`);
			if (document.getElementById('GPTU-script-alfaaz')) {
				clearInterval(checkLibraries);
				if (DEBUG) console.log(`${PREFIX} The required word counter scripts ('alfaaz') have been loaded.`);
				resolve(true);
			} else {
				if (DEBUG) console.warn(`${PREFIX} The required word counter scripts ('alfaaz') are missing. Please ensure they are loaded.`);
				elapsed += interval;
				if (elapsed > timeout) {
					clearInterval(checkLibraries);
					reject(false);
				}
			}
		}, interval);
	})
}

// ===[Theme Listener]===
window.addEventListener('themeChanged', (e) => {
	createWordCounter();
});