(function () {

const DEBUG = false;
const PREFIX = 'OverlayCreate |';

window.overlayId = 'GPT-UTILS-OVERLAY-SHADOW-DOM';
window.createOverlay = async function () {
    try  {
        if (document.getElementById(window.overlayId)) {
            if (DEBUG) console.log(`${PREFIX} overlay already exists. skipping creation.`);
            return;
        }
    
        const container = document.createElement('div');
        container.id = window.overlayId;
        container.style.cssText = `
            opacity: 0;
            top: 100vw
        `;
        const shadow = container.attachShadow({ mode: 'open' });
        document.body.appendChild(container);
    
        // overlay file paths
        const html_path = chrome.runtime.getURL('contentScripts/overlay/resources/shadow.html');
        const css_path = chrome.runtime.getURL('contentScripts/overlay/resources/shadow.css');
    
        // fetch a network request to get the content from the files
        const _html = await fetch(html_path).then((res) => res.text());
        const _css = await fetch(css_path).then((res) => res.text());
    
        shadow.innerHTML = `
            <style>${_css}</style>
            ${_html}
        `
        /*
            due to browser XSS security restrictions, inline <script> tags added via innerHTML 
            inside a Shadow DOM (or anywhere dynamically) are ignored and not executed.
            the script must be added manually through a content script.
        */
           
        if (DEBUG) console.log(`${PREFIX} Overlay successfully created.`);
        
        await setupOverlayScript(shadow);
        window.overlayReady = true;
        return shadow;
           
        } catch (err) {
            console.error(`${PREFIX} Failed to create overlay:`, err);
        }
    }

async function setupOverlayScript(shadowRoot) {
    // ==========[MARKER + PANELS]==========
    const sidebar = shadowRoot.querySelector('#sidebar');
    const marker = shadowRoot.querySelector('#sidebar #marker');
    const tabs = shadowRoot.querySelectorAll('#sidebar .tab');
    const panels = shadowRoot.querySelectorAll('#main-content .content-panel');
    
    tabs.forEach((tab) => {
        tab.addEventListener('click', () => {
            // 1. Remove previous active status
            tabs.forEach(el => el.classList.remove('active'));
            panels.forEach(el => el.classList.remove('active'));
    
            // 2. Activate current tab and its panel
            tab.classList.add('active');
            const targetPanelId = tab.dataset.target; // use data-target
            const targetPanel = shadowRoot.getElementById(targetPanelId);
    
            if (targetPanel) {
                targetPanel.classList.add('active');
            }
            // move marker to the selected tab
            moveMarker(marker, tab);
        });
        moveMarker(marker, tabs[1]); // initial call

        async function moveMarker(marker, tab) {
            const parentRect = sidebar.getBoundingClientRect();
            const tabRect = tab.getBoundingClientRect();
            const markerRect = marker.getBoundingClientRect()

            let verticalOffset = 0;
            let relativeTop = tabRect.top - parentRect.top;
            if ((tabRect.height - markerRect.height) > 0) {
                verticalOffset = (tabRect.height - markerRect.height) / 2
                relativeTop = relativeTop + verticalOffset;
            } else {
                verticalOffset = (markerRect.height - tabRect.height) / 2
                relativeTop = relativeTop - verticalOffset;
            }
            marker.style.transform = `translateY(${relativeTop}px)`;
        }
    });
    
    // ==========[Dropdown Disable]==========
    const fields = shadowRoot.querySelectorAll('fieldset');
    fields.forEach((field) => {
        const enableField = field.querySelector('.enable');
        const optionsField = field.querySelector('.options');
        const inputElement = enableField.querySelector('input');

        const toggle = () => {
            const enable = !!inputElement.checked;

            optionsField.classList.toggle('disabled', !enable);
        }

        inputElement.addEventListener('change', () => {
            toggle();
        })
        toggle(); // initial call
    });

    const overlay = document.getElementById(window.overlayId);
    if (overlay) {
        overlay.style.cssText = `
            display: none;
            opacity: 1;
            top: 0;
        `;
    }

    // ==========[Sidebar Toggle]==========
    const sidebarToggleBtn = shadowRoot.querySelector('#sidebar-toggle-button');
    sidebarToggleBtn.addEventListener('click', () => {
        sidebar.classList.toggle('sidebar-collapsed');
    });
}

})();