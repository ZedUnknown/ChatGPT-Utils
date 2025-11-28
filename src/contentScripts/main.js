(function () {

const DEBUG = false;
const PREFIX = 'Main |';

// script injection logic
// sequencial injection
async function injectScriptsSequentially(scriptsObject) {
    for (const [category, scripts] of Object.entries(scriptsObject)) {
        if (Array.isArray(scripts)) {
            await injectScriptToPage(scripts[0], scripts[1], category);
        } else {
            for (const [id, [filePath, type]] of Object.entries(scripts)) {
                await injectScriptToPage(filePath, type, id);
            }
        }
    }
    if (DEBUG) console.log(`${PREFIX} All scripts injected sequentially.`);
}

function injectScriptToPage(filePath, type, script_id) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = chrome.runtime.getURL(filePath);
        script.type = type;
        if (script_id) script.id = "GPTU-script-" + script_id;

        script.onload = () => {
            if (DEBUG) console.log(`${PREFIX} loaded: ${filePath}`);
            resolve();
        };
        script.onerror = (err) => {
            if (DEBUG) console.error(`${PREFIX} failed to load script: ${filePath} error: ${err}`);
            reject(err);
        };

        document.head.appendChild(script);
    });
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
    },
    'containers' : {
        'userInputContainer' : ['injectedScripts/containers/grand_containers/userInputContainer.js', 'module'],
        'GPTU-UIC-R' : ['injectedScripts/containers/new_containers/GPTU-UIC-R.js', 'module'],
        'GPTU-UIC-B' : ['injectedScripts/containers/new_containers/GPTU-UIC-B.js', 'module'],
    },
    'utils' : {
        'tokenCounter' : ['injectedScripts/utils/tokenCounter/tokenCounter.js', 'module'],
        'wordCounter' : ['injectedScripts/utils/wordCounter/wordCounter.js', 'module'],
        'promptCompressor':  ['injectedScripts/utils/promptCompressor/promptCompressor.js', 'module'],
    },
    'triggers' : {
        'trig_GPTU-UIC-R' : ['injectedScripts/triggers/trig_GPTU-UIC-R.js', 'module'],
        'trig_GPTU_UIC_B' : ['injectedScripts/triggers/trig_GPTU-UIC-B.js', 'module'],
    },
    'end-helpers' : {
        'utilsConfigUpdate' : ['injectedScripts/helpers/end_helpers/utilsConfigUpdate.js', 'module'],
        'watchers': ['injectedScripts/helpers/end_helpers/watchers.js', 'module'],
        'storageManager' : ['injectedScripts/helpers/end_helpers/storageMediator.js', 'module'],
    }
}

injectScriptsSequentially(scripts);

/* reset the extension icon to its normal state on page load
(bug fix: this prevents the active icon from persisting after a page reload) */
chrome.runtime.sendMessage({
    action: 'setIcon',
    state: 'normal'
});

})();