document.addEventListener("DOMContentLoaded", () => {
  const appendStuff = (stuff) => {
    let div = document.createElement("div");
    div.innerHTML = `LOADED: ${stuff}`;
    document.body.appendChild(div);
  };

  let button = document.querySelector("#message");
  button.addEventListener("click", () => {
    chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, "loaded", appendStuff);
    });
  });
});
