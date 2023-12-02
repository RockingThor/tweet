chrome.tabs.onUpdated.addListener((tabId, tab) => {
  if (tab.url && tab.url.includes("twitter.com/compose/tweet")) {
    chrome.tabs.sendMessage(tabId, {
      type: "NEW",
      work: "tweet initiation",
      url: tab.url,
    });
  }
});
