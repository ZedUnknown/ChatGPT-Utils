// * Under development *
(function () {
// ===[Constants]===
const iconStates = {
    'normal' : {
        16: "./assets/icons/default/icon16.png",
        32: "./assets/icons/default/icon32.png",
        48: "./assets/icons/default/icon48.png",
        128: "./assets/icons/default/icon128.png"
    },
    'active' : {
        16: "./assets/icons/active/icon16.png",
        32: "./assets/icons/active/icon32.png",
        48: "./assets/icons/active/icon48.png",
        128: "./assets/icons/active/icon128.png"
    },
    'disabled' : {
        16: "./assets/icons/disabled/icon16.png",
        32: "./assets/icons/disabled/icon32.png",
        48: "./assets/icons/disabled/icon48.png",
        128: "./assets/icons/disabled/icon128.png"
    }
};

const overlayID = "GPT-Utils-Overlay";
// ===[Overlay]===
function createOverlay() {
    if (document.getElementById("GPT-Utils")) return;
    // console.log("| Creating Overlay...");
    const container = document.createElement('div');
    container.id = overlayID;
    container.style.display = "none";
    container.style.position = "fixed";
    container.style.top = "0";
    container.style.right = "0";
    // container.style.width = "320px"; 
    container.style.width = "100vw";
    container.style.height = "100vh";
    container.style.backgroundColor = "rgb(24, 24, 24)";
    container.style.color = "rgb(255, 255, 255)";
    container.style.zIndex = "9999";
    container.style.padding = "10px";
    container.style.fontFamily = "Inter, sans-serif";
    container.style.overflow = "hidden";

    container.innerHTML = `
    <style>
        /* latin-ext */
        @font-face {
            font-family: "Inter";
            font-style: normal;
            font-weight: 500;
            src: url(https://fonts.gstatic.com/s/inter/v12/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa25L7W0Q5n-wU.woff2) format("woff2");
            unicode-range: U+0100-02AF, U+0304, U+0308, U+0329, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF,
                U+2113, U+2C60-2C7F, U+A720-A7FF;
        }
        /* latin */
        @font-face {
            font-family: "Inter";
            font-style: normal;
            font-weight: 500;
            src: url(https://fonts.gstatic.com/s/inter/v12/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa1ZL7W0Q5nw.woff2) format("woff2");
            unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329,
                U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
        }
        /* latin-ext */
        @font-face {
            font-family: "Inter";
            font-style: normal;
            font-weight: 600;
            src: url(https://fonts.gstatic.com/s/inter/v12/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa25L7W0Q5n-wU.woff2) format("woff2");
            unicode-range: U+0100-02AF, U+0304, U+0308, U+0329, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF,
                U+2113, U+2C60-2C7F, U+A720-A7FF;
        }
        /* latin */
        @font-face {
            font-family: "Inter";
            font-style: normal;
            font-weight: 600;
            src: url(https://fonts.gstatic.com/s/inter/v12/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa1ZL7W0Q5nw.woff2) format("woff2");
            unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329,
                U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
        }
        #GPT-Utils-Overlay .gpt-utils-link:hover {
            color: #018DFF !important;
        }

        /* ===[Overlay]=== */
        #GPT-Utils-Overlay {
            display: block;
            padding: 1rem;
            position: fixed;
            top: 0;
            right: 0;
            width: 100%;
            height: 100%;
            background-color: rgb(24, 24, 24);
            color: rgb(255, 255, 255);
            z-index: 9999;
            font-family: Inter, sans-serif;
            overflow: hidden;
            box-sizing: border-box;
            user-select: none;
            -webkit-user-select: none;
            -ms-user-select: none;
            -moz-user-select: none;
            -khtml-user-select: none;
        }
        #GPT-Utils-Overlay .header {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            width: 100%;
            margin: 0rem;
            padding: 0rem;
            background: linear-gradient(0deg, rgba(255, 255, 255, 0.02) 0%, rgba(255,255,255,0.01) 20%, rgba(24, 24, 24, 0) 100%);
            border-radius: 16px;
            box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
            backdrop-filter: blur(8px);
            -webkit-backdrop-filter: blur(8px);
            border: 1px solid rgba(255, 255, 255, 0.44);
        }

        /* ===[Options Section]=== */
        #GPT-Utils-Overlay .options-container {
            color: #ffffff;
            margin-top: 1rem;
            display: grid; 
            grid-template-columns: 33.3% 33.3% 33.3%; 
            gap: 0px 0px;
            background-image: linear-gradient(320deg, rgba(255, 255, 255, 0.03) 0%, rgba(255,255,255,0.01) 40%, rgba(24, 24, 24, 0) 100%);
            border-radius: 16px;
            box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            border: 1px solid rgba(255, 255, 255, 0.4);
            overflow: hidden;
        }
        
        #GPT-Utils-Overlay .column-title {
            display: block;
            font-family: Inter, sanserif;
            font-size: 1.5rem;
            line-height: 1.1;
            color: #ffffff;
            text-align: center;
            margin-top: 0rem;
            margin-bottom: 3rem;
            padding-top: 1.2rem;
            padding-bottom: 1rem;
            background: linear-gradient(180deg, rgba(255, 255, 255, 0.02) 0%, rgba(255,255,255,0.01) 20%, rgba(24, 24, 24, 0) 100%);
            box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
            backdrop-filter: blur(8px);
            -webkit-backdrop-filter: blur(8px);
            border-bottom: 1px solid rgba(255, 255, 255, 0.44);
        }
        
        #GPT-Utils-Overlay .option:hover {
            opacity: 0.9;
        }
        
        #GPT-Utils-Overlay .checkBox {
            display: grid;
            grid-template-columns: 1em auto;
            gap: 1em;
            color: #fff;
            font-family: Inter, sanserif;
            margin-bottom: 3.2rem;
            font-size: 1.5rem;
            line-height: 1.1;
            cursor: pointer;
        }

        #GPT-Utils-Overlay input[type="checkbox"] {
            display: grid;
            place-content: center;
            -webkit-appearance: none;
            appearance: none;
            background-color: transparent;
            background: none;
            outline: none;
            box-shadow: none;
            margin: 0;
            font: inherit;
            color: currentColor;
            width: 1.15em;
            height: 1.15em;
            border: 0.15em solid currentColor;
            border-radius: 0.15em;
            transform: translateY(-0.075em);
            position: relative;
            cursor: pointer;
        }

        #GPT-Utils-Overlay input[type="checkbox"]::before {
            content: "";
            display: block;
            width: 70%;
            height: 70%;
            top: 15%;
            left: 15%;
            background-color: #38da76;
            border-radius: 0.1em;
            transform: scale(0);
            transition: 120ms transform ease-in-out;
            position: absolute;
        }

        #GPT-Utils-Overlay input[type="checkbox"]:checked::before {
            transform: scale(1);
        }

        #GPT-Utils-Overlay .pending .checkBox{
            color: #5f5f5f !important;
            cursor: not-allowed;
            pointer-events: none ! important;
        }
        #GPT-Utils-Overlay .pending:hover {
            opacity: 1 !important;
        }
        
        /* ===[Github Icon]=== */
        #GPT-Utils-Overlay ul {
            list-style: none;
        }
        #GPT-Utils-Overlay .socialmedia {
            display: inline-block;
            position: absolute;
            bottom: 0;
            right: 0;
        }
        #GPT-Utils-Overlay .socialmedia .icon-content {
            margin: 10px 10px;
            position: relative;
            padding: 0.5rem;
        }
        #GPT-Utils-Overlay .socialmedia .icon-content .tooltip {
            position: absolute;
            top: 100%;
            left: -110%;
            transform: translateY(200%);
            color: #fff;
            padding: 6px 10px;
            border-radius: 5px;
            opacity: 0;
            visibility: hidden;
            font-size: 14px;
            transition: all 0.3s ease;
        }
        #GPT-Utils-Overlay .socialmedia .icon-content:hover .tooltip {
            opacity: 1;
            visibility: visible;
            top: -60%;
            left: -110%;
        }
        #GPT-Utils-Overlay .socialmedia .icon-content a {
            position: relative;
            overflow: hidden;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            color: #4d4d4d;
            background-color: #fff;
            transition: all 0.3s ease-in-out;
        }
        #GPT-Utils-Overlay .socialmedia .icon-content a:hover {
            box-shadow: 3px 2px 45px 0px rgb(0 0 0 / 12%);
        }
        #GPT-Utils-Overlay .socialmedia .icon-content a svg {
            position: relative;
            z-index: 1;
            width: 30px;
            height: 30px;
        }
        #GPT-Utils-Overlay .socialmedia .icon-content a:hover {
            color: white;
        }
        #GPT-Utils-Overlay .socialmedia .icon-content a .filled {
            position: absolute;
            top: auto;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 0;
            background-color: #000;
            transition: all 0.3s ease-in-out;
        }
        #GPT-Utils-Overlay .socialmedia .icon-content a:hover .filled {
            height: 100%;
        }
        #GPT-Utils-Overlay .socialmedia .icon-content a[data-social="github"] .filled,
        #GPT-Utils-Overlay .socialmedia .icon-content a[data-social="github"] ~ .tooltip {
            background-color: #24262a;
        }
        
        /* ===[Footer Section]=== */
        #GPT-Utils-Overlay .footer {
            display: block;
            width: 100%;
            position: fixed;
            left: 0;
            bottom: 0;
            text-align: center;
            padding: 1rem;
            font-size: 1rem;
            color: #ffffff;
            font-family: Inter, sanserif;
            background: none;
        }
    </style>


    <div class="header">
        <h2 style="color: #ffffff; font-family: Inter, sanserif; font-size: 2rem; margin: 0rem; padding: 1.5rem;">ChatGPT Utils</h2>
    </div>

    <div class="options-container" style="position: relative; z-index: 1;">
        <div style="grid-column: 1; position: relative; border-right: 1px solid transparent; border-image: radial-gradient(#ffffffab, #000000) 1 100%;">
            <h2 class="column-title">C1</h2>

            <div style="display: flex; flex-direction: column; align-items: flex-start; margin-left: 50px;">
                
                <div class="option">
                    <label class="checkBox">
                        <input type="checkbox" id="op1">
                        Enable Feature
                    </label>
                </div>
                <div class="option">
                    <label class="checkBox">
                        <input type="checkbox" id="op2">
                        Token Counter
                    </label>
                </div>
                <div class="option pending">
                    <label class="checkBox">
                        <input type="checkbox" id="op3">
                        ... ... ... ... ... ...
                    </label>
                </div>
                <div class="option pending">
                    <label class="checkBox">
                        <input type="checkbox" id="op4">
                        ... ... ... ... ... ...
                    </label>
                </div>
                <div class="option pending">
                    <label class="checkBox">
                        <input type="checkbox" id="op5">
                        ... ... ... ... ... ...
                    </label>
                </div>
                <div class="option pending">
                    <label class="checkBox">
                        <input type="checkbox" id="op6">
                        ... ... ... ... ... ...
                    </label>
                </div>
                <div class="option pending">
                    <label class="checkBox">
                        <input type="checkbox" id="op7">
                        ... ... ... ... ... ...
                    </label>
                </div>
            </div>
        </div>

        <div style="grid-column: 2; border-right: 1px solid transparent; border-image: radial-gradient(#ffffffab, #000000) 1 100%;">
            <h2 class="column-title">C2</h2>
            <div style="display: flex; flex-direction: column; align-items: flex-start; margin-top: 30px; margin-left: 50px;">
                <div class="option pending">
                    <label class="checkBox">
                        <input type="checkbox" id="op8">
                        ... ... ... ... ... ...
                    </label>
                </div>
                <div class="option pending">
                    <label class="checkBox">
                        <input type="checkbox" id="op9">
                        ... ... ... ... ... ...
                    </label>
                </div>
                <div class="option pending">
                    <label class="checkBox">
                        <input type="checkbox" id="op10">
                        ... ... ... ... ... ...
                    </label>
                </div>
                <div class="option pending">
                    <label class="checkBox">
                        <input type="checkbox" id="op11">
                        ... ... ... ... ... ...
                    </label>
                </div>
                <div class="option pending">
                    <label class="checkBox">
                        <input type="checkbox" id="op12">
                        ... ... ... ... ... ...
                    </label>
                </div>
                <div class="option pending">
                    <label class="checkBox">
                        <input type="checkbox" id="op13">
                        ... ... ... ... ... ...
                    </label>
                </div>
                <div class="option pending">
                    <label class="checkBox">
                        <input type="checkbox" id="op14">
                        ... ... ... ... ... ...
                    </label>
                </div>
            </div>
        </div>

        <div style="grid-column: 3;">
            <h2 class="column-title">C3</h2>
            <div style="display: flex; flex-direction: column; align-items: flex-start; margin-top: 30px; margin-left: 50px;">
                <div class="option pending">
                    <label class="checkBox">
                        <input type="checkbox" id="op15">
                        ... ... ... ... ... ...
                    </label>
                </div>
                <div class="option pending">
                    <label class="checkBox">
                        <input type="checkbox" id="op16">
                        ... ... ... ... ... ...
                    </label>
                </div>
                <div class="option pending">
                    <label class="checkBox">
                        <input type="checkbox" id="op17">
                        ... ... ... ... ... ...
                    </label>
                </div>
                <div class="option pending">
                    <label class="checkBox">
                        <input type="checkbox" id="op18">
                        ... ... ... ... ... ...
                    </label>
                </div>
                <div class="option pending">
                    <label class="checkBox">
                        <input type="checkbox" id="op19">
                        ... ... ... ... ... ...
                    </label>
                </div>
                <div class="option pending">
                    <label class="checkBox">
                        <input type="checkbox" id="op20">
                        ... ... ... ... ... ...
                    </label>
                </div>
                <div class="option pending">
                    <label class="checkBox">
                        <input type="checkbox" id="op21">
                        ... ... ... ... ... ...
                    </label>
                </div>
            </div>
        </div>

        <ul class="socialmedia">
            <li class="icon-content">
                <a href="https://github.com/ZedUnknown/ChatGPT-Utils" aria-label="GitHub" data-social="github">
                <div class="filled"></div>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-github"
                    viewBox="0 0 16 16"
                    xml:space="preserve"
                >
                    <path
                    d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8"
                    fill="currentColor"
                    ></path>
                </svg>
                </a>
                <div class="tooltip">GitHub</div>
            </li>
        </ul>
    </div>

    <div class="footer">
        <p style="margin: 0;">
            More 
            <a class="gpt-utils-link" style="color: #ffffff; cursor: pointer; text-decoration: underline; transition: color 0.2s ease-in-out;" href="https://github.com/ZedUnknown/ChatGPT-Utils">features and updates</a> are coming soon!
        </p>
    </div>
    `;

    document.body.appendChild(container);
    // console.log("| Overlay Created", document.getElementById(overlayID));
}

// Overlay toggle
function toggleOverlay() {
    const overlay = document.getElementById(overlayID);
    // If overlay doesn't exist (sometimes it doesn't get created)
    if (!overlay) {
        createOverlay();
        toggleOverlay();
    } else {
        if (overlay.style.display === "none") {
            overlay.style.display = "block";
            chrome.runtime.sendMessage({
                action: 'setIcon',
                path: iconStates['active']
            });
        } else {
            overlay.style.display = "none";
            chrome.runtime.sendMessage({
                action: 'setIcon',
                path: iconStates['normal']
            });
        }
    }
}
toggleOverlay();
})();