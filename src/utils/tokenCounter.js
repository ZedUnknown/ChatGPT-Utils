// ===[Constants]===
const DEBUG = false;
const PREFIX = 'Token Counter |';

let bottomContainer = document.getElementById("thread-bottom");
let tokenCounterContainer;

// seems like they are the same (container = User Typing Box / area)
const tokenCounterContainerClass_Dark = 'bg-token-bg-primary.flex.w-full.cursor-text.flex-col.items-center.justify-center.overflow-clip.bg-clip-padding.contain-inline-size.dark\\:bg-\\[\\#303030\\].shadow-short.rounded-\\[28px\\]';
const tokenCounterContainerClass_Light = 'bg-token-bg-primary.flex.w-full.cursor-text.flex-col.items-center.justify-center.overflow-clip.bg-clip-padding.contain-inline-size.dark\\:bg-\\[\\#303030\\].shadow-short.rounded-\\[28px\\]';

const tokenCounterContainer_UID = 'bg-token-bg-primary';
const tokenCounter = document.createElement('div');

// global names of tokenizers
const tokenizers = ['GPTTokenizer_o200k_base', 'GPTTokenizer_cl100k_base'];

// current tokenizer
let tokenizer;

// get current theme & theme setup
let detectTheme;
let currentTheme;

// event listeners bookkeeping (flag to prevent adding the selection listener multiple times)
let selectionListenerAdded = false;

const theme = {
	'dark': {
		'bgToken': '#303030',
		'boxShadow': 'none',
		'colorToken': '#b4b4b4',
		'thresholds': {
			'low': [100, '#ffffff'],
			'medium': [500, '#50ed64'],
			'high': [720, '#f1da5a'],
			'extreme': [1000, '#ff7070'],
			'super': [2000, '#ff0000']
		}
	},
	'light': {
		'bgToken': '#ffffff',
		'boxShadow': '1px -1px 1px 0px rgba(0,0,0,0.1)',
		'colorToken': '#5d5d5d',
		'thresholds': {
			'low': [100, '#000000'],
			'medium': [500, '#009b14'],
			'high': [720, '#d78300'],
			'extreme': [1000, '#ff3f3f'],
			'super': [2000, '#ff0000']
		}
	}
};

// IDs of newly added elements
const newTokenCounter_ID = 'util-tokenCounter';
const newTokenCounterContainer_ID = 'util-tokenCounterContainer'; // added as a class to prevent id clashes

// ===[Memory Variables]===
let ENABLED = true; // controlled by the 'utilsStateUpdated' event from config
// * under development *
let currentTokenizer = tokenizers[0]; // set default tokenizer

// ===[Important Event Listeners]===
window.addEventListener('load', () => {
	requestIdleCallback(() => {

		checkLibraries();
		observePageChange(); // re-run main() if URL changes

	});
});

// custom event from storageManager_in, linked to 'chrome.storage.onChanged'
// enabled or disabled ?
document.addEventListener('utilsStateUpdated', (e) => {
	const config = e.detail;

	if (config?.overlayStates?.checkBoxTokenCounter !== undefined) {
		// for safety it uses the global updated config if the passed one gives unexpected values
		ENABLED = config.overlayStates.checkBoxTokenCounter || window.config.overlayStates.checkBoxTokenCounter;
		if (DEBUG) console.log(`${PREFIX} ${ENABLED ? 'Enabled' : 'Disabled'}`);

		if (!ENABLED) {
			toggleTokenCounter(true); // hide
		}
	} else {
		console.warn(`${PREFIX} State was not found in config...`);
	}
});

// checks for tokenizer libraries
function checkLibraries() {
	const checkLibraries = setInterval(() => {
		if (DEBUG) console.log(`${PREFIX} Checking for the required tokenizer libraries...`);
		if (!document.getElementById('o200k_base') && !document.getElementById('cl100k_base')) {
			console.warn(`${PREFIX} The required tokenizer scripts ('o200k_base' or 'cl100k_base') are missing. Please ensure they are loaded.`);
		} else {
			clearInterval(checkLibraries);
			if (DEBUG) console.log(`${PREFIX} The required tokenizer scripts ('o200k_base' or 'cl100k_base') have been loaded.`);

			// update the tokenizer
			tokenizer = window.GPTTokenizer_o200k_base; // multiple-tokenization ability in future

			// get current theme & theme setup
			setupThemeObserver();

			// fire-up the main!
			setTimeout(main, 50);
		}
	}, 800);
}

// ===[Initialization]===
function main() {
	// find the container and set it up!
	const tryCreate = setInterval(() => {
		tokenCounterContainer = findTokenCounterContainer();

		if (tokenCounterContainer) {
			clearInterval(tryCreate);
			if (DEBUG) console.log(`${PREFIX} The bottom container was successfully located: ${tokenCounterContainer}`);
			
			setTimeout(() => setUp(), 100);

		} else {
			if (DEBUG) console.log(`${PREFIX} The bottom container not found yet, retrying...`);
		}

	}, 800);
}

