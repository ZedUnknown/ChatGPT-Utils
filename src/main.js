// script injection logic
function injectScriptToPage(filePath, type, script_id) {
    const script = document.createElement('script');
    script.src = chrome.runtime.getURL(filePath);
    script.type = type;
    if (script_id) script.id = script_id;
    document.head.appendChild(script);
    script.onerror = (err) => {
        console.error(`failed to load script: ${filePath}`);
    };
}

// injecting tokenizer libraries for token counting
injectScriptToPage('libs/o200k_base.js', 'module', 'o200k_base');
injectScriptToPage('libs/cl100k_base.js', 'module', 'cl100k_base');

// injecting core utility scripts
injectScriptToPage('utils/tokenCounter.js', 'text/javascript', 'tokenCounter');

// injecting helper scripts for inter-script communication
injectScriptToPage('helpers/storageManager_in.js', 'module', 'storageManager_in');

// reset the extension icon to its normal state on page load
// (bug fix: this prevents the active icon from persisting after a page reload)
chrome.runtime.sendMessage({
    action: 'setIcon',
    state: 'normal'
});