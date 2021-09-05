const Assets = {
  openEye: "../assets/eye-open.png",
  closedEye: "../assets/eye-shut.png"
};

const DEV = false;

const SESSION_STORAGE_STATE_KEY = "isLurkingDiscord";
const BUTTON_TITLES = {
  stop: "stop lurking",
  start: "start lurking"
};

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
    DEV && console.log("[LURK DISCORD] Error: ", e);
  }
};

const checkIfLurkingOrNot = () => {
  if (LurkState.getCurState()) {
    let triggerButtonText = document.querySelector("#btn-message-text");
    triggerButtonText.innerText = BUTTON_TITLES.stop;
    return true;
  } else {
    return false;
  }
};

const checkIfOnDiscordChannels = () => {
  chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
    if (!tabs[0].url.startsWith("https://discord.com/channels/")) {
      const contentContainer = document.querySelector("#content-container");
      const STYLE_ID = "info-text";
      contentContainer.innerHTML = `<h2 id="${STYLE_ID}">You must be on a channel of discord.com to use this extension.</h2>`;
    }
  });
};

document.addEventListener("DOMContentLoaded", () => {
  checkIfOnDiscordChannels();
  createBtnAccessory(checkIfLurkingOrNot() ? Assets.closedEye : Assets.openEye);
  LurkState.setLurking(LurkState.getCurState());

  DEV && logData(LurkState.getCurState());

  let triggerButton = document.querySelector("#btn-message");
  let triggerButtonText = document.querySelector("#btn-message-text");

  triggerButton.addEventListener("click", () => {
    if (!LurkState.getCurState()) {
      triggerButtonText.innerText = BUTTON_TITLES.stop;
      createBtnAccessory(Assets.closedEye);
      LurkState.setLurking(true);
      DEV && logData(LurkState.getCurState());
    } else {
      triggerButtonText.innerText = BUTTON_TITLES.start;
      createBtnAccessory(Assets.openEye);
      LurkState.setLurking(false);
      DEV && logData(LurkState.getCurState());
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
