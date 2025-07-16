(function() {
// ===[Constants]===
const DEBUG = false;
const PREFIX = 'Overlay |';
const overlayID = "GPT-Utils-Overlay";

const HTML = `
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
    #GPT-Utils-Overlay {
        display: block;
        position: fixed;
        top: 0;
        right: 0;
        width: 100vw;
        height: 100vh;
        background-color: rgb(24, 24, 24);
        color: rgb(255, 255, 255);
        z-index: 9999;
        padding: 10px;
        font-family: Inter, sans-serif;
        overflow: hidden;
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
        top: -72%;
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

    #GPT-Utils-Overlay .paypal-button-label-container {
        background-color: #006ab1;
        display: inline-block;
        padding: 0.5rem;
        border-radius: 5rem;
        width: 16rem;
        height: 2.5rem;
        position: fixed;
        bottom: 0.5rem;
        right: 0.5rem;
    }

    #GPT-Utils-Overlay .paypal-button-label-container span {
        position: absolute;
        color: #fff;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        font-size: 14px;
        animation: paypal-text 0.5s forwards;
        animation-delay: 1000ms;
        opacity: 0;
        font-family: Inter, sanserif;
    }

    #GPT-Utils-Overlay .paypal-button-label-container img {
        position: absolute;
        width: 4.5rem;
        right: 50%;
        top: 50%;
        transform: translate(50%, -50%);
        animation: paypal-image 0.5s forwards; /* Example: 0.5 seconds duration */
        animation-delay: 1000ms;
    }

    @keyframes paypal-image {
        100% {
            right: 30%;
        }        
    }

    @keyframes paypal-text {
        100% {
            left: 30%;
            opacity: 1;
        } 
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
                    <input type="checkbox" id="GPT-Utils-Overlay-op1">
                    Token Counter
                </label>
            </div>
            <div class="option pending">
                <label class="checkBox">
                    <input type="checkbox" id="GPT-Utils-Overlay-op2">
                    ... ... ... ... ... ...
                </label>
            </div>
            <div class="option pending">
                <label class="checkBox">
                    <input type="checkbox" id="GPT-Utils-Overlay-op3">
                    ... ... ... ... ... ...
                </label>
            </div>
            <div class="option pending">
                <label class="checkBox">
                    <input type="checkbox" id="GPT-Utils-Overlay-op4">
                    ... ... ... ... ... ...
                </label>
            </div>
            <div class="option pending">
                <label class="checkBox">
                    <input type="checkbox" id="GPT-Utils-Overlay-op5">
                    ... ... ... ... ... ...
                </label>
            </div>
            <div class="option pending">
                <label class="checkBox">
                    <input type="checkbox" id="GPT-Utils-Overlay-op6">
                    ... ... ... ... ... ...
                </label>
            </div>
            <div class="option pending">
                <label class="checkBox">
                    <input type="checkbox" id="GPT-Utils-Overlay-op7">
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
                    <input type="checkbox" id="GPT-Utils-Overlay-op8">
                    ... ... ... ... ... ...
                </label>
            </div>
            <div class="option pending">
                <label class="checkBox">
                    <input type="checkbox" id="GPT-Utils-Overlay-op9">
                    ... ... ... ... ... ...
                </label>
            </div>
            <div class="option pending">
                <label class="checkBox">
                    <input type="checkbox" id="GPT-Utils-Overlay-op10">
                    ... ... ... ... ... ...
                </label>
            </div>
            <div class="option pending">
                <label class="checkBox">
                    <input type="checkbox" id="GPT-Utils-Overlay-op11">
                    ... ... ... ... ... ...
                </label>
            </div>
            <div class="option pending">
                <label class="checkBox">
                    <input type="checkbox" id="GPT-Utils-Overlay-op12">
                    ... ... ... ... ... ...
                </label>
            </div>
            <div class="option pending">
                <label class="checkBox">
                    <input type="checkbox" id="GPT-Utils-Overlay-op13">
                    ... ... ... ... ... ...
                </label>
            </div>
            <div class="option pending">
                <label class="checkBox">
                    <input type="checkbox" id="GPT-Utils-Overlay-op14">
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
                    <input type="checkbox" id="GPT-Utils-Overlay-op15">
                    ... ... ... ... ... ...
                </label>
            </div>
            <div class="option pending">
                <label class="checkBox">
                    <input type="checkbox" id="GPT-Utils-Overlay-op16">
                    ... ... ... ... ... ...
                </label>
            </div>
            <div class="option pending">
                <label class="checkBox">
                    <input type="checkbox" id="GPT-Utils-Overlay-op17">
                    ... ... ... ... ... ...
                </label>
            </div>
            <div class="option pending">
                <label class="checkBox">
                    <input type="checkbox" id="GPT-Utils-Overlay-op18">
                    ... ... ... ... ... ...
                </label>
            </div>
            <div class="option pending">
                <label class="checkBox">
                    <input type="checkbox" id="GPT-Utils-Overlay-op19">
                    ... ... ... ... ... ...
                </label>
            </div>
            <div class="option pending">
                <label class="checkBox">
                    <input type="checkbox" id="GPT-Utils-Overlay-op20">
                    ... ... ... ... ... ...
                </label>
            </div>
            <div class="option pending">
                <label class="checkBox">
                    <input type="checkbox" id="GPT-Utils-Overlay-op21">
                    ... ... ... ... ... ...
                </label>
            </div>
        </div>
    </div>

    <ul class="socialmedia">
        <li class="icon-content">
            <a target="_blank" href="https://github.com/ZedUnknown/ChatGPT-Utils" aria-label="GitHub" data-social="github">
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

<a class="paypal-donation-button" target="_blank" href="https://www.paypal.com/donate/?hosted_button_id=STMWYARPEQK76">
    <div class="paypal-button-label-container">
        <span>Support me with</span>
        <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAxcHgiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAxMDEgMzIiIHByZXNlcnZlQXNwZWN0UmF0aW89InhNaW5ZTWluIG1lZXQiIHhtbG5zPSJodHRwOiYjeDJGOyYjeDJGO3d3dy53My5vcmcmI3gyRjsyMDAwJiN4MkY7c3ZnIj48cGF0aCBmaWxsPSIjZmZmZmZmIiBkPSJNIDEyLjIzNyAyLjggTCA0LjQzNyAyLjggQyAzLjkzNyAyLjggMy40MzcgMy4yIDMuMzM3IDMuNyBMIDAuMjM3IDIzLjcgQyAwLjEzNyAyNC4xIDAuNDM3IDI0LjQgMC44MzcgMjQuNCBMIDQuNTM3IDI0LjQgQyA1LjAzNyAyNC40IDUuNTM3IDI0IDUuNjM3IDIzLjUgTCA2LjQzNyAxOC4xIEMgNi41MzcgMTcuNiA2LjkzNyAxNy4yIDcuNTM3IDE3LjIgTCAxMC4wMzcgMTcuMiBDIDE1LjEzNyAxNy4yIDE4LjEzNyAxNC43IDE4LjkzNyA5LjggQyAxOS4yMzcgNy43IDE4LjkzNyA2IDE3LjkzNyA0LjggQyAxNi44MzcgMy41IDE0LjgzNyAyLjggMTIuMjM3IDIuOCBaIE0gMTMuMTM3IDEwLjEgQyAxMi43MzcgMTIuOSAxMC41MzcgMTIuOSA4LjUzNyAxMi45IEwgNy4zMzcgMTIuOSBMIDguMTM3IDcuNyBDIDguMTM3IDcuNCA4LjQzNyA3LjIgOC43MzcgNy4yIEwgOS4yMzcgNy4yIEMgMTAuNjM3IDcuMiAxMS45MzcgNy4yIDEyLjYzNyA4IEMgMTMuMTM3IDguNCAxMy4zMzcgOS4xIDEzLjEzNyAxMC4xIFoiPjwvcGF0aD48cGF0aCBmaWxsPSIjZmZmZmZmIiBkPSJNIDM1LjQzNyAxMCBMIDMxLjczNyAxMCBDIDMxLjQzNyAxMCAzMS4xMzcgMTAuMiAzMS4xMzcgMTAuNSBMIDMwLjkzNyAxMS41IEwgMzAuNjM3IDExLjEgQyAyOS44MzcgOS45IDI4LjAzNyA5LjUgMjYuMjM3IDkuNSBDIDIyLjEzNyA5LjUgMTguNjM3IDEyLjYgMTcuOTM3IDE3IEMgMTcuNTM3IDE5LjIgMTguMDM3IDIxLjMgMTkuMzM3IDIyLjcgQyAyMC40MzcgMjQgMjIuMTM3IDI0LjYgMjQuMDM3IDI0LjYgQyAyNy4zMzcgMjQuNiAyOS4yMzcgMjIuNSAyOS4yMzcgMjIuNSBMIDI5LjAzNyAyMy41IEMgMjguOTM3IDIzLjkgMjkuMjM3IDI0LjMgMjkuNjM3IDI0LjMgTCAzMy4wMzcgMjQuMyBDIDMzLjUzNyAyNC4zIDM0LjAzNyAyMy45IDM0LjEzNyAyMy40IEwgMzYuMTM3IDEwLjYgQyAzNi4yMzcgMTAuNCAzNS44MzcgMTAgMzUuNDM3IDEwIFogTSAzMC4zMzcgMTcuMiBDIDI5LjkzNyAxOS4zIDI4LjMzNyAyMC44IDI2LjEzNyAyMC44IEMgMjUuMDM3IDIwLjggMjQuMjM3IDIwLjUgMjMuNjM3IDE5LjggQyAyMy4wMzcgMTkuMSAyMi44MzcgMTguMiAyMy4wMzcgMTcuMiBDIDIzLjMzNyAxNS4xIDI1LjEzNyAxMy42IDI3LjIzNyAxMy42IEMgMjguMzM3IDEzLjYgMjkuMTM3IDE0IDI5LjczNyAxNC42IEMgMzAuMjM3IDE1LjMgMzAuNDM3IDE2LjIgMzAuMzM3IDE3LjIgWiI+PC9wYXRoPjxwYXRoIGZpbGw9IiNmZmZmZmYiIGQ9Ik0gNTUuMzM3IDEwIEwgNTEuNjM3IDEwIEMgNTEuMjM3IDEwIDUwLjkzNyAxMC4yIDUwLjczNyAxMC41IEwgNDUuNTM3IDE4LjEgTCA0My4zMzcgMTAuOCBDIDQzLjIzNyAxMC4zIDQyLjczNyAxMCA0Mi4zMzcgMTAgTCAzOC42MzcgMTAgQyAzOC4yMzcgMTAgMzcuODM3IDEwLjQgMzguMDM3IDEwLjkgTCA0Mi4xMzcgMjMgTCAzOC4yMzcgMjguNCBDIDM3LjkzNyAyOC44IDM4LjIzNyAyOS40IDM4LjczNyAyOS40IEwgNDIuNDM3IDI5LjQgQyA0Mi44MzcgMjkuNCA0My4xMzcgMjkuMiA0My4zMzcgMjguOSBMIDU1LjgzNyAxMC45IEMgNTYuMTM3IDEwLjYgNTUuODM3IDEwIDU1LjMzNyAxMCBaIj48L3BhdGg+PHBhdGggZmlsbD0iI2ZmZmZmZiIgZD0iTSA2Ny43MzcgMi44IEwgNTkuOTM3IDIuOCBDIDU5LjQzNyAyLjggNTguOTM3IDMuMiA1OC44MzcgMy43IEwgNTUuNzM3IDIzLjYgQyA1NS42MzcgMjQgNTUuOTM3IDI0LjMgNTYuMzM3IDI0LjMgTCA2MC4zMzcgMjQuMyBDIDYwLjczNyAyNC4zIDYxLjAzNyAyNCA2MS4wMzcgMjMuNyBMIDYxLjkzNyAxOCBDIDYyLjAzNyAxNy41IDYyLjQzNyAxNy4xIDYzLjAzNyAxNy4xIEwgNjUuNTM3IDE3LjEgQyA3MC42MzcgMTcuMSA3My42MzcgMTQuNiA3NC40MzcgOS43IEMgNzQuNzM3IDcuNiA3NC40MzcgNS45IDczLjQzNyA0LjcgQyA3Mi4yMzcgMy41IDcwLjMzNyAyLjggNjcuNzM3IDIuOCBaIE0gNjguNjM3IDEwLjEgQyA2OC4yMzcgMTIuOSA2Ni4wMzcgMTIuOSA2NC4wMzcgMTIuOSBMIDYyLjgzNyAxMi45IEwgNjMuNjM3IDcuNyBDIDYzLjYzNyA3LjQgNjMuOTM3IDcuMiA2NC4yMzcgNy4yIEwgNjQuNzM3IDcuMiBDIDY2LjEzNyA3LjIgNjcuNDM3IDcuMiA2OC4xMzcgOCBDIDY4LjYzNyA4LjQgNjguNzM3IDkuMSA2OC42MzcgMTAuMSBaIj48L3BhdGg+PHBhdGggZmlsbD0iI2ZmZmZmZiIgZD0iTSA5MC45MzcgMTAgTCA4Ny4yMzcgMTAgQyA4Ni45MzcgMTAgODYuNjM3IDEwLjIgODYuNjM3IDEwLjUgTCA4Ni40MzcgMTEuNSBMIDg2LjEzNyAxMS4xIEMgODUuMzM3IDkuOSA4My41MzcgOS41IDgxLjczNyA5LjUgQyA3Ny42MzcgOS41IDc0LjEzNyAxMi42IDczLjQzNyAxNyBDIDczLjAzNyAxOS4yIDczLjUzNyAyMS4zIDc0LjgzNyAyMi43IEMgNzUuOTM3IDI0IDc3LjYzNyAyNC42IDc5LjUzNyAyNC42IEMgODIuODM3IDI0LjYgODQuNzM3IDIyLjUgODQuNzM3IDIyLjUgTCA4NC41MzcgMjMuNSBDIDg0LjQzNyAyMy45IDg0LjczNyAyNC4zIDg1LjEzNyAyNC4zIEwgODguNTM3IDI0LjMgQyA4OS4wMzcgMjQuMyA4OS41MzcgMjMuOSA4OS42MzcgMjMuNCBMIDkxLjYzNyAxMC42IEMgOTEuNjM3IDEwLjQgOTEuMzM3IDEwIDkwLjkzNyAxMCBaIE0gODUuNzM3IDE3LjIgQyA4NS4zMzcgMTkuMyA4My43MzcgMjAuOCA4MS41MzcgMjAuOCBDIDgwLjQzNyAyMC44IDc5LjYzNyAyMC41IDc5LjAzNyAxOS44IEMgNzguNDM3IDE5LjEgNzguMjM3IDE4LjIgNzguNDM3IDE3LjIgQyA3OC43MzcgMTUuMSA4MC41MzcgMTMuNiA4Mi42MzcgMTMuNiBDIDgzLjczNyAxMy42IDg0LjUzNyAxNCA4NS4xMzcgMTQuNiBDIDg1LjczNyAxNS4zIDg1LjkzNyAxNi4yIDg1LjczNyAxNy4yIFoiPjwvcGF0aD48cGF0aCBmaWxsPSIjZmZmZmZmIiBkPSJNIDk1LjMzNyAzLjMgTCA5Mi4xMzcgMjMuNiBDIDkyLjAzNyAyNCA5Mi4zMzcgMjQuMyA5Mi43MzcgMjQuMyBMIDk1LjkzNyAyNC4zIEMgOTYuNDM3IDI0LjMgOTYuOTM3IDIzLjkgOTcuMDM3IDIzLjQgTCAxMDAuMjM3IDMuNSBDIDEwMC4zMzcgMy4xIDEwMC4wMzcgMi44IDk5LjYzNyAyLjggTCA5Ni4wMzcgMi44IEMgOTUuNjM3IDIuOCA5NS40MzcgMyA5NS4zMzcgMy4zIFoiPjwvcGF0aD48L3N2Zz4">
    </div>
</a>
`;

const elementsIDs = {
    checkBoxTokenCounter: 'GPT-Utils-Overlay-op1',
};

const elements = {};

// ===[Overlay]===
// handles overlay visibility
function toggleOverlay() {
    const overlay = document.getElementById(overlayID);
    if (!overlay) {
        createOverlay();
    } else {
        // toggle visibility and update the extension icon state
        const isHidden = overlay.style.display === "none";
        overlay.style.display = isHidden ? "block" : "none";
        chrome.runtime.sendMessage({
            action: 'setIcon',
            state: isHidden ? 'active' : 'normal'
        });
        if (DEBUG) console.log(`${PREFIX} Overlay toggled to: ${isHidden ? "block" : "none"}`);
    }
}

// run toggleOverlay immediately on script load
toggleOverlay();

// creates the overlay
function createOverlay() {
    if (document.getElementById(overlayID)) {
        console.warn(`${PREFIX} overlay already exists. skipping creation.`);
        return;
    }

    if (DEBUG) console.log(`${PREFIX} Creating overlay...`);
    const container = document.createElement('div');
    container.id = overlayID;
    container.style.cssText = `
        display: none;
        position: fixed;
        top: 0;
        right: 0;
        width: 100vw;
        height: 100vh;
        background-color: rgb(24, 24, 24);
        color: rgb(255, 255, 255);
        z-index: 9999;
        padding: 10px;
        font-family: Inter, sans-serif;
        overflow: hidden;
    `;

    container.innerHTML = HTML;

    document.body.appendChild(container);
    if (DEBUG) console.log(`${PREFIX} Overlay created: ${document.getElementById(overlayID) ? 'true' : 'false'}`);

    // initialize states after the overlay is in the dom
    loadStates();
}

/*
1. check the object overlayStates is in the storage under main key 'config'
2. if it is: then use that config to set the saved state of the elements in the overlay
3. then start adding listeners to the each elements where a change to an element trigger to take the state of that element and write to the object overlayStates which is under object config in the storage

* General Structure *
const config = {
    overlayStates: {
        toggleTokenCounter: elements.checkBoxTokenCounter.checked,
    }
}
*/
async function loadStates() {
    const result = await chrome.storage.sync.get('config');
    let _config = result.config || {};
    let _overlayStates = _config.overlayStates || {};
    
    if (DEBUG) {
        console.log(`${PREFIX} config:`, _config);
        console.log(`${PREFIX} overlayStates:`, _overlayStates);
    }

    if (Object.keys(_overlayStates).length === 0) {

        // default config
        _overlayStates = {
            checkBoxTokenCounter: true
        };

        _config.overlayStates = _overlayStates;
        if (DEBUG) console.log(`${PREFIX} Writing default overlay states to config...`, _config);
        await chrome.storage.sync.set({ config: _config});
        if (DEBUG) console.log(`${PREFIX} Default overlay states saved to config.`);
    }

    const interval = setInterval(async () => {
        const overlayElement = document.getElementById(overlayID);

        const result = await chrome.storage.sync.get('config');
        let _config = result.config || {};
        let _overlayStates = _config.overlayStates || {};

        if (overlayElement && _overlayStates) {
            clearInterval(interval);

            for (const [key, id] of Object.entries(elementsIDs)) {
                elements[key] = document.getElementById(id);
            }

            elements.checkBoxTokenCounter.checked = _overlayStates.checkBoxTokenCounter ?? true;

            // initial update for all utils
            window.postMessage({
                action: "updatedStorage",
                packet: _config,
                initial: true
            }, "*");

            setTimeout(startListening, 200);
        }
    }, 500);
}

// updates the stored configuration with the current state of overlay elements
async function updateStates() {
    if (DEBUG) console.log(`${PREFIX} Updating config...`);

    const result = await chrome.storage.sync.get('config');
    const config = result.config || {};
    let overlayStates = {};

    // dynamically checked states for all relevant elements
    for (const [key, element] of Object.entries(elements)) {
        if (element && typeof element.checked === 'boolean') {
            overlayStates[key] = element.checked;
        }
    }

    config.overlayStates = overlayStates;
    await chrome.storage.sync.set({ config });

    if (DEBUG) console.log(`${PREFIX} Config updated:`, config);
}

// attaches event listeners to overlay elements to trigger state updates on change
function startListening() {
    if (DEBUG) console.log(`${PREFIX} Starting listeners on elements in Overlay...`);
    for (const [key, element] of Object.entries(elements)) {

        // only add listeners to checkbox or radio type elements
        if (element && (element.type === 'checkbox' || element.type === 'radio')) {
            element.addEventListener('change', updateStates);
        }
    }
}
})();