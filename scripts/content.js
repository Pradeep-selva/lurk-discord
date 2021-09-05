"use strict";

const TRIGGER_ID = "trigger";

const script = document.createElement("script");
script.setAttribute("type", "module");
console.log(chrome.extension.getURL("scripts/client.js"));
script.setAttribute("src", chrome.extension.getURL("scripts/client.js"));
const head =
  document.head ||
  document.getElementsByTagName("head")[0] ||
  document.documentElement;
head.insertBefore(script, head.lastChild);

const button = document.createElement("button");
button.setAttribute("id", TRIGGER_ID);
button.style.visibility = "hidden";
document.body.appendChild(button);

chrome.runtime.onMessage.addListener((request, sender) => {
  console.log(`[LURK DISCORD] Req: ${request} . Sender: ${sender}`);
  const triggerButton = document.querySelector(`#${TRIGGER_ID}`);
  triggerButton.click();
});
