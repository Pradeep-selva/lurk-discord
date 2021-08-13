chrome.tabs.onActivated.addListener(({ tabId }) => {
  chrome.tabs.get(tabId, ({ url }) => {
    if (url.startsWith("https://discord.com/")) {
      console.log("Yes, discord");
    }
  });
});
