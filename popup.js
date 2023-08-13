document.addEventListener('DOMContentLoaded', function () {
    let optionChanged = false;
    console.log('DOM fully loaded and parsed');
    // Get the elements from the HTML
    const tabTypeSelect = document.getElementById('tabType');
    const heightRange = document.getElementById('height');
    const widthRange = document.getElementById('width');
    const sliderContainer = document.getElementById('sliderContainer');
    const popupMessage = document.getElementById('popupMessage');
    const currentWidthValue = document.getElementById('currentWidthValue');
    const currentHeightValue = document.getElementById('currentHeightValue');

    // Load saved options from extension storage
    chrome.storage.sync.get(['tabType', 'height', 'width'], function (result) {
        const width = result.width || 500;
        const height = result.height || 800;

        if (result.tabType) {
            tabTypeSelect.value = result.tabType;
            if (result.tabType === 'newtab') {
                sliderContainer.style.display = 'block';
                heightRange.value = height;
                widthRange.value = width;
                currentHeightValue.value = height;
                currentWidthValue.value = width;
                widthRange.max = screen.width;
                heightRange.max = screen.height;
            }
        }

        // Set the initial values of the range selectors
        heightRange.value = height;
        widthRange.value = width;
        currentHeightValue.value = height;
        currentWidthValue.value = width;

        // Trigger a change event after setting the selected value
        const event = new Event('change');
        tabTypeSelect.dispatchEvent(event);

        // Show or hide the height and width ranges based on the selected option
        if (tabTypeSelect.value === 'newwindow') {
            sliderContainer.style.display = 'block';
        } else {
            sliderContainer.style.display = 'none';
        }
    });

    // Handle tab type change event
    tabTypeSelect.addEventListener('change', function () {
        const selectedTabType = tabTypeSelect.value;
        if (selectedTabType === 'newwindow') {
            sliderContainer.style.display = 'block';
        } else {
            sliderContainer.style.display = 'none';
        }

        // Save selected options to extension storage
        chrome.storage.sync.set({
            tabType: selectedTabType,
            height: parseInt(heightRange.value),
            width: parseInt(widthRange.value)
        });

        if (optionChanged) {
            popupMessage.classList.replace('hidden', 'block');
        }
        optionChanged = true;
    });

    // Handle height and width range change events
    heightRange.addEventListener('change', function () {
        const newHeight = parseInt(heightRange.value);
        chrome.storage.sync.set({ height: newHeight });

        currentHeightValue.value = newHeight;
        if (optionChanged) {
            popupMessage.classList.replace('hidden', 'block');
        }
        optionChanged = true;
    });

    widthRange.addEventListener('change', function () {
        const newWidth = parseInt(widthRange.value);
        chrome.storage.sync.set({ width: newWidth });

        currentWidthValue.value = newWidth;
        if (optionChanged) {
            popupMessage.classList.replace('hidden', 'block');
        }
        optionChanged = true;
    });

    // Handle user input in width and height input fields
    currentWidthValue.addEventListener('input', function () {
        const newWidth = parseInt(currentWidthValue.value);
        if (!isNaN(newWidth)) {
            chrome.storage.sync.set({ width: newWidth });
            widthRange.value = newWidth;
        }
        if (optionChanged) {
            popupMessage.classList.replace('hidden', 'block');
        }
        optionChanged = true;
    });

    currentHeightValue.addEventListener('input', function () {
        const newHeight = parseInt(currentHeightValue.value);
        if (!isNaN(newHeight)) {
            chrome.storage.sync.set({ height: newHeight });
            heightRange.value = newHeight;
        }
        if (optionChanged) {
            popupMessage.classList.replace('hidden', 'block');
        }
        optionChanged = true;
    });
});