// find the bottom container to add the token counter element
// this function may change over time since it require constant adaptation to the
// changes made to the UI by Oppenheimer, *cough OpenAI
function findTokenCounterContainer() {
	// 1. attempt to locate the container by assigned custom ID: bg-token-bg-primary (if already exists)
	let container = document.getElementById(newTokenCounterContainer_ID);
	if (container) {
		if (DEBUG) console.log(`${PREFIX} The tokenCounterContainer already exists...`);
		return container;
	}

	// 2. attempt to locate the container by UID class name: bg-token-bg-primary)
	if (DEBUG) console.log(`${PREFIX} Attempting to locate the tokenCounterContainer by UID class...`);
	container = bottomContainer.querySelectorAll('.bg-token-bg-primary')[0];
	if (container) {
		if (DEBUG) console.log(`${PREFIX} The tokenCounterContainer was found by UID class...`);
		return container;
	}

	// 3. attempt to locate the container by structure of the bottomContainer
	if (DEBUG) console.log(`${PREFIX} Attempting to locate the tokenCounterContainer by structure of the bottomContainer...`);
	let paths = [
		[0, 0, 1, 1, 0],
		[0, 0, 1, 1, 1]
	];

	for (let path of paths) {
		container = findIt(bottomContainer, path);
		if (container.classList.contains(tokenCounterContainer_UID)) {
			if (DEBUG) console.log(`${PREFIX} The tokenCounterContainer was found by path guessing...`);
			return container;
		}
	}
}

// ===[Set Up]===
function setUp() {
	if (DEBUG) console.log(`${PREFIX} Setting up the token counter...`);
	fixUI(createTokenCounter); // create after UI is fixed

	// ensure the selection listener is added only once
	if (!selectionListenerAdded) {
		document.addEventListener('selectionchange', () => {
			if (ENABLED) {
				if (DEBUG) console.log(`${PREFIX} The selection has changed.`);
				checkSelection();
			}
		});
		selectionListenerAdded = true;
	}
}

// ===[Create Token Counter]===
function createTokenCounter() {
	// update theme if exists
	if (document.getElementById(newTokenCounter_ID)) {
		if (DEBUG) console.log(`${PREFIX} Updating the token counter theme to: ${currentTheme}.`);
		tokenCounter.style.backgroundColor = theme[currentTheme]['bgToken'];
		tokenCounter.style.color = theme[currentTheme]['colorToken'];
		tokenCounter.style.boxShadow = theme[currentTheme]['boxShadow'];
		return;
	} else {
		// try..!!! to create the token counter
		const tryCreate = setInterval(() => {
			if (DEBUG) console.log(`${PREFIX} Attempting to create the token counter...`);
			if (!document.getElementById(newTokenCounter_ID)) {
				clearInterval(tryCreate);
				if (DEBUG) console.log(`${PREFIX} The token counter has been created successfully.`);
				if (DEBUG) console.log(`${PREFIX} Inserting the token counter into: ${tokenCounterContainer}`);
				tokenCounter.id = newTokenCounter_ID;
				tokenCounter.style.display = 'none';
				tokenCounter.style.position = 'absolute';
				tokenCounter.style.top = '-2.5rem';
				tokenCounter.style.right = '0';
				tokenCounter.style.padding = '0.8rem 0.8rem 0.8rem 0.8rem';
				tokenCounter.style.borderRadius = '18px 18px 0px 0px';
				tokenCounter.style.zIndex = '9999';
				tokenCounter.style.fontSize = '0.8rem';
				tokenCounter.style.fontFamily = 'monospace';
				tokenCounter.style.color = theme[currentTheme]['colorToken'];
				tokenCounter.style.boxShadow = theme[currentTheme]['boxShadow'];
				tokenCounter.style.backgroundColor = theme[currentTheme]['bgToken'];

				// again check if tokenCounterContainer exists
				if (tokenCounterContainer) {
					tokenCounterContainer.appendChild(tokenCounter);
					if (DEBUG) console.log(`${PREFIX} The token counter has been inserted successfully.`);
				} else {
					console.warn(`${PREFIX} The tokenCounterContainer is not available. The token counter cannot be appended.`);
				}
			} else {
				clearInterval(tryCreate);
				createTokenCounter();
			}
		}, 800);
	}
}

// ===[Token Counter]===
function countTokens(text, tokenizerType) {
	// * under development *: future support for selecting tokenizerType
	// if (tokenizerType) setTokenizer(tokenizerType);
	if (DEBUG) console.log(`${PREFIX} Text to be tokenized: ${text}`);
	if (text) {
		const encode = tokenizer.encode(text);
		showTokenCount(encode);
	}
}

// ===[Show Token Count]===
function showTokenCount(tokens) {
	const thresholds = theme[currentTheme]['thresholds'];
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

	tokenCounter.innerHTML = `Token count: <span style="color: ${color}">${tokens.length}</span>`;
	toggleTokenCounter(); // show
}

// * under development *
// sets the active tokenizer
function setTokenizer(name) {
	if (tokenizers.includes(name)) {
		currentTokenizer = name;
		if (DEBUG) console.log(`${PREFIX} The tokenizer has been switched to: ${name}.`);
	}
	if (DEBUG) console.log(`${PREFIX} Tokenizing with: ${tokenizer}.`);
}

