// Script injection
function injectScriptToPage(filePath, type, id) {
    const script = document.createElement('script');
    script.src = chrome.runtime.getURL(filePath);
    script.type = type;
    if (id) script.id = id;
    document.head.appendChild(script);
    script.onerror = (err) => {
        console.error(`Failed to load script: ${filePath}`);
    }
}

// Injecting libraries
injectScriptToPage('libs/o200k_base.js', 'module', 'o200k_base');
injectScriptToPage('libs/cl100k_base.js', 'module', 'cl100k_base');

// Injecting Utils
injectScriptToPage('utils/tokenCounter.js', 'text/javascript', 'tokenCounter');