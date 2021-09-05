document.addEventListener("DOMContentLoaded", () => {
  let triggerButton = document.querySelector("#message");
  let isLurking = false;

  triggerButton.addEventListener("click", () => {
    if (!isLurking) {
      triggerButton.innerHTML = "<b>stop lurking</b>";
      isLurking = true;
    } else {
      triggerButton.innerHTML = "<b>start lurking</b>";
      isLurking = false;
    }

    chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, "loaded");
    });
  });
});
