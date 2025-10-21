const iconStates = {
	'normal' : {
		16: "../assets/icons/default/icon16.png",
        32: "../assets/icons/default/icon32.png",
        48: "../assets/icons/default/icon48.png",
        128: "../assets/icons/default/icon128.png"
    },
    'active' : {
		16: "../assets/icons/active/icon16.png",
        32: "../assets/icons/active/icon32.png",
        48: "../assets/icons/active/icon48.png",
        128: "../assets/icons/active/icon128.png"
    },
    'disabled' : {
		16: "../assets/icons/disabled/icon16.png",
        32: "../assets/icons/disabled/icon32.png",
        48: "../assets/icons/disabled/icon48.png",
        128: "../assets/icons/disabled/icon128.png"
    }
};

// open overlay when clicking on the icon
chrome.action.onClicked.addListener(async (tab) => {
	try {
		const url = new URL(tab.url);
		const allowedHosts = ["chat.openai.com", "chatgpt.com"];
		if (allowedHosts.includes(url.hostname)) {
			await chrome.scripting.executeScript({
				target: { tabId: tab.id },
				files: ["contentScripts/overlay/overlayToggle.js"]
			});
		} else {
			// open ChatGPT when not on ChatGPT
			await chrome.tabs.create({url: "https://chat.openai.com/"});
		}
	} catch (error) {
		console.error("Failed to execute script:", error);
	}
});

// listen and do it ¯\_(ツ)_/¯
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	console.log("requested: " + (JSON.stringify(request) || request));
	try {
		// icon state change request
		if (request.action === "setIcon") {
			chrome.action.setIcon({
				tabId: sender.tab.id, // (bug fix: this prevents the active icon from persisting after a tab change)
				path: iconStates[request.state]
			});
		}
	} catch (error) {
		console.log(error);
	}
});