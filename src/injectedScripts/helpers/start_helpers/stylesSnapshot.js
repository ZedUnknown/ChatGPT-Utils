/*
captures computed styles of a DOM element,  
either all styles or specific ones, and returns them as an object.  
*/

const DEBUG = false;
const PREFIX = 'Get Style Snapshot |';

window.getStylesSnapshot = function (element, only_properties=[]) {
    if (!element || !(element instanceof Element)) return;
	const computed = window.getComputedStyle(element);
    const snapshot = {};
    
    if (only_properties.length === 0) {
        for (let i = 0; i < computed.length; i++) {
            const property = computed[i];
            snapshot[property] = computed.getPropertyValue(property);
        }
        if (DEBUG) console.log(`${PREFIX} Took snapshots of ${element}`);
    } else {
        let invalidProperties = [];
        only_properties.forEach(property => {
            try {
                computed.getPropertyValue(property);
                // provide border radius as single value 'A B C D'
                if (property == 'borderRadius' || property == 'border-radius') {
                    snapshot[property] = [
                        computed.getPropertyValue('border-top-left-radius'),
                        computed.getPropertyValue('border-top-right-radius'),
                        computed.getPropertyValue('border-bottom-right-radius'),
                        computed.getPropertyValue('border-bottom-left-radius')
                    ].join(' ');
                } else {
                    snapshot[property] = computed.getPropertyValue(property);
                }

                if (DEBUG) console.log(`${PREFIX} Property "${property}" : Value "${snapshot[property]}"`);
            } catch (e) {
                if (DEBUG) console.warn(`${PREFIX} Property "${property}" not found in ${element}`);
                invalidProperties.push(property);
                return;
            }
        });
        if (DEBUG) console.log(`${PREFIX} Took snapshots of properties [${only_properties.filter(item => !invalidProperties.includes(item))}] of ${element}:`);
    }
    return snapshot;
}
