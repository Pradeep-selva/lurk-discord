const Assets = {
  openEye: "../assets/eye-open.png",
  closedEye: "../assets/eye-shut.png"
};

const SESSION_STORAGE_STATE_KEY = "isLurkingDiscord";
const LurkState = {
  setLurking: (isLurking) =>
    window.localStorage.setItem(SESSION_STORAGE_STATE_KEY, `${isLurking}`),
  getCurState: () =>
    window.localStorage.getItem(SESSION_STORAGE_STATE_KEY) === "true"
      ? true
      : false
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

const checkIfLurkingOrNot = () => {
  if (LurkState.getCurState()) {
    let triggerButtonText = document.querySelector("#btn-message-text");
    triggerButtonText.innerText = "stop lurking";
    return true;
  } else {
    return false;
  }
};

document.addEventListener("DOMContentLoaded", () => {
  createBtnAccessory(checkIfLurkingOrNot() ? Assets.closedEye : Assets.openEye);
  LurkState.setLurking(LurkState.getCurState());

  logData(LurkState.getCurState());

  let triggerButton = document.querySelector("#btn-message");
  let triggerButtonText = document.querySelector("#btn-message-text");

  triggerButton.addEventListener("click", () => {
    if (!LurkState.getCurState()) {
      triggerButtonText.innerText = "stop lurking";
      createBtnAccessory(Assets.closedEye);
      LurkState.setLurking(true);
      logData(LurkState.getCurState());
    } else {
      triggerButtonText.innerText = "start lurking";
      createBtnAccessory(Assets.openEye);
      LurkState.setLurking(false);
      logData(LurkState.getCurState());
    }

    chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, "loaded");
    });
  });
});

const logData = (data) => {
  const div = document.createElement("div");
  div.innerText = data;
  document.body.appendChild(div);
};
