// ===[Handles the Icon State]===
// Open Overlay
chrome.action.onClicked.addListener(async (tab) => {
	try {
		const url = new URL(tab.url);
		const allowedHosts = ["chat.openai.com", "chatgpt.com"];
		if (allowedHosts.includes(url.hostname)) {
			await chrome.scripting.executeScript({
				target: { tabId: tab.id },
				files: ["overlay.js"]
			});
		} else {
			// open ChatGPT when not on ChatGPT
			await chrome.tabs.create({url: "https://chat.openai.com/"});
		}
	} catch (error) {
		console.error("Failed to execute script:", error);
	}
});

// Send by Content Script
// chrome.runtime.sendMessage({
//     action: 'setIcon',
//     path: iconStates['normal']
// });
chrome.runtime.onMessage.addListener((request) => {
	console.log(request);
	console.log("requested: " + request.action + "\n" + "path: " + request.path);

	try {
		if (request.action === "setIcon") {
			chrome.action.setIcon({ path: request.path });
		}
		return 0;
		
	} catch (e) {
		console.log(e);
		return 1;
	}
})