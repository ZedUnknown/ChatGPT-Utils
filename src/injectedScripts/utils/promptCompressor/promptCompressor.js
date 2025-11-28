const DEBUG = false;
const PREFIX = 'Prompt Compressor |';

// ===[Util Registry]===
// Util Registry (registering to 'PARENT_CONTAINER' container)
// containes any method, variable which need to be access from other scripts
window.registerUtil({
	[window.PROMPT_COMPRESSOR_ID] : {
		methods: {
			create_method: init,
			toggle_method: togglePromptCompressor,
			kill_method: killPromptCompressor,
		},
		configs: {},
		variables: {}
	}
})

// ===[Init]===
let PARENT_CONTAINER = null;
let PARENT_CONTAINER_ID = null;
function init() {
	if (DEBUG) console.log(`${PREFIX} init called...`);

	// take the parent container and create and append the util
	window.get_GPTU_UIC_B().then(({id, container}) => {
		if (DEBUG) console.log(`${PREFIX} The PARENT_CONTAINER container was successfully located: ${id}`);
		PARENT_CONTAINER = container;
		PARENT_CONTAINER_ID = id;

		// create the prompt compressor
		if (PARENT_CONTAINER && PARENT_CONTAINER_ID) {
			window.__registry__[window.PROMPT_COMPRESSOR_ID].variables.container = PARENT_CONTAINER_ID
			createPromptCompressor(PARENT_CONTAINER);
		}
	});
}

// ===[Create PromptCompressor Element]===
const PromptCompressor_Element = document.createElement('button'); // inside GPTU_UIC_B
const PromptCompressor_Icon = `<svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 shrink-0" color="primary"><path d="M15.585 6.5C15.585 5.78896 15.5841 5.29563 15.5527 4.91211C15.5297 4.63025 15.4928 4.44063 15.4414 4.29688L15.3848 4.16699C15.2307 3.86474 14.9966 3.61186 14.709 3.43555L14.583 3.36524C14.425 3.28473 14.2136 3.22797 13.8379 3.19727C13.4544 3.16593 12.961 3.16504 12.25 3.16504H7.75C7.03896 3.16504 6.54563 3.16593 6.16211 3.19727C5.88025 3.2203 5.69063 3.25716 5.54688 3.30859L5.41699 3.36524C5.11473 3.51925 4.86186 3.75338 4.68555 4.04102L4.61524 4.16699C4.53473 4.325 4.47797 4.5364 4.44727 4.91211C4.41593 5.29563 4.41504 5.78896 4.41504 6.5V16.1348C4.44473 16.1134 4.47239 16.0909 4.50098 16.0713C4.72247 15.9193 4.94858 15.7936 5.21191 15.7207L5.36524 15.6836C5.72558 15.6097 6.09912 15.6222 6.45508 15.7207L6.64551 15.7842C6.83055 15.8574 6.99884 15.9572 7.16504 16.0713C7.37962 16.2186 7.62531 16.4147 7.91504 16.6465L7.91602 16.6475L7.91895 16.6465L8.32129 16.3271C8.44555 16.2307 8.56067 16.1449 8.66797 16.0713C8.88933 15.9194 9.11479 15.7936 9.37793 15.7207L9.53223 15.6836C9.89248 15.6098 10.2662 15.6223 10.6221 15.7207L10.8125 15.7842C10.9975 15.8575 11.1658 15.9572 11.332 16.0713C11.5465 16.2185 11.7914 16.4148 12.0811 16.6465L12.083 16.6475L12.085 16.6465C12.3747 16.4147 12.6204 16.2186 12.835 16.0713C13.0563 15.9194 13.2817 15.7935 13.5449 15.7207L13.6982 15.6836C14.0586 15.6097 14.4321 15.6222 14.7881 15.7207L14.9795 15.7842C15.1644 15.8575 15.3329 15.9573 15.499 16.0713C15.5276 16.0909 15.5553 16.1134 15.585 16.1348V6.5ZM10.417 10.168L10.5508 10.1816C10.8537 10.2436 11.0819 10.5118 11.082 10.833C11.082 11.1543 10.8537 11.4223 10.5508 11.4844L10.417 11.498H7.91699C7.54972 11.498 7.25195 11.2003 7.25195 10.833C7.25213 10.4659 7.54983 10.168 7.91699 10.168H10.417ZM12.083 6.83496L12.2178 6.84863C12.5206 6.91081 12.748 7.17879 12.748 7.5C12.748 7.82121 12.5206 8.0892 12.2178 8.15137L12.083 8.16504H7.91699C7.54972 8.16504 7.25195 7.86727 7.25195 7.5C7.25195 7.13273 7.54972 6.83496 7.91699 6.83496H12.083ZM16.915 17.5C16.915 17.7556 16.7685 17.9889 16.5381 18.0996C16.3078 18.2102 16.0345 18.179 15.835 18.0195L15.417 17.6855C15.1122 17.4417 14.9112 17.2813 14.7461 17.168C14.667 17.1137 14.6057 17.0763 14.5557 17.0508L14.4336 17.002C14.3026 16.9657 14.166 16.9575 14.0322 16.9756L13.8994 17.002C13.8331 17.0203 13.745 17.0594 13.5869 17.168C13.4219 17.2813 13.2206 17.4418 12.916 17.6855L12.499 18.0195C12.2866 18.1895 11.9957 18.2104 11.7637 18.083L11.668 18.0195L11.25 17.6855C10.9453 17.4418 10.7442 17.2813 10.5791 17.168C10.4999 17.1136 10.4387 17.0763 10.3887 17.0508L10.2666 17.002C10.1356 16.9658 9.99902 16.9574 9.86524 16.9756L9.7334 17.002C9.66709 17.0203 9.57898 17.0595 9.4209 17.168C9.33835 17.2246 9.2467 17.2932 9.1377 17.3779L8.75 17.6855L8.33203 18.0195C8.08917 18.2137 7.74379 18.2138 7.50098 18.0195L7.08399 17.6855C6.77935 17.4418 6.57814 17.2813 6.41309 17.168C6.3337 17.1135 6.27181 17.0763 6.22168 17.0508L6.10059 17.002C5.9696 16.9657 5.83298 16.9575 5.69922 16.9756L5.56641 17.002C5.50007 17.0203 5.41209 17.0594 5.25391 17.168C5.17132 17.2247 5.07977 17.2932 4.9707 17.3779L4.58301 17.6855L4.16504 18.0195C3.96548 18.179 3.69216 18.2102 3.46191 18.0996C3.23152 17.9889 3.08496 17.7556 3.08496 17.5V6.5C3.08496 5.81091 3.08431 5.25395 3.12109 4.80371C3.15851 4.34592 3.23788 3.94009 3.42969 3.56348L3.55176 3.34473C3.85585 2.84902 4.29244 2.44517 4.81348 2.17969L4.95606 2.11328C5.29235 1.96904 5.65306 1.90384 6.05371 1.87109C6.50395 1.83431 7.06091 1.83496 7.75 1.83496H12.25C12.9391 1.83496 13.496 1.83431 13.9463 1.87109C14.4041 1.90851 14.8099 1.98788 15.1865 2.17969L15.4053 2.30176C15.901 2.60585 16.3048 3.04244 16.5703 3.56348L16.6367 3.70606C16.781 4.04235 16.8462 4.40306 16.8789 4.80371C16.9157 5.25395 16.915 5.81091 16.915 6.5V17.5Z"></path></svg>`

