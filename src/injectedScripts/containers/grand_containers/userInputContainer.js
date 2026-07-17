const DEBUG = false;
const PREFIX = 'User Input Container |';

// seems like they are the same (container = User Typing Box / area)
const userInputContainerClass_Dark = 'bg-token-bg-primary.flex.w-full.cursor-text.flex-col.items-center.justify-center.overflow-clip.bg-clip-padding.contain-inline-size.dark\\:bg-\\[\\#303030\\].shadow-short.rounded-\\[28px\\]';
const userInputContainerClass_Light = 'bg-token-bg-primary.flex.w-full.cursor-text.flex-col.items-center.justify-center.overflow-clip.bg-clip-padding.contain-inline-size.dark\\:bg-\\[\\#303030\\].shadow-short.rounded-\\[28px\\]';

// bottomContainer > oldUserInputContainer == newUserInputContainer
const oldUserInputContainer_ID = 'w-full'; // 'group\\/composer' or 'bg-token-bg-primary'
const newUserInputContainer_ID = 'userInputContainer_ID';

/* find the bottom container to add the utils
this function may change over time since it require constant adaptation to the
changes made to the UI by Oppenheimer, *cough OpenAI */

// intervals are not being used as it gives the expected result without them
let container;
window.getUserInputContainer = function () {
	return new Promise((resolve) => {
		const textarea = document.querySelector('textarea');
		if (!textarea) {
			if (DEBUG) console.log(`${PREFIX} Unable to locate the textarea.`);
			resolve(false);
		}

		const nakedRootDiv = textarea.closest('form').querySelector(':scope > div:has(textarea)');

		let bottomContainer = nakedRootDiv // document.getElementById("thread-bottom") || document.getElementById("thread-bottom-container");
		console.log(`${PREFIX} bottomContainer:`, bottomContainer);

		if (!bottomContainer) {
			if (DEBUG) console.log(`${PREFIX} Unable to locate the bottom container.`);
			resolve(false);
		}

		bottomContainer.style.position = 'sticky';
		bottomContainer.style.zIndex = '9999';

		// 1. attempt to locate the container by assigned custom ID: bg-token-bg-primary (if already exists)
		container = document.getElementById(newUserInputContainer_ID);
		if (container && container instanceof Element) {
			if (DEBUG) console.log(`${PREFIX} The container '${newUserInputContainer_ID}' already exists.`);
			window.userInputContainer = container;
			resolve( container );
			return;
		}

		// 2. attempt to locate the container by UID class name: bg-token-bg-primary)
		container = bottomContainer.querySelectorAll(`.${oldUserInputContainer_ID}`)[0];
		if (container && container instanceof Element) {
			if (DEBUG) console.log(`${PREFIX} The ${newUserInputContainer_ID} was found by UID class.`);
			container.id = newUserInputContainer_ID;
			window.userInputContainer = container;
			resolve( container );
			return;
		} else {
			container = bottomContainer.querySelectorAll(`.${oldUserInputContainer_ID}`);
			if (container && container instanceof Element) {
				if (DEBUG) console.log(`${PREFIX} The ${newUserInputContainer_ID} was found by UID class.`);
				container.id = newUserInputContainer_ID;
				window.userInputContainer = container;
				resolve( container );
				return;
			}
		}

		// 3. attempt to locate the container by first child of bottomContainer
		container = bottomContainer.firstElementChild;
		console.log(`${PREFIX} bottomContainer.firstElementChild:`, container);
		if (container && container instanceof Element) {
			if (DEBUG) console.log(`${PREFIX} The ${newUserInputContainer_ID} was found by first child of bottomContainer.`);
			container.id = newUserInputContainer_ID;
			window.userInputContainer = container;
			resolve( container );
			return;
		}


		// 4. attempt to locate the container by structure of the bottomContainer
		let paths = [
			[0, 0, 1, 1, 0],
			[0, 0, 1, 1, 1]
		];

		for (let path of paths) {
			container = findIt(bottomContainer, path);
			if (container.classList.contains(oldUserInputContainer_ID)) {
				if (DEBUG) console.log(`${PREFIX} The '${newUserInputContainer_ID}' was found by path guessing.`);
				container.id = newUserInputContainer_ID;
				window.userInputContainer = container;
				resolve( container );
			}
		}

		resolve(null);
	})
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