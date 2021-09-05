"use strict";

const script = document.createElement("script");
script.setAttribute("type", "module");
console.log(chrome.extension.getURL("scripts/client.js"));
script.setAttribute("src", chrome.extension.getURL("scripts/client.js"));
const head =
  document.head ||
  document.getElementsByTagName("head")[0] ||
  document.documentElement;
head.insertBefore(script, head.lastChild);

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log(`[LURK DISCORD] Req: ${request} . Sender: ${sender}`);
  sendResponse("RANDOM");
});
