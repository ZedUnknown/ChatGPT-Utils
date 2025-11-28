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

// parent container
const PromptCompressor_Element = document.createElement('div'); // inside GPTU_UIC_B

// children icons
const iconWhitespaceCompression = `<svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 shrink-0" color="primary"><path d="M15.585 6.5C15.585 5.78896 15.5841 5.29563 15.5527 4.91211C15.5297 4.63025 15.4928 4.44063 15.4414 4.29688L15.3848 4.16699C15.2307 3.86474 14.9966 3.61186 14.709 3.43555L14.583 3.36524C14.425 3.28473 14.2136 3.22797 13.8379 3.19727C13.4544 3.16593 12.961 3.16504 12.25 3.16504H7.75C7.03896 3.16504 6.54563 3.16593 6.16211 3.19727C5.88025 3.2203 5.69063 3.25716 5.54688 3.30859L5.41699 3.36524C5.11473 3.51925 4.86186 3.75338 4.68555 4.04102L4.61524 4.16699C4.53473 4.325 4.47797 4.5364 4.44727 4.91211C4.41593 5.29563 4.41504 5.78896 4.41504 6.5V16.1348C4.44473 16.1134 4.47239 16.0909 4.50098 16.0713C4.72247 15.9193 4.94858 15.7936 5.21191 15.7207L5.36524 15.6836C5.72558 15.6097 6.09912 15.6222 6.45508 15.7207L6.64551 15.7842C6.83055 15.8574 6.99884 15.9572 7.16504 16.0713C7.37962 16.2186 7.62531 16.4147 7.91504 16.6465L7.91602 16.6475L7.91895 16.6465L8.32129 16.3271C8.44555 16.2307 8.56067 16.1449 8.66797 16.0713C8.88933 15.9194 9.11479 15.7936 9.37793 15.7207L9.53223 15.6836C9.89248 15.6098 10.2662 15.6223 10.6221 15.7207L10.8125 15.7842C10.9975 15.8575 11.1658 15.9572 11.332 16.0713C11.5465 16.2185 11.7914 16.4148 12.0811 16.6465L12.083 16.6475L12.085 16.6465C12.3747 16.4147 12.6204 16.2186 12.835 16.0713C13.0563 15.9194 13.2817 15.7935 13.5449 15.7207L13.6982 15.6836C14.0586 15.6097 14.4321 15.6222 14.7881 15.7207L14.9795 15.7842C15.1644 15.8575 15.3329 15.9573 15.499 16.0713C15.5276 16.0909 15.5553 16.1134 15.585 16.1348V6.5ZM10.417 10.168L10.5508 10.1816C10.8537 10.2436 11.0819 10.5118 11.082 10.833C11.082 11.1543 10.8537 11.4223 10.5508 11.4844L10.417 11.498H7.91699C7.54972 11.498 7.25195 11.2003 7.25195 10.833C7.25213 10.4659 7.54983 10.168 7.91699 10.168H10.417ZM12.083 6.83496L12.2178 6.84863C12.5206 6.91081 12.748 7.17879 12.748 7.5C12.748 7.82121 12.5206 8.0892 12.2178 8.15137L12.083 8.16504H7.91699C7.54972 8.16504 7.25195 7.86727 7.25195 7.5C7.25195 7.13273 7.54972 6.83496 7.91699 6.83496H12.083ZM16.915 17.5C16.915 17.7556 16.7685 17.9889 16.5381 18.0996C16.3078 18.2102 16.0345 18.179 15.835 18.0195L15.417 17.6855C15.1122 17.4417 14.9112 17.2813 14.7461 17.168C14.667 17.1137 14.6057 17.0763 14.5557 17.0508L14.4336 17.002C14.3026 16.9657 14.166 16.9575 14.0322 16.9756L13.8994 17.002C13.8331 17.0203 13.745 17.0594 13.5869 17.168C13.4219 17.2813 13.2206 17.4418 12.916 17.6855L12.499 18.0195C12.2866 18.1895 11.9957 18.2104 11.7637 18.083L11.668 18.0195L11.25 17.6855C10.9453 17.4418 10.7442 17.2813 10.5791 17.168C10.4999 17.1136 10.4387 17.0763 10.3887 17.0508L10.2666 17.002C10.1356 16.9658 9.99902 16.9574 9.86524 16.9756L9.7334 17.002C9.66709 17.0203 9.57898 17.0595 9.4209 17.168C9.33835 17.2246 9.2467 17.2932 9.1377 17.3779L8.75 17.6855L8.33203 18.0195C8.08917 18.2137 7.74379 18.2138 7.50098 18.0195L7.08399 17.6855C6.77935 17.4418 6.57814 17.2813 6.41309 17.168C6.3337 17.1135 6.27181 17.0763 6.22168 17.0508L6.10059 17.002C5.9696 16.9657 5.83298 16.9575 5.69922 16.9756L5.56641 17.002C5.50007 17.0203 5.41209 17.0594 5.25391 17.168C5.17132 17.2247 5.07977 17.2932 4.9707 17.3779L4.58301 17.6855L4.16504 18.0195C3.96548 18.179 3.69216 18.2102 3.46191 18.0996C3.23152 17.9889 3.08496 17.7556 3.08496 17.5V6.5C3.08496 5.81091 3.08431 5.25395 3.12109 4.80371C3.15851 4.34592 3.23788 3.94009 3.42969 3.56348L3.55176 3.34473C3.85585 2.84902 4.29244 2.44517 4.81348 2.17969L4.95606 2.11328C5.29235 1.96904 5.65306 1.90384 6.05371 1.87109C6.50395 1.83431 7.06091 1.83496 7.75 1.83496H12.25C12.9391 1.83496 13.496 1.83431 13.9463 1.87109C14.4041 1.90851 14.8099 1.98788 15.1865 2.17969L15.4053 2.30176C15.901 2.60585 16.3048 3.04244 16.5703 3.56348L16.6367 3.70606C16.781 4.04235 16.8462 4.40306 16.8789 4.80371C16.9157 5.25395 16.915 5.81091 16.915 6.5V17.5Z"></path></svg>`
const iconLexicalCompression = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 shrink-0" color="primary"><path d="M3.57746 9.14006L4.04387 9.61406C4.17091 9.48906 4.24246 9.31829 4.24246 9.14006C4.24246 8.96183 4.17091 8.79106 4.04387 8.66605L3.57746 9.14006ZM5.15265 5.1067L5.24716 5.76495C5.576 5.71774 5.81955 5.43508 5.81764 5.10288L5.15265 5.1067ZM5.15249 5.07797H4.48747L4.4875 5.08179L5.15249 5.07797ZM14.8475 5.07797L15.5125 5.08179V5.07797H14.8475ZM14.8473 5.1067L14.1824 5.10288C14.1805 5.43509 14.424 5.71774 14.7528 5.76495L14.8473 5.1067ZM16.4225 9.14006L15.9561 8.66605C15.8291 8.79106 15.7575 8.96183 15.7575 9.14006C15.7575 9.31829 15.8291 9.48906 15.9561 9.61406L16.4225 9.14006ZM15.4449 14.6301L15.2085 14.0085C14.9942 14.09 14.837 14.2762 14.7925 14.5011L15.4449 14.6301ZM4.5551 14.6301L5.20748 14.5011C5.16302 14.2762 5.00581 14.09 4.79149 14.0085L4.5551 14.6301ZM3.08743 8.71947C2.82511 8.97653 2.82084 9.39756 3.07789 9.65988C3.33494 9.9222 3.75597 9.92647 4.01829 9.66941L3.08743 8.71947ZM5.52606 9.05389C5.89333 9.05389 6.19106 8.75616 6.19106 8.38889C6.19106 8.02162 5.89333 7.72389 5.52606 7.72389V9.05389ZM9.53457 10.3306C9.27225 10.5876 9.26798 11.0087 9.52503 11.271C9.78208 11.5333 10.2031 11.5376 10.4654 11.2805L9.53457 10.3306ZM11.9732 10.665C12.3405 10.665 12.6382 10.3673 12.6382 10C12.6382 9.63273 12.3405 9.335 11.9732 9.335V10.665ZM17.9123 12.0141C17.9123 11.6468 17.6146 11.3491 17.2473 11.3491C16.88 11.3491 16.5823 11.6468 16.5823 12.0141H17.9123ZM13.5049 13.9616C13.1731 13.804 12.7765 13.9451 12.6189 14.2769C12.4613 14.6086 12.6024 15.0053 12.9342 15.1629L13.5049 13.9616ZM7.86868 11.5445C7.53694 11.3869 7.14026 11.5281 6.98267 11.8598C6.82507 12.1915 6.96625 12.5882 7.29799 12.7458L7.86868 11.5445ZM10.2853 12.7458C10.6171 12.5882 10.7583 12.1915 10.6007 11.8598C10.4431 11.5281 10.0464 11.3869 9.71465 11.5445L10.2853 12.7458ZM8.10085 6.17688C7.76911 6.33448 7.62793 6.73116 7.78552 7.0629C7.94312 7.39464 8.3398 7.53581 8.67154 7.37822L8.10085 6.17688ZM9.59453 7.17123C9.96179 7.17123 10.2595 6.8735 10.2595 6.50623C10.2595 6.13896 9.96179 5.84123 9.59453 5.84123V7.17123ZM15.4994 5.16667C15.4994 4.7994 15.2017 4.50167 14.8344 4.50167C14.4671 4.50167 14.1694 4.7994 14.1694 5.16667H15.4994ZM13.1888 6.7401C12.8592 6.90206 12.7232 7.30057 12.8852 7.6302C13.0472 7.95983 13.4457 8.09576 13.7753 7.9338L13.1888 6.7401ZM5.15249 5.07797L4.4875 5.08179L4.48766 5.11052L5.15265 5.1067L5.81764 5.10288L5.81747 5.07414L5.15249 5.07797ZM14.8473 5.1067L15.5123 5.11052L15.5125 5.08179L14.8475 5.07797L14.1825 5.07415L14.1824 5.10288L14.8473 5.1067ZM10 5.14295H9.335V14.8441H10H10.665V5.14295H10ZM4.5551 14.6301L3.90272 14.759C4.25542 16.5436 5.64061 17.7324 7.12679 17.8958C7.8764 17.9783 8.6507 17.7972 9.29938 17.2972C9.94755 16.7975 10.4211 16.0184 10.6493 14.9879L10 14.8441L9.35073 14.7003C9.17613 15.4888 8.84234 15.9702 8.48741 16.2438C8.133 16.517 7.70844 16.6218 7.27219 16.5738C6.38665 16.4764 5.45217 15.7392 5.20748 14.5011L4.5551 14.6301ZM10 14.8441L9.35073 14.9879C9.57891 16.0184 10.0524 16.7975 10.7006 17.2972C11.3493 17.7972 12.1236 17.9783 12.8732 17.8958C14.3594 17.7324 15.7446 16.5436 16.0973 14.759L15.4449 14.6301L14.7925 14.5011C14.5478 15.7392 13.6134 16.4764 12.7278 16.5738C12.2916 16.6218 11.867 16.517 11.5126 16.2438C11.1577 15.9702 10.8239 15.4888 10.6493 14.7003L10 14.8441ZM3.57746 9.14006L3.11104 8.66605C2.18352 9.57872 1.94758 11.0213 2.15576 12.2555C2.36354 13.4874 3.06106 14.7733 4.31871 15.2516L4.5551 14.6301L4.79149 14.0085C4.14378 13.7622 3.63213 13.0119 3.46724 12.0343C3.30276 11.0592 3.53068 10.119 4.04387 9.61406L3.57746 9.14006ZM5.15265 5.1067L5.05814 4.44845C3.73273 4.63874 2.69968 5.36578 2.28207 6.39936C1.85523 7.45578 2.14106 8.65961 3.11104 9.61406L3.57746 9.14006L4.04387 8.66605C3.39282 8.02542 3.32155 7.37692 3.51521 6.89761C3.71811 6.39545 4.28317 5.90335 5.24716 5.76495L5.15265 5.1067ZM16.4225 9.14006L16.889 9.61406C17.8589 8.65961 18.1448 7.45578 17.7179 6.39936C17.3003 5.36578 16.2673 4.63874 14.9419 4.44845L14.8473 5.1067L14.7528 5.76495C15.7168 5.90335 16.2819 6.39545 16.4848 6.89761C16.6785 7.37692 16.6072 8.02542 15.9561 8.66605L16.4225 9.14006ZM15.4449 14.6301L15.6813 15.2516C16.9389 14.7733 17.6365 13.4874 17.8442 12.2556C18.0524 11.0213 17.8165 9.57872 16.889 8.66605L16.4225 9.14006L15.9561 9.61406C16.4693 10.119 16.6972 11.0592 16.5328 12.0343C16.3679 13.0119 15.8562 13.7622 15.2085 14.0085L15.4449 14.6301ZM14.8475 5.07797H15.5125C15.5125 4.10684 15.1294 3.33433 14.5217 2.81587C13.9281 2.30941 13.1595 2.07735 12.4167 2.08519C11.6737 2.09304 10.9081 2.34139 10.3186 2.85899C9.71615 3.38803 9.335 4.16711 9.335 5.14295H10H10.665C10.665 4.53836 10.8898 4.12744 11.1962 3.85839C11.5156 3.57791 11.962 3.42007 12.4308 3.41512C12.8999 3.41017 13.3432 3.55869 13.6585 3.82767C13.9597 4.08466 14.1825 4.48245 14.1825 5.07797H14.8475ZM10 5.14295H10.665C10.665 4.16711 10.2839 3.38803 9.68135 2.85899C9.09187 2.34138 8.32633 2.09304 7.58327 2.08519C6.84051 2.07735 6.07193 2.30941 5.4783 2.81587C4.87061 3.33433 4.48749 4.10684 4.48749 5.07797H5.15249H5.81749C5.81749 4.48245 6.0403 4.08466 6.34152 3.82767C6.6568 3.55869 7.1001 3.41016 7.56922 3.41512C8.03803 3.42007 8.48437 3.57791 8.8038 3.85839C9.11021 4.12744 9.335 4.53836 9.335 5.14295H10ZM3.55286 9.19444L4.01829 9.66941C4.40755 9.28797 4.93881 9.05389 5.52606 9.05389V8.38889V7.72389C4.57687 7.72389 3.71521 8.1043 3.08743 8.71947L3.55286 9.19444ZM10 10.8056L10.4654 11.2805C10.8547 10.8991 11.3859 10.665 11.9732 10.665V10V9.335C11.024 9.335 10.1624 9.71541 9.53457 10.3306L10 10.8056ZM17.2473 12.0141H16.5823C16.5823 13.204 15.6177 14.1686 14.4279 14.1686V14.8336V15.4986C16.3523 15.4986 17.9123 13.9385 17.9123 12.0141H17.2473ZM14.4279 14.8336V14.1686C14.0962 14.1686 13.7838 14.0941 13.5049 13.9616L13.2195 14.5622L12.9342 15.1629C13.3877 15.3783 13.8947 15.4986 14.4279 15.4986V14.8336ZM8.79167 12.4165V11.7515C8.46002 11.7515 8.14763 11.677 7.86868 11.5445L7.58333 12.1452L7.29799 12.7458C7.75149 12.9613 8.25847 13.0815 8.79167 13.0815V12.4165ZM10 12.1452L9.71465 11.5445C9.4357 11.677 9.12331 11.7515 8.79167 11.7515V12.4165V13.0815C9.32487 13.0815 9.83184 12.9613 10.2853 12.7458L10 12.1452ZM8.38619 6.77755L8.67154 7.37822C8.95049 7.24571 9.26288 7.17123 9.59453 7.17123V6.50623V5.84123C9.06133 5.84123 8.55435 5.96145 8.10085 6.17688L8.38619 6.77755ZM14.8344 5.16667H14.1694C14.1694 5.85626 13.771 6.45405 13.1888 6.7401L13.482 7.33695L13.7753 7.9338C14.7951 7.43272 15.4994 6.38256 15.4994 5.16667H14.8344Z" fill="currentColor"></path></svg>`;

