(function () {

const DEBUG = false;
const PREFIX = 'Main |';

// script injection logic
function injectScriptToPage(filePath, type, script_id) {
    const script = document.createElement('script');
    script.src = chrome.runtime.getURL(filePath);
    script.type = type;
    if (script_id) script.id = "GPTU-script-" + script_id;
    document.head.appendChild(script);
    script.onerror = (err) => {
        if (DEBUG) console.error(`${PREFIX} failed to load script: ${filePath} error: ${err}`);
    };
}

/*
sequencial injection
category_name : {script_id : [filePath, type]}

bug : 'text/javascript' runs before 'module' scripts
fix : changed all 'text/javascript' to 'module' giving them script wise isolation
*/
const scripts = {
    'globals' : {
        'globals' : ['injectedScripts/globals/globals.js', 'module']
    },
    'listeners' : {
        'observePageChange' : ['injectedScripts/listeners/observePageChange.js', 'module'],
        'observeClassChange' : ['injectedScripts/listeners/observeClassChange.js', 'module'],
        'observeElementChange' : ['injectedScripts/listeners/observeElementChange.js', 'module'],
        'selectionChange' : ['injectedScripts/listeners/selectionChange.js', 'module'],
        'onClick': ['injectedScripts/listeners/onClick.js', 'module'],
    },
    'libs' : {
        'o200k_base' : ['injectedScripts/libs/tokenizers/o200k_base.js', 'module'],
        'cl100k_base' : ['injectedScripts/libs/tokenizers/cl100k_base.js', 'module'],
        'alfaaz' : ['injectedScripts/libs/alfaaz/alfaaz.js', 'module'],
    },
    'start-helpers' : {
        'utilRegistry' : ['injectedScripts/helpers/start_helpers/utilRegistry.js', 'module'],
        'themeManager' : ['injectedScripts/helpers/start_helpers/themeManager.js', 'module'],
        'getStyleSnapshot' : ['injectedScripts/helpers/start_helpers/stylesSnapshot.js', 'module'],
        'storageManager' : ['injectedScripts/helpers/start_helpers/storageMediator.js', 'module'],
    },
    'containers' : {
        'userInputContainer' : ['injectedScripts/containers/grand_containers/userInputContainer.js', 'module'],
        'GPTU-UIC-R' : ['injectedScripts/containers/new_containers/GPTU-UIC-R.js', 'module'],
        'GPTU-UIC-B' : ['injectedScripts/containers/new_containers/GPTU-UIC-B.js', 'module'],
    },
    'triggers' : {
        'trig_GPTU-UIC-R' : ['injectedScripts/triggers/trig_GPTU-UIC-R.js', 'module'],
        'trig_GPTU_UIC_B' : ['injectedScripts/triggers/trig_GPTU-UIC-B.js', 'module'],
    },
    'utils' : {
        'tokenCounter' : ['injectedScripts/utils/tokenCounter/tokenCounter.js', 'module'],
        'wordCounter' : ['injectedScripts/utils/wordCounter/wordCounter.js', 'module'],
        'promptCompressor':  ['injectedScripts/utils/promptCompressor/promptCompressor.js', 'module'],
    },
    'end-helpers' : {
        'utilsConfigUpdate' : ['injectedScripts/helpers/end_helpers/utilsConfigUpdate.js', 'module'],
    }
}

for (const [key, value] of Object.entries(scripts)) {
    if (Array.isArray(value)) {
        if (DEBUG) console.log(`${PREFIX} injecting: ${key} : ${value[0]}`);
        injectScriptToPage(value[0], value[1], key)
    } else {
        for (const [_key, _value] of Object.entries(value)) {
            if (DEBUG) console.log(`${PREFIX} injecting: ${_key} : ${_value[0]}`);
            injectScriptToPage(_value[0], _value[1], _key)
        }
    }
}

/* reset the extension icon to its normal state on page load
(bug fix: this prevents the active icon from persisting after a page reload) */
chrome.runtime.sendMessage({
    action: 'setIcon',
    state: 'normal'
});

})();