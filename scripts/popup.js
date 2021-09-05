document.addEventListener("DOMContentLoaded", () => {
  let button = document.querySelector("#message");

  button.addEventListener("click", () => {
    chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, "loaded");
    });
  });
});