// children doctionary
const childrens = {
	whitespaceCompression: {
		element: document.createElement('div'),
		attributes: {
			"data-tooltip": "Whitespace Compression"
		},
		classList: ["compression-utils", "clickable"],
		innerHTML: iconWhitespaceCompression
	},
	lexicalCompression: {
		element: document.createElement('div'),
		attributes: {
			"data-tooltip": "Lexical Compression"
		},
		classList: ["compression-utils", "clickable"],
		innerHTML: iconLexicalCompression
	}
}

function createPromptCompressor(parentContainer) {
	// update theme if exists
	if (document.getElementById(window.PROMPT_COMPRESSOR_ID)) {
		if (DEBUG) console.log(`${PREFIX} Updating the prompt compressor theme to: ${window.currentTheme}.`);
		const isDark = (window.currentTheme === 'dark');
		Object.entries(childrens).forEach(([key, childObject]) => { childObject.element.classList.toggle('dark', isDark) })
		return;
	} else {
		// try to create the prompt compressor
		if (DEBUG) console.log(`${PREFIX} Attempting to create the prompt compressor...`);
		if (DEBUG) console.log(`${PREFIX} The prompt compressor has been created successfully.`);
		PromptCompressor_Element.id = window.PROMPT_COMPRESSOR_ID;
		PromptCompressor_Element.classList.add('utils-in-GPTU-UIC-B');

		// adding children
		Object.entries(childrens).forEach(([key, childObject]) => {
			childObject.element.id = key.toString();
			childObject.element.innerHTML = childObject.innerHTML;
			childObject.classList.forEach(cls => { childObject.element.classList.add(cls) });
			Object.entries(childObject.attributes).forEach(([attr, value]) => { childObject.element.setAttribute(attr, value) });

			PromptCompressor_Element.appendChild(childObject.element);
		})

		parentContainer.appendChild(PromptCompressor_Element);
		if (DEBUG) console.log(`${PREFIX} The prompt compressor has been inserted successfully.`);
		createPromptCompressor();
	}
}

