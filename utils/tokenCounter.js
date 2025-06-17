function main() {
    const checkLibraries = setInterval(() => {
        console.log("| Checking for tokenizer libraries...");
        if (!document.getElementById('o200k_base') && !document.getElementById('cl100k_base')) {
            console.warn("Required tokenizer scripts ('o200k_base' or 'cl100k_base') are missing. Please ensure they are loaded.");
        } else {
            clearInterval(checkLibraries);
            console.log("Required tokenizer scripts ('o200k_base' or 'cl100k_base') are loaded.");
            // ===[Constants]===
            const userTypingboxClass = 'bg-token-bg-primary.flex.w-full.cursor-text.flex-col.items-center.justify-center.overflow-clip.bg-clip-padding.contain-inline-size.dark\\:bg-\\[\\#303030\\].shadow-short.rounded-\\[28px\\]';
            const userTypingBox = document.querySelector('.' + userTypingboxClass);
            
            const counterContainer = userTypingBox;
            const tokenCounter = document.createElement('div');
            
            // global names of tokenizers
            const tokenizers = ['GPTTokenizer_o200k_base', 'GPTTokenizer_cl100k_base'];
            
            
            // ===[Memory Variables]===
            // * Under development *
            let currentTokenizer = tokenizers[0]; // Set default
            
            // INIT
            // -----------------------------------------------------------------------
    
            document.addEventListener('DOMContentLoaded', () => {
                document.getElementById('util-tokenCounter').remove();
                fixUI();
                createTokenCounter(counterContainer);
                checkSelection();
            });
            
            // Add event listener to document to detect text selection
            document.addEventListener('selectionchange', function() {
                if (!document.getElementById('util-tokenCounter')) {
                    createTokenCounter(counterContainer);
                    // * Under development *
                    countTokens(tokenizers[1]);
                }
                else {
                    countTokens(tokenizers[1]);
                };
            });
            // -----------------------------------------------------------------------
            //END
            
            // ===[Fixes]===
            function fixUI() {
                console.log("| Fixing elements...");
                if (userTypingBox) {
                    // bg-token-bg-primary.flex.w-full.cursor-text.flex-col.items-center.justify-center.overflow-clip.bg-clip-padding.contain-inline-size.dark\\:bg-\\[\\#303030\\].shadow-short.rounded-\\[28px\\]
                    userTypingBox.classList.remove('rounded-[28px]');
                    userTypingBox.style.borderRadius = '28px 28px 28px 28px';
                    userTypingBox.classList.remove('overflow-clip');
                    userTypingBox.style.overflow = 'visible';

                };
                console.log("| Fixed!");
            }
            
            // ===[Token Counter]===
            function createTokenCounter(container) {
                // if (document.getElementById('util-tokenCounter')) return;
                console.log("| Inserting token counter to \n" + "| " + counterContainer);
                tokenCounter.id = 'util-tokenCounter';
                tokenCounter.style.display = 'none';
                tokenCounter.style.position = 'absolute';
                tokenCounter.style.top = '-2.5rem';
                tokenCounter.style.right = '0';
                tokenCounter.style.color = '#b4b4b4';
                tokenCounter.style.padding = '0.8rem 0.8rem 0.8rem 0.8rem';
                tokenCounter.style.borderRadius = '18px 18px 0px 0px';
                tokenCounter.style.zIndex = '99999';
                tokenCounter.style.backgroundColor = '#303030';
                tokenCounter.style.fontSize = '0.8rem';
                tokenCounter.style.fontFamily = 'monospace';
            
                // Positioned for absolute child
                container.style.position = 'relative';
                container.appendChild(tokenCounter);
                console.log("| Insertion complete!");
            };
            
            function showTokenCount(tokens) {
                const thresholds = {
                    'low': [100, '#ffffff'],
                    'medium': [500, '#50ed64'],
                    'high': [720, '#f1da5a'],
                    'extreme': [1000, '#FF7070'],
                    'super': [2000, '#ff0000']
                };

                let color = 'b4b4b4'; // default
                
                if (tokens.length >= thresholds['super'][0]) {
                    color = thresholds['super'][1]
                } else if (tokens.length >= thresholds['extreme'][0]) {
                    color = thresholds['extreme'][1]
                } else if (tokens.length >= thresholds['high'][0]) {
                    color = thresholds['high'][1]
                } else if (tokens.length >= thresholds['medium'][0]) {
                    color = thresholds['medium'][1]
                } else if (tokens.length >= thresholds['low'][0]) {
                    color = thresholds['low'][1]
                };

                tokenCounter.innerHTML = `Token count: <span style="color: ${color}">${tokens.length}</span>`;
                tokenCounter.style.display = 'block';
            
                // [container specific fixes]: when showing token counter
                userTypingBox.style.borderRadius = '28px 0px 28px 28px';
            };
            
            function countTokens(tokenizerName) {
                // console.log("| Tokenizing...");
                const text = window.getSelection().toString();
                console.log("Text: " + text);
                if (text) {
                    // console.log("| Tokenizing with: " + currentTokenizer);
            
                    const tokenizer = window.GPTTokenizer_o200k_base;
                    const encode = tokenizer.encode(text);
                    showTokenCount(encode);
                    checkSelection();
                }
            };
            
            // * Under development *
            function setTokenizer(name) {
                if (tokenizers.includes(name)) {
                    currentTokenizer = name;
                    console.log("Tokenizer switched to:", name);
                }
            }
            
            // Check if text is still selected
            function checkSelection() {
                const checkInterval = 500; // Check every 500ms
                const interval = setInterval(() => {
                    const currentSelection = window.getSelection().toString();
                    if (!currentSelection) {
                        tokenCounter.style.display = 'none';
            
                        // [container specific fixes]: when not showing token counter
                        userTypingBox.style.borderRadius = '28px 28px 28px 28px';
                        clearInterval(interval); // Stop checking
                    }
                }, checkInterval);
            };

            fixUI();
            createTokenCounter(counterContainer);
            checkSelection();

        }
    }, 800);
};

main();

// re-run main() on page change
const observePageChange = () => {
    let lastUrl = location.href;
    new MutationObserver(() => {
        const currentUrl = location.href;
        if (currentUrl !== lastUrl) {
            lastUrl = currentUrl;

            if (document.getElementById('util-tokenCounter')) {
                document.getElementById('util-tokenCounter').remove();
            }
            setTimeout(() => {
                main();

            }, 500);
        }
    }).observe(document, {subtree: true, childList: true});
};
observePageChange();