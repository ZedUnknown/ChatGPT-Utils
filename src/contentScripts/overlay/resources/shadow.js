// ==========[MARKER + PANELS]==========
const marker = document.querySelector('#sidebar #marker');
const tabs = document.querySelectorAll('#sidebar .tab');
const panels = document.querySelectorAll('#main-content .content-panel');

tabs.forEach((tab) => {
	tab.addEventListener('click', () => {
		// 1. Remove previous active status
		tabs.forEach(el => el.classList.remove('active'));
		panels.forEach(el => el.classList.remove('active'));

		// 2. Activate current tab and its panel
		tab.classList.add('active');
		const targetPanelId = tab.dataset.target; // use data-target
		const targetPanel = document.getElementById(targetPanelId);

		if (targetPanel) {
			targetPanel.classList.add('active');
		}

		// move marker to the selected tab
		moveMarker(tab);
	});
    moveMarker(tabs[1]); // initial call        
});


function moveMarker(tab) {
    const parentRect = tab.parentElement.getBoundingClientRect();
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

// ==========[Sidebar Toggle]==========
const sidebar = document.querySelector('#sidebar');
const sidebarToggleBtn = document.querySelector('#sidebar-toggle-button');
let sidebarToggleStatus = sidebarToggleBtn.getAttribute('aria-expanded');
sidebarToggleBtn.addEventListener('click', () => {
    document.querySelector('#sidebar').classList.toggle('sidebar-collapsed');
});

// ==========[Dropdown Disable]==========
const fields = document.querySelectorAll('fieldset');
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