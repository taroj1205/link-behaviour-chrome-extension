// Get options from background script
chrome.runtime.sendMessage({ action: 'getOptions' }, function (options) {
    const tabType = options.tabType;
    const height = options.height;
    const width = options.width;

    if (tabType === 'newtab') {
        document.body.addEventListener('click', function (event) {
            const link = event.target.closest('a');
            if (link) {
                event.preventDefault();
                window.open(link.href, '_blank');
            }
        });
    } else if (tabType === 'sametab') {
        document.body.addEventListener('click', function (event) {
            const link = event.target.closest('a');
            if (link) {
                event.preventDefault();
                window.location.href = link.href;
            }
        });
    } else if (tabType === 'newwindow') {
        document.body.addEventListener('click', function (event) {
            const link = event.target.closest('a');
            if (link) {
                event.preventDefault();
                window.open(link.href, '_blank', `height=${height},width=${width}`);
            }
        });
    }
});
