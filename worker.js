chrome.tabs.onActivated.addListener(({ tabId }) => {
  chrome.tabs.get(tabId, ({ url }) => {
    if (url.startsWith("https://discord.com/")) {
      chrome.tabs.executeScript(null, { file: "./client.js" }, () =>
        console.log("[LURK DISCORD] Injected Client")
      );
    }
  });
});
