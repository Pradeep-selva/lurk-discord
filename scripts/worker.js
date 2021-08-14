import { logger } from "../utils/index.js";

logger.success("Worker Started");

chrome.tabs.onActivated.addListener(({ tabId }) => {
  chrome.tabs.get(tabId, async ({ url }) => {
    if (url.startsWith("https://discord.com/")) {
      chrome.tabs.executeScript(null, { file: "./scripts/client.js" }, () =>
        logger.success(`Injected client script into ${url}`)
      );
    }
  });
});
