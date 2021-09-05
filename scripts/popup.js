const Assets = {
  openEye: "../assets/eye-open.png",
  closedEye: "../assets/eye-shut.png"
};

const createBtnAccessory = (assetSource = Assets.openEye) => {
  try {
    const accessoryPlaceholder = document.querySelector(
      "#btn-accessory-placeholder"
    );
    const prevBtnAccessory = document.querySelector("#btn-accessory");

    if (!!prevBtnAccessory) {
      prevBtnAccessory.remove();
    }

    const btnAccessory = document.createElement("img");
    btnAccessory.setAttribute("id", "btn-accessory");
    btnAccessory.setAttribute("alt", "indicator-icon");
    btnAccessory.setAttribute("src", assetSource);

    accessoryPlaceholder.appendChild(btnAccessory);
  } catch (e) {
    console.log("[LURK DISCORD] Error: ", e);
  }
};

document.addEventListener("DOMContentLoaded", () => {
  createBtnAccessory();
  let isLurking = false;

  let triggerButton = document.querySelector("#btn-message");
  let triggerButtonText = document.querySelector("#btn-message-text");

  triggerButton.addEventListener("click", () => {
    if (!isLurking) {
      triggerButtonText.innerText = "stop lurking";
      createBtnAccessory(Assets.closedEye);
      isLurking = true;
    } else {
      triggerButtonText.innerText = "start lurking";
      createBtnAccessory(Assets.openEye);
      isLurking = false;
    }

    chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, "loaded");
    });
  });
});
