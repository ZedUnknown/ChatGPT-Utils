// attach observer to userInputContainer to detect changes
window.getUserInputContainer().then((userInputContainer) => {
	window.observeElementChange(userInputContainer, () => {
		if (DEBUG) console.log(`${PREFIX} userInputContainer changed...`);
		window.getUserInputContainer().then((container) => {
			window.userInputContainer = container;
		})
	})
})