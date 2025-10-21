const DEBUG = false;
const PREFIX = 'Token Counter |';

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

// global names of tokenizers
const tokenizerIds = ['GPTTokenizer_o200k_base', 'GPTTokenizer_cl100k_base'];

// ===[Util Registry]===
// Util Registry (registering to 'PARENT_CONTAINER' container)
// containes any method, variable which need to be access from other scripts
window.registerUtil({
	[window.TOKEN_COUNTER_ID] : {
		methods: {
			create_method: init,
			toggle_method: toggleTokenCounter,
			kill_method: killTokenCounter,
		},
		configs: {
			enable: false,
			tokenizer: 0
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

				// create the token counter
				if (PARENT_CONTAINER && PARENT_CONTAINER_ID) {
					window.__registry__[window.TOKEN_COUNTER_ID].variables.container = PARENT_CONTAINER_ID
					createTokenCounter(PARENT_CONTAINER);
				}
			});
		}
	});
}

// ===[Create Token Counter Element]===
const TokenCounter_Element = document.createElement('div'); // inside GPTU_UIC_R

function createTokenCounter(parentContainer) {
	// update theme if exists
	if (document.getElementById(window.TOKEN_COUNTER_ID)) {
		if (DEBUG) console.log(`${PREFIX} Updating the token counter theme to: ${window.currentTheme}.`);
		TokenCounter_Element.style.color = THEME[window.currentTheme]['color'];
		return;
	} else {
		// try to create the token counter
		if (DEBUG) console.log(`${PREFIX} Attempting to create the token counter...`);
		if (DEBUG) console.log(`${PREFIX} The token counter has been created successfully.`);
		TokenCounter_Element.id = window.TOKEN_COUNTER_ID;
		TokenCounter_Element.style.display = 'block';
		TokenCounter_Element.style.padding = '0.1rem 0.1rem 0.1rem 0.1rem';
		TokenCounter_Element.style.textAlign = 'right';

		parentContainer.appendChild(TokenCounter_Element);
		if (DEBUG) console.log(`${PREFIX} The token counter has been inserted successfully.`);
		createTokenCounter();
	}
}

// ===[Toggle Method]===
function toggleTokenCounter(hide, currentSelection='') {
	if (!TokenCounter_Element) {
		createTokenCounter();
	}
	if (hide) {
		if (DEBUG) console.log(`${PREFIX} Hiding the token counter.`);
		TokenCounter_Element.style.top = '0rem';
		TokenCounter_Element.style.opacity = '0';
	} else {
		if (DEBUG) console.log(`${PREFIX} Showing the token counter.`);
		TokenCounter_Element.style.top = '0rem';
		TokenCounter_Element.style.opacity = '1';
		countTokens(currentSelection, window.__registry__[window.TOKEN_COUNTER_ID].configs.tokenizer);
	}
}

// ===[Kill Method]===
function killTokenCounter() {
    if (DEBUG) console.log(`${PREFIX} 🪦 Killing the token counter...`);
    
    if (TokenCounter_Element) {
        TokenCounter_Element.remove();
    }

    // remove by ID (for some reason if the element remains)
    const element = document.getElementById(window.TOKEN_COUNTER_ID);
    if (element) element.remove();
}

// ===[Token Counter]===
function countTokens(text, tokenizer) {
	if (DEBUG) console.log(`${PREFIX} Text: ${text} | Tokenizer: ${tokenizer} (${typeof tokenizer}) ${tokenizerIds[tokenizer]}`);
	if (typeof tokenizer !== 'number' || tokenizerIds.length - 1 < tokenizer) {
		if (DEBUG) console.log(`${PREFIX} Invalid tokenizer value: ${tokenizer}.`);
		return;
	};
	if (text) {
		const encode = window[tokenizerIds[tokenizer]].encode(text);
		showTokenCount(encode);
	}
}

// ===[Show Token Count]===
function showTokenCount(tokens) {
	const thresholds = THEME[currentTheme]['thresholds'];
	let color = thresholds['low'][1]; // default

	// applying color based on thresholds
	if (tokens.length >= thresholds['super'][0]) {
		color = thresholds['super'][1];
	} else if (tokens.length >= thresholds['extreme'][0]) {
		color = thresholds['extreme'][1];
	} else if (tokens.length >= thresholds['high'][0]) {
		color = thresholds['high'][1];
	} else if (tokens.length >= thresholds['medium'][0]) {
		color = thresholds['medium'][1];
	} else if (tokens.length >= thresholds['low'][0]) {
		color = thresholds['low'][1];
	}

	TokenCounter_Element.innerHTML = `Token count: <span style="color: ${color}">${tokens.length}</span>`;
}

// checks for tokenizer libraries
function checkLibraries() {
	return new Promise((resolve, reject) => {
		const interval = 500;
		const timeout = 5000;
		let elapsed = 0;
		const checkLibraries = setInterval(() => {
			if (DEBUG) console.log(`${PREFIX} Checking for the required tokenizer libraries...`);
			if (document.getElementById('GPTU-script-o200k_base') && document.getElementById('GPTU-script-cl100k_base')) {
				clearInterval(checkLibraries);
				if (DEBUG) console.log(`${PREFIX} The required tokenizer scripts ('o200k_base' or 'cl100k_base') have been loaded.`);
	
				// update the tokenizer
				// tokenizer = window.GPTTokenizer_o200k_base; // multiple-tokenization ability in future
				
				resolve(true);
			} else {
				if (DEBUG) console.warn(`${PREFIX} The required tokenizer scripts ('o200k_base' or 'cl100k_base') are missing. Please ensure they are loaded.`);
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
	createTokenCounter();
});