function createPromptCompressor(parentContainer) {
	// update theme if exists
	if (document.getElementById(window.PROMPT_COMPRESSOR_ID)) {
		if (DEBUG) console.log(`${PREFIX} Updating the prompt compressor theme to: ${window.currentTheme}.`);
		const isDark = (window.currentTheme === 'dark');
		PromptCompressor_Element.classList.toggle('dark', isDark);
		return;
	} else {
		// try to create the prompt compressor
		if (DEBUG) console.log(`${PREFIX} Attempting to create the prompt compressor...`);
		if (DEBUG) console.log(`${PREFIX} The prompt compressor has been created successfully.`);
		PromptCompressor_Element.id = window.PROMPT_COMPRESSOR_ID;
		PromptCompressor_Element.classList.add('utils-in-GPTU-UIC-B', 'clickable');
		PromptCompressor_Element.setAttribute("data-tooltip", "Compress the prompt");
		PromptCompressor_Element.innerHTML = PromptCompressor_Icon;

		parentContainer.appendChild(PromptCompressor_Element);
		if (DEBUG) console.log(`${PREFIX} The prompt compressor has been inserted successfully.`);
		createPromptCompressor();
	}
}

// ===[Toggle Method]===
function togglePromptCompressor(text) {
	if (!PromptCompressor_Element) {
		createPromptCompressor();
	}
	if (!text) return;

	const compressedText = text.replace(/\s+/g, ' ').replace(/\n/g, '  ');
	return compressedText;
}

// ===[Kill Method]===
function killPromptCompressor() {
    if (DEBUG) console.log(`${PREFIX} 🪦 Killing the prompt compressor...`);
    
    if (PromptCompressor_Element) {
        PromptCompressor_Element.remove();
    }

    // remove by ID (for some reason if the element remains)
    const element = document.getElementById(window.PROMPT_COMPRESSOR_ID);
    if (element) element.remove();
}

// ===[Theme Listener]===
window.addEventListener('themeChanged', (e) => {
	createPromptCompressor();
});