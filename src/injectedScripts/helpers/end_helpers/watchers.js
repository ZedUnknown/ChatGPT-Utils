// attach observer to userInputContainer to detect changes
window.getUserInputContainer().then((userInputContainer) => {
	window.observeElementChange(userInputContainer, () => {
		window.getUserInputContainer().then((container) => {
			window.userInputContainer = container;
		})
	})
})