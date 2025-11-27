// Util Registry
window.__registry__ = {};

// Util IDs (used to access the util's registry by other scripts)
window.TOKEN_COUNTER_ID = 'util-tokenCounter';
window.WORD_COUNTER_ID = 'util-wordCounter';
window.PROMPT_COMPRESSOR_ID = 'util-promptCompressor'

// Current Theme
window.currentTheme = (document.documentElement).classList.contains('dark') ? 'dark' : 'light';