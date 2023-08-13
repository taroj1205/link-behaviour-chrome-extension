// Get options from background script
chrome.runtime.sendMessage({ action: 'getOptions' }, function (options) {
    const tabType = options.tabType;
    const height = options.height;
    const width = options.width;

    if (tabType === 'newtab') {
        const links = document.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', function (event) {
                event.preventDefault();
                link.href.target = '_blank';
                window.open(link.href, '_blank');
            });
        });
    } else if (tabType === 'sametab') {
        const links = document.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', function (event) {
                event.preventDefault();
                window.location.href = link.href;
            });
        });
    } else if (tabType === 'newwindow') {
        const links = document.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', function (event) {
                event.preventDefault();
                window.open(link.href, '_blank', `height=${height},width=${width}`);
            });
        });
    }
});
