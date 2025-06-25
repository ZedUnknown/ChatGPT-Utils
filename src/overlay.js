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
    container.style.width = "320px";
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
    .gpt-utils-link:hover {
        color: #018DFF !important;
    }
    </style>

    <div style="display: block; margin-bottom: 2rem;">
        <h2 style="color: #ffffff; font-family: Inter, sanserif; font-size: 2rem; text-align: center; margin-top: 0.5rem;">ChatGPT Utils</h2>
    </div>


    <div style="display: block; height: 30px; color: white; padding: 5px; background-image: repeating-linear-gradient(-55deg, #000, #000 20px, #ececec 20px, #ececec 40px);"></div>

    <h3 style="display: block; text-align: center; margin: 1rem; font-size: 1rem; color: #ffffff; font-family: Inter, sanserif;">| Under Development |</h3>

    <div style="display: block; height: 30px; color: white; padding: 5px; background-image: repeating-linear-gradient(-55deg, #000, #000 20px, #ececec 20px, #ececec 40px);"></div>


    <p style="display: block; text-align: center; margin: 1rem; font-size: 1rem; color: #ffffff; font-family: Inter, sanserif;">
    More 
        <a class="gpt-utils-link" style="color: #ffffff; cursor: pointer; text-decoration: underline; transition: color 0.2s ease-in-out;" href="https://github.com/ZedUnknown/ChatGPT-Utils">
        features and updates
        </a>
    are coming soon!
    </p>
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