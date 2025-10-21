(function () {

const DEBUG = false;
const PREFIX = 'OverlayConfig |';

/* ===[Config Template for Reference]===
{
    dashboard : {},
    utils: {
        tokenCounter: {
            enable: true,
            options: {
                tokenizer: 2
            }
        },
        wordCounter: {
            enable: true,
            options: {
                algorithm: 1
            }
        },
    },
    themes: {},

    * version trigger for forced overwrite if
    * any modification done to the structure of the config
    configOverwriteTrigger: "Y6Kz77WzuTKP"
}
*/

// config overwrite trigger
const configOverwriteTrigger = 'Y6Kz808WzuTKP';

// config key in storage
const configKey = 'config';

// store the config updates in memory in working time (always writes to it first)
let ConfigInMemory = {}

// all input elements
let allInputElements = null;

// 1. do initial update to the listeners
// 2. load the config to the overlay
(async function init() {
    if (DEBUG) console.log(`${PREFIX} init called...`);

    // Create overlay and wait for it to finish
    const shadowDom = await createOverlay();
    allInputElements = shadowDom.querySelectorAll('[data-path]');
    if (DEBUG) console.log(`${PREFIX} Found ${allInputElements.length} input elements.`);
    
    ConfigInMemory = await getConfig();

    if (DEBUG) console.log(`${PREFIX} Config in init: ${JSON.stringify(ConfigInMemory)}`);

    if (!checkConfig(ConfigInMemory)) {
        console.error(`${PREFIX} Critical Error At 'verifyGetConfig()' or 'getDefaultConfig()'`);
        return;
    } else {
        // initial update for all utils
        window.sendInitialUpdate(configKey, 'sync');
    
        // update the elements in the overlay
        updateOverlayElements(ConfigInMemory);
    
        // add event listeners to all input elements
        startListening();
    }
})();

async function getConfig() {

    /*
    just for now
    let _config = {...ConfigInMemory};
    if (!checkConfig(_config)) {
        if (DEBUG) console.log(`${PREFIX} Proceeding to verify...`);
        _config = await verifyGetConfig();
    }
    return _config;
     */
                                                        
    return await verifyGetConfig();
}

function updateOverlayElements(config) {
    allInputElements.forEach((element) => {
        const properties = getElementProperties(element);
        if (DEBUG) console.log(`${PREFIX} ${JSON.stringify(properties)}`);
        try{
            if (element) {
                const value = getValueByPath(config, properties.path);
                if (value === undefined) {
                    // todo: manual config correction here
                    if (DEBUG) console.warn(`${PREFIX} ${properties.path} not found in config...`);
                }

                if (DEBUG) console.log(`${PREFIX} Setting ${properties.path} to ${getValueByPath(config, properties.path)}`);

                if (['boolean', 'bool'].includes(properties.type)) {
                    element.checked = value;
                } 
                else if (['string', 'str'].includes(properties.type)) {
                    element.value = value;
                }
                else if (['integer', 'int', 'number'].includes(properties.type)) {
                    element.value = value;
                } else {
                    if (DEBUG) console.log(`${PREFIX} Unsupported data type for element: ${properties.path}`);
                    if (DEBUG) console.warn(`${PREFIX} Unsupported data type for element: ${properties.path}`);
                }
            }
        } catch (e) {
            if (DEBUG) console.error(`${PREFIX} error ${e}`);
        }
    })
}

function startListening() {
    if (DEBUG) console.log(`${PREFIX} Starting listeners on elements in Overlay...`);
    for (const element of allInputElements) {
        element.addEventListener('change', (el) => {
            if (DEBUG) console.log(`${PREFIX} ${element.getAttribute('data-path')} changed to ${getCurrentValue(element)}`);
            
            const properties = getElementProperties(element);
            const value = getCurrentValue(element);

            if (value != null) {
                setValueByPath(ConfigInMemory, properties.path, value);
                if (DEBUG) console.log(`${PREFIX} Updated ConfigInMemory: ${JSON.stringify(ConfigInMemory)}`);

                /* pass the updated config to the 'storageMediator.js'
                this will automatically happen in 'storageManager.js' */

                window.writeToStorage(configKey, ConfigInMemory, 'sync');

            } else {
                if (DEBUG) console.warn(`${PREFIX} Unsupported data type for element: ${element.dataset.config}`);
            }
        });
    }
}

async function verifyGetConfig() {
    return new Promise((resolve) => {
        window.readFromStorage(configKey).then((data) => {
            const storedConfig = data;
            const defaultConfig = getDefaultConfig();
            if (DEBUG) console.log(`${PREFIX} Stored Config: ${JSON.stringify(storedConfig)}`);
            if (DEBUG) console.log(`${PREFIX} Default Config: ${JSON.stringify(defaultConfig)}`);
            
            // conditions to overwrite
            if (!checkConfig(storedConfig)) {
                if (DEBUG) console.log(`${PREFIX} Writing default config to Chrome sync storage - Default Config: ${JSON.stringify(defaultConfig)}`);
                window.writeToStorage(configKey, defaultConfig, 'sync');
                resolve(defaultConfig)
            } else {
                if (DEBUG) console.log(`${PREFIX} Config is up to date. No overwrite needed.`);
                resolve(storedConfig)
            }
        })
    })
}

function getDefaultConfig() {
    let config = { configOverwriteTrigger: configOverwriteTrigger };

    allInputElements.forEach((element) => {
        if (DEBUG) console.log(`${PREFIX} Input Elements: ${element.getAttribute('data-path')}`);
        try {
            const properties = getElementProperties(element);
            if (DEBUG) console.log(`${PREFIX} Properties: ${JSON.stringify(properties)}`);
            // 1. path validation
            const path = properties.path;
            if (!properties || !path) {
                console.error(`${PREFIX} Element ${element.outerHTML} missing 'path' property.`);
                return;
            }
            // 2. type validation
            const type = properties.type;
            if (!checkType(type)) {
                console.error(`${PREFIX} Element ${element.outerHTML} missing / invalid 'type' property.`);
                return;
            }
            // 3. default value validation
            const defaultValue = getconvertTypes(properties.default, type);
            if (defaultValue === undefined || defaultValue === null) { // prevent if default value is '0' it is taken as falsy value
                console.error(`${PREFIX} Element ${element.outerHTML} missing 'default' property.`);
                return;
            }
            // 4. valid value validation
            let validValues = [];
            if (properties.valid !== undefined && properties.valid !== null) {
                try {
                    validValues = JSON.parse(properties.valid);
                    if (!Array.isArray(validValues)) {
                        if (DEBUG) console.warn(`${PREFIX} 'data-valid' for path '${properties.path}' is not an array.`);
                        validValues = [];

                    }
                } catch (err) {
                    if (DEBUG) console.warn(`${PREFIX} Failed to retrieve 'data-valid' for path '${properties.path}': ${err.message}`);
                    validValues = [];
                }
            }
            // 5. check if all valid values have the same type as the default value
            if (validValues) {
                const parsedDefault = getconvertTypes(defaultValue, properties.type);
                const allValidTypesMatch = validValues.every((value) => {
                    const parsedValue = getconvertTypes(value, properties.type);
                    return typeof parsedValue === typeof parsedDefault;
                });
    
                if (!allValidTypesMatch) {
                    if (DEBUG) console.warn(`${PREFIX} 'properties.valid' for path '${properties.path}' does not have the same type as 'properties.default'.`);
                    return;
                }
            }
            if (DEBUG) console.log(`${PREFIX} Setting ${properties.path} to ${properties.default}`)
            // directly construct the paths to the config
            config = setValueByPath(config, path, defaultValue);

        } catch (e) {
            if (DEBUG) console.error(`${PREFIX} Error ${e}`);
        }
    })
    return config
}

// ===[helpers specially made for the config]===

// get the properties of an element
function getElementProperties(element) {
    return {
        path: element.dataset.path,
        type: element.dataset.type,
        default: element.dataset.default,
        valid: element.dataset.valid
    }
}

/* check the invalid config in memory against possible checks    
must be manually written as these paths taken as the blueprint */
function checkConfig(config) {
    if (hasPath(config, 
        'configOverwriteTrigger',
        'utils.tokenCounter.enable',
        'utils.tokenCounter.options.tokenizer',
        'utils.wordCounter.enable',
        'utils.wordCounter.options.algorithm'
    )) { return true } 
    else { return false }
}

// check types
function checkType(value) {
    try {
        value = value.toLowerCase();
        return [
            'boolean', 'bool', 
            'string', 'str',
            'integer', 'int', 'number',
            'float', 'double',
        ].includes(value);
    } catch (e) {
        window.logCaller(`${PREFIX} Invalid type: ${value}`);
    }
}

// simple path validation
function hasPath(object, ...paths) {
    if (!object || !paths.length === 0) {
        if (DEBUG) console.warn(`${PREFIX} Invalid arguments: ${JSON.stringify(object)}, ${JSON.stringify(paths)}.`);
        return false;
    }
    const allPathsExist = paths.every((path) => {
        const value = getValueByPath(object, path);

        // fixed: booleans causing invalid outputs
        const exists = value !== undefined && value !== null;
        if (DEBUG && !exists) {
            if (DEBUG) console.warn(`${PREFIX} Invalid path: ${path} , value: ${value} in object: ${JSON.stringify(object)}.`);
        }
        return exists;
    });
    return allPathsExist;
}

// get the current value of an element
function getCurrentValue(element) {
    const properties = getElementProperties(element);
    const type = properties.type;

    if (['boolean', 'bool'].includes(type)) {
        return element.checked;
    } 
    else if (['string', 'str'].includes(type)) {
        return element.value;
    } 
    else if (['integer', 'int', 'number'].includes(type)) {
        return parseInt(element.value, 10);
    } 
    else {
        if (DEBUG) console.warn(`${PREFIX} Unsupported data type: ${type}`);
        return null;
    }
}

// qualitative data type conversion
function getconvertTypes(value, type) {
    if (['boolean', 'bool'].includes(type)) {
        return value === "true";
    } 
    else if (['string', 'str'].includes(type)) {
        return value;
    } 
    else if (['integer', 'int', 'number'].includes(type)) {
        return parseInt(value, 10);
    } 
    else {
        if (DEBUG) console.warn(`${PREFIX} Unsupported data type: ${type}`);
        return null;
    }
}

/* construct string paths to actual dictionary paths
path = "utils.tokenCounter.options.tokenizer" */
function setValueByPath(object, path, value) {
    try {
        const keys = path.split('.');
        keys.reduce((currentLevel, key, index) => {
            if (index === keys.length - 1) {
                currentLevel[key] = value;
            } else {
                if (!currentLevel[key] || typeof currentLevel[key] !== 'object') {
                    currentLevel[key] = {};
                }
            }
            // accumulator return
            return currentLevel[key];
        }, object);
        // main return
        return object;
    } catch (e) {
        if (DEBUG) console.warn("${PREFIX} error in setValueByPath:", e);
    }
}

/* retrieve string paths to actual dictionary path values
path = "utils.tokenCounter.options.tokenizer" */
function getValueByPath(object, path) {
    try {
        const keys = path.split('.');
        const result = keys.reduce(
            (currentLevel, key) => currentLevel[key], object
        );
        return result
    } catch (e) {
        if (DEBUG) console.warn("${PREFIX} error", e);
    }
}

/*  

new keys merging feature yet to be add                                   
further discussion to see whether the implementation will cause any issue
in the future                                                            
                                                                         
function mergeConfigs(defaultConfig, newConfig) {                        
    ...                                                                  
}                                                                        
                                                             
*/                                                                       

})();