// ===[Toggle Method]===
function togglePromptCompressor(compressionMethod, text) {
	if (!PromptCompressor_Element) {
		createPromptCompressor();
	}
	if (!compressionMethod || !text) return;

	if (compressionMethod === 'whitespaceCompression') {
		text = text.trim() // remove any trailing and non trailing spaces
		text = text.replace(/\s*\n+\s*/g, " ") // remove new lines
		text = text.replace(/\s{2,}/g, " ") // remove spaces if there are more than one
		text = text.trim() // remove any trailing and non trailing spaces after regex operation if any remains

	} else if (compressionMethod === 'lexicalCompression') {
		const token_map = {
			// 1. Politeness and filler
			"please": "",
			"thank you": "",
			"thanks": "",
			"i am requesting that you": "",
			"i was wondering if you could": "",
			"i would be grateful if you could": "",
			"it would be appreciated if you could": "",
			"would you kindly": "can you",
			"can you possibly": "can you",
			"i want you to": "do",
			"i would like you to": "do",
			"could you": "can you",
			"would you": "can you",
			"if it is not too much trouble": "",
			"i hope you are able to": "do",
			"i am hoping that you can": "do",
			
			// 2. Conjunctions and connectors
			"in order to": "to",
			"so that": "to",
			"as well as": "and",
			"in addition to": "and",
			"along with": "and",
			"together with": "and",
			"due to the fact that": "since",
			"because of the fact that": "because",
			"the fact that": "that",
			"in spite of the fact that": "although",
			"despite the fact that": "although",
			"regardless of the fact that": "although",
			"owing to": "because",
			"in light of the fact that": "because",
			"for the reason that": "because",
			"considering that": "because",
			"with regard to": "about",
			"in reference to": "about",
			"concerning the matter of": "about",
			"as far as": "about",
			"at this point in time": "now",
			"currently": "now",
			"at present": "now",
			"in the event that": "if",
			"provided that": "if",
			"assuming that": "if",
			"on the condition that": "if",
			"for the purpose of": "for",
			"for the sake of": "for",
			"with the intention of": "to",
			"with the aim of": "to",
			
			// 3. Instruction and action verbs
			"provide": "give",
			"give": "give",
			"explain": "describe",
			"clarify": "describe",
			"elucidate": "describe",
			"utilize": "use",
			"make use of": "use",
			"apply": "use",
			"employ": "use",
			"commence": "start",
			"initiate": "start",
			"begin": "start",
			"determine": "find",
			"identify": "find",
			"ascertain": "find",
			"evaluate": "judge",
			"assess": "judge",
			"perform an analysis": "analyze",
			"analyze": "analyze",
			"investigate": "analyze",
			"generate an output that": "output",
			"produce": "make",
			"give a summary of": "summarize",
			"summarize": "summarize",
			"create a list of": "list",
			"list": "list",
			"compile": "list",
			"formulate": "make",
			"construct": "make",
			"devise": "make",
			"prepare": "make",
			"organize": "arrange",
			"arrange": "arrange",
			"plan": "arrange",
			"write up": "write",
			"draft": "write",
			"document": "write",
			
			// 4. Temporal phrases
			"at this moment in time": "now",
			"prior to": "before",
			"subsequent to": "after",
			"in the near future": "soon",
			"as soon as possible": "soon",
			"at the earliest opportunity": "soon",
			"in close proximity to": "near",
			"adjacent to": "near",
			"in the meantime": "meanwhile",
			"from this point forward": "from now",
			"henceforth": "from now",
			
			// 5. Academic / technical verbose phrases
			"with respect to": "about",
			"in terms of": "about",
			"in relation to": "about",
			"in the context of": "about",
			"for the purpose of evaluating": "to evaluate",
			"with the objective of": "to",
			"with a view to": "to",
			"it is important to note that": "note that",
			"it should be noted that": "note that",
			"it is worth mentioning that": "note that",
			"it is evident that": "clearly",
			"it can be observed that": "see that",
			"it is essential to": "must",
			"it is necessary to": "must",
			"it is recommended that": "recommend",
			"one should": "must",
			
			// 6. Legal / formal verbose phrases
			"pursuant to": "under",
			"in accordance with": "under",
			"subject to": "under",
			"by virtue of": "under",
			"for the avoidance of doubt": "to be clear",
			"notwithstanding the foregoing": "despite this",
			"in the event of": "if",
			"to the extent that": "if",
			"at the discretion of": "if",
			"for all intents and purposes": "effectively",
			
			// 7. Miscellaneous verbose constructions
			"with reference to": "about",
			"in connection with": "about",
			"in consideration of": "about",
			"having said that": "but",
			"for the most part": "mostly",
			"to a certain extent": "somewhat",
			"to a large extent": "mostly",
			"in the final analysis": "finally",
			"in conclusion": "finally",
			"at the end of the day": "finally",
			"in terms of quality": "about quality",
			"in terms of quantity": "about quantity",
			"in terms of scope": "about scope",
			"with respect to the matter at hand": "about this",
    	}

		for (const key in token_map) {
			if (token_map.hasOwnProperty(key)) {
				const value = token_map[key];
				const escapedKey = key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
				// const regex = new RegExp('\\b' + escapedKey + '\\b', 'gi');
				const regex = new RegExp(`(?<!\\w)${escapedKey}(?!\\w)`, "gi");
				text = text.replace(regex, value);
			}
		}
		
		text = text.trim() // remove any trailing and non trailing spaces after regex operation if any remains
	}

	return text;
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