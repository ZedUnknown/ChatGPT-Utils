const DEBUG = false;
const PREFIX = 'Utils State Update |';

// ===[Config Retrieval Listener for Util States]===
/* custom event from storageManager_in, linked to 'chrome.storage.onChanged'
controlled by the 'configUpdated' event from config
everytime util is created update the code below */

document.addEventListener('configUpdated', (e) => {
    // stored config (refer to template in overlayConfig.js)
	const config = e.detail.packet;
    if (DEBUG) console.log(`${PREFIX} configUpdated event detected | ${JSON.stringify(config)}`);

    // [Token Counter]
	if (config?.utils?.tokenCounter?.enable !== undefined) {
        // same object in memory
        const tokenCounter = window.__registry__[window.TOKEN_COUNTER_ID];
		// for safety it uses the global updated config if the passed one gives unexpected values
		let enable = config.utils.tokenCounter.enable || window.__config__.utils.tokenCounter.enable;

        // ENABLE/DISABLE : if there is a change in the state, then update the state
        if (enable !== tokenCounter.configs.enable) {
            if (DEBUG) console.log(`${PREFIX} Token Counter: ${enable ? 'Enabled' : 'Disabled'}`);
            // custom declared events
            enable ? tokenCounter.methods.create_method() : tokenCounter.methods.kill_method();
            // update the registry
            tokenCounter.configs.enable = enable;
        }
        // TOKENIZER
        let tokenizer = config.utils.tokenCounter.options.tokenizer || window.__config__.utils.tokenCounter.options.tokenizer;
        if (DEBUG) console.log(`${PREFIX} Tokenizer: ${tokenizer}`);
        if (tokenizer !== tokenCounter.configs.tokenizer) {
            // custom declared events
            // tokenCounter.methods.set_tokenizer(tokenizer);
            // update the registry
            tokenCounter.configs.tokenizer = tokenizer;
        }
	}
    // [Word Counter]
    if (config?.utils?.wordCounter?.enable !== undefined) {
        // same object in memory
        const wordCounter = window.__registry__[window.WORD_COUNTER_ID];
        // for safety it uses the global updated config if the passed one gives unexpected values
        let enable = config.utils.wordCounter.enable || window.__config__.utils.wordCounter.enable;
        // if there is a change in the state, then update the state
        if (enable !== wordCounter.configs.enable) {
            if (DEBUG) console.log(`${PREFIX} Word Counter: ${enable ? 'Enabled' : 'Disabled'}`);
            // custom declared events
            enable ? wordCounter.methods.create_method() : wordCounter.methods.kill_method();
            // update the registry
            wordCounter.configs.enable = enable;
        }
	}
});