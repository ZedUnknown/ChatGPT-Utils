const DEBUG = false;
const PREFIX = 'Util Registry |';

/**
* registers a utility globally.
* @param {string} util_id - unique identifier for this util
* @param {object} methods - must include { create_method, toggle_method, kill_method, ... }
* @param {object} storage - must include { enable: boolean, ... }
* @param {object} variables - optional shared variables

===[Template for Reference]===

window.__registry__ = {
	util_id: {
		methods: {
			create_method: func,
			toggle_method: func,
			kill_method: func,
		},
		configs: {
			enable: boolean
		},
		variables: {
			any: any
		}
	}
}
*/

// util_id, methods = {}, configs = {}, variables = {}
window.registerUtil = function (obj) {
    const util_id = Object.keys(obj)[0];
    const data = obj[util_id];
    const { methods, configs, variables } = data || {};

    // validate MUST HAVE keys
    if (!methods || !configs || !variables) {
        if (!methods) console.warn(`${PREFIX} ${util_id}: Missing key 'methods'.`);
        if (!configs) console.warn(`${PREFIX} ${util_id}: Missing key 'configs'.`);
        if (!variables) console.warn(`${PREFIX} ${util_id}: Missing key 'variables'.`);
        return;
    }

    // validate MUST HAVE methods
    const requiredMethods = ['create_method', 'toggle_method', 'kill_method'];
    for (const method of requiredMethods) {
        if (!methods[method]) console.warn(`${PREFIX} ${util_id}: Missing ${method}.`);
    }

    window.__registry__ = window.__registry__ || {};

    if (window.__registry__[util_id] && DEBUG) {
        console.warn(`${PREFIX} ${util_id} already exists. Overwriting...`);
    }

    window.__registry__[util_id] = data;

    if (DEBUG) console.log(`${PREFIX} Registered: ${util_id}`);
};

window.getUtilInfo = function (util_id) {
    return window.__registry__?.[util_id] || null;
};


/*                                                                                           
// execute a given method on all enabled utils.
// *under development*

window.executeAllUtils = function (methodName, ...args) {
    const registry = window.__registry__;
    if (!registry) return;

    for (const [util_id, util] of Object.entries(registry)) {
        const fn = util.methods?.[methodName];
        if (typeof fn === 'function' && util.configs.enable) {
            try {
                fn(...args);
            } catch (err) {
                console.error(`${PREFIX} Error executing ${methodName} on ${util_id}:`, err);
            }
        }
    }
};
*/                                                                                          