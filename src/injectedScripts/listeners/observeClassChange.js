const DEBUG = false;
const PREFIX = 'Observer Class Change |';

// observes changes to the 'class' attribute of a given element
// use for detecting theme changes on the html tag
window.observeClassChange = function (element, callback) {
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