// ===[Update Theme]===
function updateTheme() {
	currentTheme = detectTheme.classList.contains('dark') ? 'dark' : 'light';
	if (DEBUG) console.log(`${PREFIX} The theme has been updated to: ${currentTheme}.`);
	createTokenCounter();
}

// ===[Little Helpers]===
// fix the tokenCounterContainer
function fixUI(callback) {
	if (DEBUG) console.log(`${PREFIX} Fixing the user interface elements...`);
	if (tokenCounterContainer) {
		tokenCounterContainer.classList.remove('rounded-[28px]');
		tokenCounterContainer.style.borderRadius = '28px 28px 28px 28px';
		tokenCounterContainer.classList.remove('overflow-clip');
		tokenCounterContainer.style.overflow = 'visible';
		tokenCounterContainer.style.position = 'relative';
		tokenCounterContainer.id = newTokenCounterContainer_ID;
		if (DEBUG) console.log(`${PREFIX} The user interface elements have been fixed.`);
		callback();
	} else {
		if (DEBUG) console.log(`${PREFIX} Failed to fix the user interface elements.`);
	}
}

function toggleTokenCounter(hide) {
	tokenCounter.style.display = hide ? 'none' : 'block';
	
	// container specific fixes: adjust border radius based on visibility
	// since the function is added to an event listener it get fired even when tokenCounterContainer is not available (during a page loading)
	// where it gives an error of `Uncaught TypeError: Cannot read properties of undefined (reading 'style')`
	if (tokenCounterContainer) {
		tokenCounterContainer.style.borderRadius = hide ? '28px 28px 28px 28px' : '28px 0px 28px 28px';
	}
}
// check if text is still selected
function checkSelection() {
	const currentSelection = window.getSelection().toString();
	if (!currentSelection) {
		toggleTokenCounter(true); // hide
	} else {
		countTokens(currentSelection);
	}
}

// listen for theme changes in main HTML
function setupThemeObserver() {
	detectTheme = document.getElementsByTagName('html')[0];
	currentTheme = detectTheme.classList.contains('dark') ? 'dark' : 'light';
	const htmlElement = detectTheme;
	observeClassChange(htmlElement, (newClass) => {
		if (DEBUG) console.log(`${PREFIX} The class attribute has changed: ${newClass}.`);
		updateTheme();
	});
}

// removes added elements
function removeAddedElements() {
	if (DEBUG) console.log(`${PREFIX} Removing the added elements...`);
	const elementIDs = ['tokenCounter', 'tokenCounterContainer'];
	elementIDs.forEach(id => {
		const element = document.getElementById(id);
		if (element) {
			element.remove();
			if (DEBUG) console.log(`${PREFIX} The element has been removed: ${id}.`);
		} else {
			const element = document.getElementsByClassName(id)[0];
			if (element) {
				element.remove();
				if (DEBUG) console.log(`${PREFIX} The element has been removed: ${id}.`);
			}
		}
	});
}

// resets variables and element references
function resetVariables() {
	// reset containers and variables if needed
	bottomContainer = document.getElementById("thread-bottom");
	tokenCounterContainer = undefined;
}

// utility function for child based path finder
function findIt(parent, path) {
	if (!parent || !path) return null;

	let node = parent;
	let _valid = true;

	for (const index of path) {
		if (node && node.children && node.children[index]) {
			node = node.children[index];
		} else {
			_valid = false;
			break;
		}
	}

	if (_valid && node) return node;
	return null;
}

// re-run main() if URL changes
function observePageChange() {
	let lastUrl = location.href;

	new MutationObserver(() => {
		const currentUrl = location.href;
		if (currentUrl !== lastUrl) {
			if (DEBUG) console.log(`${PREFIX} The page has changed from ${lastUrl} to ${currentUrl}.`);

			// ignore specific in-window URLs
			const ignoreUrls = ['settings', 'pricing'];
			const hash = currentUrl.split('#')[1];
			if (hash && ignoreUrls.includes(hash)) {
				if (DEBUG) console.log(`${PREFIX} The URL has been ignored.`);
				return;
			}

			lastUrl = currentUrl;

			// clean up and reset variables
			removeAddedElements();
			resetVariables();

			// wait for the new page to load (this was very painful)
			const waitForContainer = setInterval(() => {
				bottomContainer = document.getElementById("thread-bottom");
				if (bottomContainer) {
					clearInterval(waitForContainer);
					main();
				}
			}, 100);
		}
	}).observe(document, {
		subtree: true,
		childList: true
	});
}

// observes changes to the 'class' attribute of a given element
// use for detecting theme changes on the html tag
function observeClassChange(element, callback) {
	const observer = new MutationObserver(mutations => {
		mutations.forEach(mutation => {
			if (mutation.attributeName === 'class') {
				callback(element.className);
			}
		});
	});
	observer.observe(element, {
		attributes: true,
		attributeFilter: ['class']
	});
}