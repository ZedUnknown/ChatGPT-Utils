/*  
monitors changes to the HTML element's class attribute,  
detects if 'dark' class is present, updates the current theme,  
and sends a 'themeChanged' event to notify other scripts.  
*/

const DEBUG = false;
const PREFIX = 'Theme Listener |';

// ===[Initial Setup on Load]===
(function setupThemeObserver() {
    let mainHTML = document.documentElement; // <html> element
    if (DEBUG) console.log(`${PREFIX} Initial theme: ${window.currentTheme}`);

    // listen for theme changes in main HTML
	window.observeClassChange(mainHTML, (newClass) => {
		if (DEBUG) console.log(`${PREFIX} The class attribute has changed: ${newClass}.`);
		updateTheme();
	});
})();

// ===[Event Dispatch For Updated Theme]===
function updateTheme() {
    let mainHTML = document.documentElement; // <html> element
    const newTheme = mainHTML.classList.contains('dark') ? 'dark' : 'light';
    if (DEBUG) console.log(`${PREFIX} The theme has been updated to: ${newTheme}.`);

    if (newTheme !== window.currentTheme) {
        window.currentTheme = newTheme;
        
        // dispatch, update global event for all listening scripts
        const event = new CustomEvent('themeChanged', {
            detail: { theme: newTheme }
        });
        window.dispatchEvent(event);

        if (DEBUG) console.log(`${PREFIX} Theme updated to ${newTheme}`);
    }
}