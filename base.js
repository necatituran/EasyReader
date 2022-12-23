function isEmpty(obj) {
    if (obj) return Object.keys(obj).length === 0;
    return true;
}

let preventInstance = {};

function easyRead(tab) {
    if (tab) {
        executeScripts(tab.id);
    } else {
        chrome.tabs.query(
            { currentWindow: true, active: true },
            (tabArray) => executeScripts(tabArray[0].id)
        );
    }
}

function executeScripts(tabId) {
    if (preventInstance[tabId]) return;

    preventInstance[tabId] = true;
    setTimeout(() => delete preventInstance[tabId], 10000);

    // Add a badge to signify the extension is in use
    chrome.browserAction.setBadgeBackgroundColor({ color: [242, 38, 19, 230] });
    chrome.browserAction.setBadgeText({ text: "on" });

    // Check if we need to add the site to JR's autorun list
    chrome.storage.sync.get("alwaysAddAR", function (result) {
        if (result && result["alwaysAddAR"]) {
            addSiteToAutorunList(null, tab);
        }
    });
}