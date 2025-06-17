// ===[Handles the Icon State]===
chrome.action.onClicked.addListener(async (tab) => {
  await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ["overlay.js"]
  });
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

