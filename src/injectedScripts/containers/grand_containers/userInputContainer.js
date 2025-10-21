const DEBUG = false;
const PREFIX = 'User Input Container |';

// seems like they are the same (container = User Typing Box / area)
const userInputContainerClass_Dark = 'bg-token-bg-primary.flex.w-full.cursor-text.flex-col.items-center.justify-center.overflow-clip.bg-clip-padding.contain-inline-size.dark\\:bg-\\[\\#303030\\].shadow-short.rounded-\\[28px\\]';
const userInputContainerClass_Light = 'bg-token-bg-primary.flex.w-full.cursor-text.flex-col.items-center.justify-center.overflow-clip.bg-clip-padding.contain-inline-size.dark\\:bg-\\[\\#303030\\].shadow-short.rounded-\\[28px\\]';

// bottomContainer > oldUserInputContainer == newUserInputContainer
const oldUserInputContainer_ID = 'bg-token-bg-primary'; // 'group\\/composer' or 'bg-token-bg-primary'
const newUserInputContainer_ID = 'userInputContainer_ID';

/* find the bottom container to add the utils
this function may change over time since it require constant adaptation to the
changes made to the UI by Oppenheimer, *cough OpenAI */

// intervals are not being used as it gives the expected result without them
window.getUserInputContainer = function () {
	return new Promise((resolve) => {
		let bottomContainer = document.getElementById("thread-bottom");
		bottomContainer.style.position = 'relative';
	
		// 1. attempt to locate the container by assigned custom ID: bg-token-bg-primary (if already exists)
		let container = document.getElementById(newUserInputContainer_ID);
		if (container) {
			if (DEBUG) console.log(`${PREFIX} The container '${newUserInputContainer_ID}' already exists.`);
			resolve( container );
		}
	
		// 2. attempt to locate the container by UID class name: bg-token-bg-primary)
		if (DEBUG) console.log(`${PREFIX} Attempting to locate the '${newUserInputContainer_ID}' by UID '${oldUserInputContainer_ID}'.`);
		container = bottomContainer.querySelectorAll(`.${oldUserInputContainer_ID}`)[0];
		if (container) {
			if (DEBUG) console.log(`${PREFIX} The ${newUserInputContainer_ID} was found by UID class.`);
			resolve( fix(container) );
		} else {
			container = bottomContainer.querySelectorAll(`.${oldUserInputContainer_ID}`);
			if (container) {
				if (DEBUG) console.log(`${PREFIX} The ${newUserInputContainer_ID} was found by UID class.`);
				resolve( fix(container) );
			}
		}
	
		// 3. attempt to locate the container by structure of the bottomContainer
		if (DEBUG) console.log(`${PREFIX} Attempting to locate the '${newUserInputContainer_ID}' by structure of the bottomContainer.`);
		let paths = [
			[0, 0, 1, 1, 0],
			[0, 0, 1, 1, 1]
		];
	
		for (let path of paths) {
			container = findIt(bottomContainer, path);
			if (container.classList.contains(oldUserInputContainer_ID)) {
				if (DEBUG) console.log(`${PREFIX} The '${newUserInputContainer_ID}' was found by path guessing.`);
				resolve( fix(container) );
			}
		}
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

// fixing certain styles for new container
function fix(container) {
	if (DEBUG) console.log(`${PREFIX} Fixing the user interface elements...`);
	if (container) {
		container.id = newUserInputContainer_ID;
		container.classList.remove('rounded-[28px]');
		container.style.borderRadius = '28px 28px 28px 28px';
		container.classList.remove('overflow-clip');
		container.style.overflow = 'visible';
		container.style.position = 'relative';
		container.style.transition = 'all 0.2s ease-in-out !important';
		container.style.removeProperty('z-index');
		if (DEBUG) console.log(`${PREFIX} The user interface elements have been fixed.`);
		return container;
	} else {
		if (DEBUG) console.log(`${PREFIX} Failed to fix the user interface elements.`);
	}
}